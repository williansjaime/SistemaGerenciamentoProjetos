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
