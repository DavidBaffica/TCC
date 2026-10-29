# Configuração da área administrativa do Pro Guia

## 1. Atualizar o banco sem apagar dados

No SQL Server Management Studio, conecte-se ao banco de dados e abra/execute o arquivo:

`Pro-Guia/database/migrations/2026-10-29-admin-cursos-respostas.sql`

**Importante:** não execute novamente `Pro-Guia/database/proguia.sql` sobre seu banco atual: esse arquivo recria o banco e pode apagar os dados existentes.

## 2. Tornar sua conta administradora

1. Crie uma conta normalmente pela página de cadastro do Pro Guia.
2. No SQL Server Management Studio, execute o comando abaixo substituindo o e-mail pelo e-mail exato da sua conta:

```sql
USE proguia;
UPDATE dbo.Usuario
SET nivelAcesso = 'ADMIN'
WHERE username = 'seu-email@exemplo.com';
```

3. Confirme a alteração:

```sql
SELECT id, nome, username, nivelAcesso, statusUsuario
FROM dbo.Usuario
WHERE username = 'seu-email@exemplo.com';
```

O resultado deve mostrar `nivelAcesso = ADMIN` e `statusUsuario = ATIVO`. Saia da conta e entre novamente. Usuários comuns não devem receber o perfil ADMIN.

## 3. Configurar o backend

Configure as variáveis de ambiente usadas pelo `application.properties` do backend:

- `DB_USERNAME`: usuário do SQL Server.
- `DB_PASSWORD`: senha do SQL Server.
- `MAIL_USERNAME`: conta Gmail que enviará as respostas.
- `MAIL_PASSWORD`: senha de app do Gmail (não a senha normal da conta).

Sem as configurações de e-mail, o painel ainda pode listar mensagens, mas a ação de enviar resposta por e-mail falhará. Não coloque credenciais reais no Git.

## 4. Executar o projeto localmente

Backend: abra um terminal na pasta `Pro-Guia/backend/proguia-backend` e execute no Windows:

```powershell
.\mvnw.cmd spring-boot:run
```

Frontend: abra outro terminal na pasta `Pro-Guia/frontend/proguia-frontend` e execute:

```powershell
npm install
npm run dev
```

A API frontend está configurada para `http://localhost:8080`.

## 5. Recursos do painel

- `/admin`: resumo de mensagens e cursos.
- `/admin/mensagens`: pesquisar, filtrar, abrir mensagens e enviar uma resposta por e-mail.
- `/admin/cursos`: criar, editar e excluir cursos.
- Os cursos ativos cadastrados no painel aparecem na página pública `/cursos`.

A autorização também é verificada no backend: esconder links no frontend não é a única proteção.
