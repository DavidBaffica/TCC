/*
  Pro Guia — migração segura para painel administrativo.
  Execute no banco existente "proguia". Não apaga tabelas nem dados.
*/
USE proguia;
GO

IF COL_LENGTH('dbo.Mensagem', 'respostaAdmin') IS NULL
    ALTER TABLE dbo.Mensagem ADD respostaAdmin VARCHAR(2000) NULL;
GO

IF COL_LENGTH('dbo.Mensagem', 'dataResposta') IS NULL
    ALTER TABLE dbo.Mensagem ADD dataResposta SMALLDATETIME NULL;
GO

IF OBJECT_ID('dbo.Curso', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.Curso (
        id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        titulo VARCHAR(140) NOT NULL,
        categoria VARCHAR(40) NOT NULL,
        descricao VARCHAR(2000) NOT NULL,
        imagemUrl VARCHAR(600) NULL,
        cargaHoraria VARCHAR(60) NULL,
        linkExterno VARCHAR(600) NULL,
        ativo BIT NOT NULL CONSTRAINT DF_Curso_ativo DEFAULT 1,
        dataCadastro DATETIME2 NOT NULL CONSTRAINT DF_Curso_dataCadastro DEFAULT SYSDATETIME()
    );
END;
GO