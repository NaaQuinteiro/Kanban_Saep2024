-- Criando banco de dados de Kanban 
CREATE DATABASE IF NOT EXISTS Kanban;

-- Usar a database 
USE Kanban;

-- Criando a Tabela de Usuários
CREATE TABLE IF NOT EXISTS users (
	user_id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL, 
    email VARCHAR(255) NOT NULL
);

-- Criando a Tabela de Tarefas
CREATE TABLE IF NOT EXISTS tasks(
	task_id INT AUTO_INCREMENT PRIMARY KEY,
    description TEXT NOT NULL,
    sector_name VARCHAR(100) NOT NULL,
	priority ENUM('LOW','MEDIUM','HIGH') NOT NULL,
    registration_date DATE NOT NULL,
    status  ENUM('TO DO','DOING','COMPLETE') NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(user_id)
);

-- Confirmando a criação das tabelas 
SELECT * FROM USERS;
SELECT * FROM TASKS;