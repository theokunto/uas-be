Cara install

> npm i

Cara Running
> npm run dev

Setup DB
> CREATE DATABASE yourdatabase;

Setup Table Users
> USE yourdatabase;

> CREATE TABLE users (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL UNIQUE
);

> INSERT INTO users (name, email)
VALUES
('Alice', 'alice@example.com'),
('Bob', 'bob@example.com'); 
