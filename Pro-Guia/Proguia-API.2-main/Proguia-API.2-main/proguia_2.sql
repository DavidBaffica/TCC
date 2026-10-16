USE master 
GO

IF EXISTS(select * from sys.databases where name='proguia_2') 
	DROP DATABASE proguia_2
GO 
-- CRIAR UM BANCO DE DADOS
CREATE DATABASE proguia_2
GO
-- ACESSAR O BANCO DE DADOS
USE proguia_2
GO

CREATE TABLE Usuario
( 
   id			   	   INT				IDENTITY,
   nome				   VARCHAR(254)	NOT NULL,
   username			   VARCHAR(255)	NOT NULL UNIQUE,
   password			   VARCHAR(100)	NOT NULL,
   nivelAcesso		   VARCHAR(10)		    NULL, -- ADMIN ou USER
   foto				   VARBINARY(MAX)	    NULL,
   dataCadastro		SMALLDATETIME	NOT NULL DEFAULT GETDATE(),
   dataAtualizacao	SMALLDATETIME	    NULL,
   statusUsuario	   VARCHAR(20)		NOT NULL, -- ATIVO ou INATIVO ou TROCAR_SENHA

   PRIMARY KEY (id)
);
GO
-- '$2a$10$Su2UIixHK/L2kAMDQAB1AusVsF6eEzwVoyU/hUBnQKtc78yGO0nzi' = 12345678
INSERT Usuario (nome, username, password, nivelAcesso, foto, dataCadastro, dataAtualizacao, statusUsuario)
VALUES ('Fulano da Silva', 'fulano@email.com.br', '$2a$10$Su2UIixHK/L2kAMDQAB1AusVsF6eEzwVoyU/hUBnQKtc78yGO0nzi', 'ADMIN', NULL, GETDATE(), NULL, 'ATIVO')
INSERT Usuario (nome, username, password, nivelAcesso, foto, dataCadastro, dataAtualizacao,statusUsuario)
VALUES ('Beltrana de Sá', 'beltrana@email.com.br', '$2a$10$Su2UIixHK/L2kAMDQAB1AusVsF6eEzwVoyU/hUBnQKtc78yGO0nzi', 'USER', NULL, GETDATE(), NULL, 'ATIVO')
INSERT Usuario (nome, username, password, nivelAcesso, foto, dataCadastro, dataAtualizacao, statusUsuario)
VALUES ('Sicrana de Oliveira', 'sicrana@email.com.br', '$2a$10$Su2UIixHK/L2kAMDQAB1AusVsF6eEzwVoyU/hUBnQKtc78yGO0nzi', 'USER', NULL, GETDATE(), NULL,'INATIVO')
INSERT Usuario (nome, username, password, nivelAcesso, foto, dataCadastro, dataAtualizacao, statusUsuario)
VALUES ('Ordnael Zurc', 'ordnael@email.com.br', '$2a$10$Su2UIixHK/L2kAMDQAB1AusVsF6eEzwVoyU/hUBnQKtc78yGO0nzi', 'USER', NULL, GETDATE(), NULL, 'ATIVO')
GO

CREATE TABLE RecuperarSenha
( 
   id				   INT				IDENTITY,
   email			   VARCHAR(254)	NOT NULL, -- username
   codigo			CHAR(6)			NOT NULL,
   geradoEm			SMALLDATETIME	NOT NULL DEFAULT GETDATE(),
   exepiraEm		SMALLDATETIME	NOT NULL,
   statusCodigo	BIT				NOT NULL DEFAULT 1, -- 1 = ATIVO ou 0 = INATIVO

   PRIMARY KEY (id)
);
GO

CREATE TABLE Mensagem
(
	id	               INT			  IDENTITY,
	dataMensagem      SMALLDATETIME NOT NULL DEFAULT GETDATE(),
	emissor			   VARCHAR(100)  NOT NULL,
	email 			   VARCHAR(254)  NOT NULL,
	telefone	         VARCHAR(20)       NULL,
	texto 	         VARCHAR(400)  NOT NULL,
	dataAtualizacao   SMALLDATETIME	   NULL,
	statusMensagem    VARCHAR(10)   NOT NULL DEFAULT 'ATIVO', -- ATIVO ou INATIVO

	PRIMARY KEY (id)
);
GO
INSERT Mensagem (dataMensagem, emissor, email, telefone, texto, dataAtualizacao, statusMensagem) 
VALUES (GETDATE(), 'Ordnael Zurc', 'ordnael@username.com', '(11) 98765-4123', 'Mensagem de teste', NULL, 'ATIVO')
INSERT Mensagem (dataMensagem, emissor, email, telefone, texto, dataAtualizacao, statusMensagem) 
VALUES (GETDATE(), 'Maria Onete', 'maria@username.com', null, 'Segunda mensagem de teste', NULL, 'ATIVO')
GO

SELECT * FROM Usuario

SELECT * FROM Mensagem


