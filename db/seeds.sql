INSERT INTO department (id, dept_name)
VALUES
    (1, 'Production'),
    (2, 'Retail');
    

INSERT INTO roles (id, title, salary, department_id)
VALUES
    (1, 'Baker', 50000.00, 1),
    (2, 'Cake Decorator', 60000.00, 1),
    (3, 'Cake Icer', 45000.00, 1),    
    (4, 'Delivery', 35000.00, 1),
    (5, 'Retail Associate', 25000.00, 2),
    (6, 'Retail Asst Manager', 30000.00, 2),
    (7, 'Retail Manager', 35000.00, 2);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
    (100, 'David', 'Johnson', 1, NULL),
    (101, 'Angela', 'Arnold', 5, 102),
    (102, 'Judy', 'Cake', 7, Null);