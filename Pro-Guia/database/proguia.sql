
USE master;
GO

IF DB_ID('proguia') IS NULL
BEGIN
    CREATE DATABASE proguia;
END;
GO

USE proguia;
GO

-- TABELA DE USUARIOS
IF OBJECT_ID('dbo.Usuario', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.Usuario
    (
        id INT IDENTITY(1,1) PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        username VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(100) NOT NULL,
        nivelAcesso VARCHAR(10) NULL,
        telefone VARCHAR(20) NULL,
        foto VARBINARY(MAX) NULL,
        dataCadastro DATETIME2 NOT NULL,
        dataAtualizacao DATETIME2 NULL,
        statusUsuario VARCHAR(20) NOT NULL
    );
END;
GO

-- TABELA DE MENSAGENS
IF OBJECT_ID('dbo.Mensagem', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.Mensagem
    (
        id INT IDENTITY(1,1) PRIMARY KEY,
        dataMensagem DATETIME2 NULL,
        emissor VARCHAR(100) NULL,
        email VARCHAR(254) NULL,
        telefone VARCHAR(20) NULL,
        texto VARCHAR(400) NULL,
        dataAtualizacao DATETIME2 NULL,
        statusMensagem VARCHAR(20) NULL
            CONSTRAINT DF_Mensagem_Status DEFAULT 'ATIVO',
        respostaAdmin VARCHAR(4000) NULL,
        dataResposta DATETIME2 NULL
    );
END;
GO

-- GARANTIR OS CAMPOS DE RESPOSTA
IF COL_LENGTH('dbo.Mensagem', 'respostaAdmin') IS NULL
BEGIN
    ALTER TABLE dbo.Mensagem
    ADD respostaAdmin VARCHAR(4000) NULL;
END;
GO

IF COL_LENGTH('dbo.Mensagem', 'dataResposta') IS NULL
BEGIN
    ALTER TABLE dbo.Mensagem
    ADD dataResposta DATETIME2 NULL;
END;
GO

-- TABELA DE CURSOS
IF OBJECT_ID('dbo.Curso', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.Curso
    (
        id INT IDENTITY(1,1) PRIMARY KEY,
        titulo VARCHAR(140) NOT NULL,
        categoria VARCHAR(40) NOT NULL,
        descricao VARCHAR(2000) NOT NULL,
        imagemUrl VARCHAR(600) NULL,
        cargaHoraria VARCHAR(60) NULL,
        linkExterno VARCHAR(600) NULL,
        ativo BIT NOT NULL DEFAULT 1,
        dataCadastro DATETIME2 NOT NULL
    );
END;
GO

-- CONFERIR AS TABELAS CRIADAS
SELECT name AS Tabela
FROM sys.tables
ORDER BY name;


--ver cadastro
USE proguia;
GO

SELECT id, nome, username, nivelAcesso, statusUsuario
FROM dbo.Usuario;


--adm
USE proguia;
GO

UPDATE dbo.Usuario
SET nivelAcesso = 'ADMIN'
WHERE username = 'SEU_EMAIL_AQUI';
GO

SELECT id, nome, username, nivelAcesso, statusUsuario
FROM dbo.Usuario
WHERE username = 'SEU_EMAIL_AQUI';

--ola 