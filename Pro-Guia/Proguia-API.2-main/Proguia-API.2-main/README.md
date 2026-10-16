# Proguia-API.2 — Pizzaria (Relatório do Projeto)

Relatório simplificado do projeto **pizzaria** (API REST em Spring Boot) e do banco de dados **bd_pizzaria_2x** (SQL Server).

---

## 1. Estrutura geral do repositório

```
.
├── bd_pizzaria_2x.sql      → script do banco (SQL Server / T-SQL)
└── pizzaria\               → API REST em Spring Boot (Maven)
    ├── pom.xml
    └── src\main\java\br\itb\projeto\pizzaria\
        ├── Startup.java            (classe principal)
        ├── config\                 (CorsConfig, SecurityConfig)
        ├── controller\             (Usuario, Mensagem, Notificacao, RecuperarSenha)
        ├── dto\                    (UsuarioDTO, RedefinirSenhaDTO)
        ├── model\entity\           (Usuario, Mensagem, RecuperarSenha)
        ├── model\repository\       (Usuario, Mensagem, RecuperarSenha)
        └── service\                (Usuario, Mensagem, Notificacao, RecuperarSenha, Email)
```

> Obs.: apesar do nome "pizzaria", **não existe nenhuma entidade de pizza/cardápio/pedido**. O projeto é, na prática, um **backend de autenticação + caixa de mensagens (fale conosco) + recuperação de senha**. As pastas `resources/static` e `resources/templates` estão vazias (não há frontend neste repositório; o CORS aponta para `http://localhost:5173`, ou seja, um frontend React/Vite separado).

## 2. Stack / Dependências (`pom.xml`)

| Item | Valor |
|---|---|
| Framework | Spring Boot **4.0.3** (parent) |
| Java | **21** |
| Build | Maven (wrapper `mvnw`) |
| Módulos | `spring-boot-starter-data-jpa`, `spring-boot-starter-webmvc`, `spring-boot-starter-security`, `spring-boot-starter-mail`, `devtools` |
| Drivers | `mssql-jdbc` (SQL Server — o usado) e `jcc` (DB2, não utilizado) |
| Testes | `starter-data-jpa-test`, `starter-webmvc-test`, `starter-security-test` |

**Configuração (`src/main/resources/application.properties`):**

- Banco: `jdbc:sqlserver://localhost;databaseName=bd_pizzaria_2x` (usuário `sa`)
- `ddl-auto=none` / `generate-ddl=false` → o schema vem **somente** do script `.sql`
- E-mail SMTP: Gmail (`smtp.gmail.com:587`) com placeholders (`seuemail@gmail.com` / `APP_PASSWORD_DO_GMAIL`)

## 3. Banco de dados — `bd_pizzaria_2x.sql`


## 4. Camada da aplicação (padrão Controller → Service → Repository → Entity)

### Segurança (`SecurityConfig` + `CorsConfig`)

- CSRF desabilitado, CORS liberado apenas para `localhost:5173` (com credenciais).
- Login via **form login** em `POST /login` (respostas JSON de sucesso/erro), logout em `/logout`.
- Senhas com `BCryptPasswordEncoder`.
- **Endpoints públicos:** `/usuarios`, `/login`, `POST /mensagens/enviar`, `/notificacoes/**`, `/recuperar-senha/**` — todo o resto exige autenticação.

### Controllers / Endpoints

| Recurso | Rotas |
|---|---|
| **UsuarioController** `/usuarios` | `POST /create`, `PUT /{id}` (multipart com foto), `PUT /{id}/alterar-senha`, `PUT /{id}/inativar`, `PUT /{id}/ativar`, `GET /me`, `GET /all`, `GET /{id}` |
| **MensagemController** `/mensagens` | `POST /enviar` (público), `GET /all`, `GET /{id}`, `PUT /{id}/abrir` (marca `LIDA`), `PUT /{id}/inativar` |
| **RecuperarSenhaController** `/recuperar-senha` | `POST /solicitar-codigo`, `POST /validar-codigo`, `POST /redefinir-senha` |
| **NotificacaoController** `/notificacoes` | `GET /subscribe` → **SSE** (`SseEmitter`) |

### Services (destaques)

- **UsuarioService** implementa `UserDetailsService` (login do Spring Security); bloqueia usuários com status ≠ `ATIVO`; expõe `create`, `editar` (com foto), `alterarSenha`, `ativar/inativar`; converte entidade → `UsuarioDTO` (sem expor senha/foto).
- **RecuperarSenhaService**: gera código de 6 dígitos, validade de 15 min, envia por e-mail e invalida após o redefinir (`statusCodigo=false`).
- **MensagemService + NotificacaoService**: ao salvar uma mensagem, dispara evento SSE `nova-mensagem` para todos os clientes conectados (lista `CopyOnWriteArrayList` de emitters, sem timeout).
- **EmailService**: serviço auxiliar de envio (hoje em desuso — `RecuperarSenhaService` envia direto via `JavaMailSender`).

### Repositories

`JpaRepository` puros, com apenas dois métodos derivados: `findByUsername(String)` e `findByEmailAndCodigoAndStatusCodigoTrue(...)`.

## 5. Testes

- Existe apenas `StartupTests.contextLoads` (`@SpringBootTest`).
- Os relatórios em `target/surefire-reports` mostraram **`Tests run: 1, Failures: 0, Errors: 1`** — o teste falhou com `IllegalStateException: Failed to load ApplicationContext` (provável ausência/erro de conexão com o SQL Server local na última execução).

Script T-SQL que **dropa e recria** o banco `bd_pizzaria_2x` com **3 tabelas**:

### `Usuario`
`id (IDENTITY, PK)`, `nome`, `username (UNIQUE)`, `password` (bcrypt), `nivelAcesso` (ADMIN/USER), `foto VARBINARY(MAX)`, `dataCadastro`, `dataAtualizacao`, `statusUsuario` (ATIVO/INATIVO/TROCAR_SENHA)

- 4 registros de teste (Fulano/ADMIN, Beltrana, Sicrana/INATIVO, Ordnael) — todos com a senha `12345678` (hash bcrypt).

### `RecuperarSenha`
`id`, `email`, `codigo CHAR(6)`, `geradoEm`, `exepiraEm` *(sic — typo no nome da coluna)*, `statusCodigo BIT` (1=ativo).

### `Mensagem`
`id`, `dataMensagem`, `emissor`, `email`, `telefone`, `texto`, `dataAtualizacao`, `statusMensagem` (ATIVO/INATIVO; o código também usa `LIDA`/`INATIVA`)

- 2 mensagens de teste.

> Não há chaves estrangeiras: as tabelas são independentes (`RecuperarSenha.email` referencia `Usuario.username` apenas por convenção).


## 6. Observações / pontos de atenção

1. **Bug em `UsuarioService.create()`**: monta o objeto `_usuario` com a senha criptografada e status, mas no final chama `usuarioRepository.save(usuario)` (o objeto original), ignorando `_usuario` — ou seja, **senha não é criptografada e `dataCadastro`/`statusUsuario` não são gravados** corretamente.
2. **`RecuperarSenhaController`**: o campo `recuperarSenhaService` não é declarado como `final` nem injetado no construtor → causaria `NullPointerException` em tempo de execução (não há `@Autowired`).
3. **Tipagem divergente**: `RecuperarSenhaRepository extends JpaRepository<RecuperarSenha, Integer>`, mas a entidade usa `Long id`.
4. **Segurança**: `permitAll` em `/usuarios` libera todo o `UsuarioController` (inclusive `POST /usuarios/create`, `PUT /{id}/inativar`, etc.) sem autenticação.
5. Divergências entre banco e código: coluna `exepiraEm` (typo), status de mensagem `ATIVO/INATIVO` no SQL vs. `LIDA/INATIVA` no Java; tamanhos de coluna divergentes entre SQL e entidade.
6. Credenciais de banco e placeholders de e-mail em texto plano no `application.properties`.
7. Nome "pizzaria" não reflete o conteúdo — não há modelos de pizza/pedido.

---

## Como executar

```bash
# 1. Criar o banco no SQL Server Management Studio
#    executando o script bd_pizzaria_2x.sql

# 2. Subir a API (porta padrão 8080)
cd pizzaria
./mvnw spring-boot:run     # Linux/Mac
mvnw.cmd spring-boot:run   # Windows
```

Requisitos: Java 21, SQL Server local (`localhost`) e credenciais ajustadas em `application.properties`.
