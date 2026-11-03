
/* =====================================================
   PRO GUIA - GERENCIAMENTO DO BANCO DE DADOS
   ===================================================== */


/* 1. APAGAR O BANCO ANTIGO */

USE master;
GO

IF DB_ID('proguia') IS NOT NULL
BEGIN
    ALTER DATABASE proguia
    SET SINGLE_USER WITH ROLLBACK IMMEDIATE;

    DROP DATABASE proguia;
END;
GO


/* 2. CRIAR O BANCO NOVAMENTE */

CREATE DATABASE proguia;
GO

USE proguia;
GO


/* 3. VERIFICAR SE O BANCO EXISTE */

SELECT name AS BancoCriado
FROM sys.databases
WHERE name = 'proguia';
GO


/* 4. VERIFICAR AS TABELAS */

SELECT
    TABLE_NAME AS NomeTabela
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_TYPE = 'BASE TABLE';
GO


/* 5. CONSULTAR USUÁRIOS */

-- Execute depois de criar as tabelas
SELECT *
FROM Usuario;
GO


/* 6. CONSULTAR MENSAGENS */

SELECT *
FROM Mensagem;
GO


/* 7. CONSULTAR CURSOS */

SELECT *
FROM Curso;
GO


/* 8. PROMOVER UMA CONTA PARA ADMINISTRADOR */

-- TROQUE PELO E-MAIL DA SUA CONTA

UPDATE Usuario
SET nivelAcesso = 'ADMIN'
WHERE email = 'SEU_EMAIL@gmail.com';
GO


/* 9. CONFERIR A CONTA ADMINISTRADORA */

SELECT
    nome,
    email,
    nivelAcesso
FROM Usuario
WHERE email = 'SEU_EMAIL@gmail.com';
GO


/* 10. CONTAR OS REGISTROS DAS TABELAS */

SELECT 'Usuario' AS Tabela, COUNT(*) AS Total
FROM Usuario

UNION ALL

SELECT 'Mensagem', COUNT(*)
FROM Mensagem

UNION ALL

SELECT 'Curso', COUNT(*)
FROM Curso;
GO
