/*NEED TO DETERMINE ORDER *** ????? is first to be dropped since it connects into ???*/
DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employee;

/*Create Tables*/
CREATE TABLE department (
id INTEGER PRIMARY KEY,
dept_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
id INTEGER PRIMARY KEY,
title VARCHAR(30) NOT NULL,
salary DECIMAL(8,2)
department_id INTEGER
);

CREATE TABLE employee (
id INTEGER AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INTEGER,
manager_id INTEGER
);

/* 
***** SAMPLE CODE TO CONNECT TO OTHER TABLES  ****
industry_connected BOOLEAN NOT NULL,
  CONSTRAINT fk_party FOREIGN KEY (party_id) REFERENCES parties(id) ON DELETE SET NULL
*/