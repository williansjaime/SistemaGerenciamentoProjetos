# SistemaGerenciamentoProjetos
Sistema de Gerenciamento de Projetos
## Node.js no linux 
sudo apt install npm
## Atualizar para versão atual
sudo n stable
## Instalar Angular CLI
sudo npm install -g @angular/cli
## Instalar o Bootstrap 4 
npm install bootstrap@4.1.3 jquery@3.3.1 popper.js@1.14.3 --save

## Criado o banco de dados no myslq
CREATE DATABASE dbGerenciadorProjeto

# Criar tabela de cadastro de projeto
CREATE TABLE dbGerenciadorProjeto.tbCadastroProjeto (
	id INTEGER auto_increment NOT NULL,
	dataHora DATETIME NOT NULL,
	NomeProjeto varchar(100) NOT NULL,
	descricaoProjeto varchar(400) NOT NULL,
	dataInicio DATE NOT NULL,
	CONSTRAINT tbCadastroProjeto_PK PRIMARY KEY (id)
)
# Adicionar a coluna token para saber quem criou 
ALTER TABLE dbGerenciadorProjeto.tbCadastroProjeto ADD token varchar(150) NOT NULL;

# Criar tabela Editar tarefa
CREATE TABLE dbGerenciadorProjeto.tbEditarProjeto (
	id INTEGER auto_increment NOT NULL,
	idProjeto INTEGER NOT NULL,
	nomeProjeto varchar(150) NOT NULL,
	tarefa varchar(500) NOT NULL,
	status BINARY NOT NULL,
	token varchar(150) NOT NULL,
	inicioTarefa DATE NOT NULL,
	tarefaFinal DATE NOT NULL,
	CONSTRAINT tbEditarProjeto_PK PRIMARY KEY (id)
)

# Tive que adicionar tabela tbEditarProjeto a coluna dataHora ao banco
ALTER TABLE dbGerenciadorProjeto.tbEditarProjeto ADD dataHora DATETIME NOT NULL;

# Tive que adicionar tabela tbEditarProjeto a coluna descricao
ALTER TABLE dbGerenciadorProjeto.tbEditarProjeto ADD descricao varchar(400) NOT NULL;

# Gerar o Select
SELECT id, idProjeto, nomeProjeto, tarefa, status, token, inicioTarefa, tarefaFinal
FROM dbGerenciadorProjeto.tbEditarProjeto;

# Mudança na coluna status pelo erro na API ao converter Binario para JSON
ALTER TABLE dbGerenciadorProjeto.tbEditarProjeto MODIFY COLUMN status INT NOT NULL;