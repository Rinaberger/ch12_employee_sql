const express = require('express');
const inquirer = require('inquirer');
const db = require('./db');
require('console.table');
//const inputCheck = require('./utils/inputCheck');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const textArt = `
▄▄▄▄▄▄▄▄▄▄▄  ▄▄       ▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄            ▄▄▄▄▄▄▄▄▄▄▄  ▄         ▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄ 
▐░░░░░░░░░░░▌▐░░▌     ▐░░▌▐░░░░░░░░░░░▌▐░▌          ▐░░░░░░░░░░░▌▐░▌       ▐░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌
▐░█▀▀▀▀▀▀▀▀▀ ▐░▌░▌   ▐░▐░▌▐░█▀▀▀▀▀▀▀█░▌▐░▌          ▐░█▀▀▀▀▀▀▀█░▌▐░▌       ▐░▌▐░█▀▀▀▀▀▀▀▀▀ ▐░█▀▀▀▀▀▀▀▀▀ 
▐░▌          ▐░▌▐░▌ ▐░▌▐░▌▐░▌       ▐░▌▐░▌          ▐░▌       ▐░▌▐░▌       ▐░▌▐░▌          ▐░▌          
▐░█▄▄▄▄▄▄▄▄▄ ▐░▌ ▐░▐░▌ ▐░▌▐░█▄▄▄▄▄▄▄█░▌▐░▌          ▐░▌       ▐░▌▐░█▄▄▄▄▄▄▄█░▌▐░█▄▄▄▄▄▄▄▄▄ ▐░█▄▄▄▄▄▄▄▄▄ 
▐░░░░░░░░░░░▌▐░▌  ▐░▌  ▐░▌▐░░░░░░░░░░░▌▐░▌          ▐░▌       ▐░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌
▐░█▀▀▀▀▀▀▀▀▀ ▐░▌   ▀   ▐░▌▐░█▀▀▀▀▀▀▀▀▀ ▐░▌          ▐░▌       ▐░▌ ▀▀▀▀█░█▀▀▀▀ ▐░█▀▀▀▀▀▀▀▀▀ ▐░█▀▀▀▀▀▀▀▀▀ 
▐░▌          ▐░▌       ▐░▌▐░▌          ▐░▌          ▐░▌       ▐░▌     ▐░▌     ▐░▌          ▐░▌          
▐░█▄▄▄▄▄▄▄▄▄ ▐░▌       ▐░▌▐░▌          ▐░█▄▄▄▄▄▄▄▄▄ ▐░█▄▄▄▄▄▄▄█░▌     ▐░▌     ▐░█▄▄▄▄▄▄▄▄▄ ▐░█▄▄▄▄▄▄▄▄▄ 
▐░░░░░░░░░░░▌▐░▌       ▐░▌▐░▌          ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌     ▐░▌     ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌
 ▀▀▀▀▀▀▀▀▀▀▀  ▀         ▀  ▀            ▀▀▀▀▀▀▀▀▀▀▀  ▀▀▀▀▀▀▀▀▀▀▀       ▀       ▀▀▀▀▀▀▀▀▀▀▀  ▀▀▀▀▀▀▀▀▀▀▀ 
                                                                                                        
 ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄    ▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄                   
▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░▌  ▐░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌                  
 ▀▀▀▀█░█▀▀▀▀ ▐░█▀▀▀▀▀▀▀█░▌▐░█▀▀▀▀▀▀▀█░▌▐░█▀▀▀▀▀▀▀▀▀ ▐░▌ ▐░▌ ▐░█▀▀▀▀▀▀▀▀▀ ▐░█▀▀▀▀▀▀▀█░▌                  
     ▐░▌     ▐░▌       ▐░▌▐░▌       ▐░▌▐░▌          ▐░▌▐░▌  ▐░▌          ▐░▌       ▐░▌                  
     ▐░▌     ▐░█▄▄▄▄▄▄▄█░▌▐░█▄▄▄▄▄▄▄█░▌▐░▌          ▐░▌░▌   ▐░█▄▄▄▄▄▄▄▄▄ ▐░█▄▄▄▄▄▄▄█░▌                  
     ▐░▌     ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░▌          ▐░░▌    ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌                  
     ▐░▌     ▐░█▀▀▀▀█░█▀▀ ▐░█▀▀▀▀▀▀▀█░▌▐░▌          ▐░▌░▌   ▐░█▀▀▀▀▀▀▀▀▀ ▐░█▀▀▀▀█░█▀▀                   
     ▐░▌     ▐░▌     ▐░▌  ▐░▌       ▐░▌▐░▌          ▐░▌▐░▌  ▐░▌          ▐░▌     ▐░▌                    
     ▐░▌     ▐░▌      ▐░▌ ▐░▌       ▐░▌▐░█▄▄▄▄▄▄▄▄▄ ▐░▌ ▐░▌ ▐░█▄▄▄▄▄▄▄▄▄ ▐░▌      ▐░▌                   
     ▐░▌     ▐░▌       ▐░▌▐░▌       ▐░▌▐░░░░░░░░░░░▌▐░▌  ▐░▌▐░░░░░░░░░░░▌▐░▌       ▐░▌                  
      ▀       ▀         ▀  ▀         ▀  ▀▀▀▀▀▀▀▀▀▀▀  ▀    ▀  ▀▀▀▀▀▀▀▀▀▀▀  ▀         ▀                   
                                                                                                        
`;

// display the textArt and main prompts
const start = () => {
	console.log(textArt);
	homepageMenu();
};

// main menu
const homepageMenu = () => {
	inquirer
		.prompt([
			{
				type: 'list',
				name: 'homepageMenu',
				message: 'What would you like to do?',
				choices: [
					'View all departments',
					'View all roles',
					'View all employees',
					'Add a department',
					'Add a role',
					'Add an employee',
					'Update an employee role',																			
					'Exit',
				],
			},
		])
		.then((answer) => {
			switch (answer.homepageMenu) {
				case 'View all departments':
					viewAllDepartments();
					break;
				case 'View all roles':
					viewAllRoles();
					break;
				case 'View all employees':
					viewAllEmployees();
					break;
				case 'Add a department':
					addDepartment();
					break;
				case 'Add a role':
					addRole();
					break;
				case 'Add an employee':
					addEmployee();
					break;
				case 'Update an employee role':
					updateEmployeeRole();
					break;				
				case 'Delete a department':
					deleteDepartment();
					break;
				case 'Delete a role':
					deleteRole();
					break;
				case 'Delete an employee':
					deleteEmployee();
					break;
				case 'Exit':
					exit();
					break;
			}
		});
};

const viewAllDepartments = () => {
	db.findAllDepartments()
		.then(([rows]) => {
			let department = rows;
			console.log('\n');
			console.table(department);
		})
		.then(() => homepageMenu());
};

const viewAllRoles = () => {
	db.findAllRoles()
		.then(([rows]) => {
			let roles = rows;
			console.log('\n');
			console.table(roles);
		})
		.then(() => homepageMenu());
};

const viewAllEmployees = () => {
	db.findAllEmployees()
		.then(([rows]) => {
			let employee = rows;
			console.log('\n');
			console.table(employee);
		})
		.then(() => homepageMenu());
};

const addDepartment = () => {
	inquirer
		.prompt([
			{
				name: 'dept_name',
				type: 'input',
				message: 'New department name?',
			},
		])
		.then((answer) => {
			let department = answer.department;
			db.createDepartment(department)
				.then(() => console.log(`${department} created`))
				.then(() => viewAllDepartments());
		});
};

// add a new role to the database
const addRole = () => {
	db.findAllDepartments().then(([rows]) => {
		let department = rows;
		const departmentChoices = department.map(({ department_id, name }) => ({
			name: name,
			value: department_id,
		}));
		inquirer
			.prompt([
				{
					name: 'title',
					type: 'input',
					message: 'New role name?',
				},
				{
					name: 'salary',
					type: 'input',
					message: 'What is the salary of the role?',
				},
				{
					name: 'department_id',
					type: 'list',
					message:
						'What department does the role belong to?',
					choices: departmentChoices,
				},
			])
			.then((answer) => {
				db.createRole(answer)
					.then(() => console.log(`${answer.title} created`))
					.then(() => viewAllRoles());
			});
	});
};

// add a new employee to the database
const addEmployee = () => {
	inquirer
		.prompt([
			{
				name: 'first_name',
				type: 'input',
				message:
					'First name of the employee?',
			},
			{
				name: 'last_name',
				type: 'input',
				message: 'Last name of the employee?',
			},
		])
		.then((answer) => {
			let firstName = answer.first_name;
			let lastName = answer.last_name;
			db.findAllRoles().then(([rows]) => {
				let roles = rows;
				const roleChoices = roles.map(({ id, title }) => ({
					name: title,
					value: id,
				}));
				inquirer
					.prompt([
						{
							name: 'id',
							type: 'list',
							message:
								'Role of the employee?',
							choices: roleChoices,
						},
					])
					.then((answer) => {
						let roleId = answer.id;
						db.findAllEmployees().then(([rows]) => {
							let employee = rows;
							const managerChoices = employee.map(
								({ id, first_name, last_name }) => ({
									name: `${first_name} ${last_name}`,
									value: id,
								})
							);
							managerChoices.unshift({ name: 'None', value: null });
							inquirer
								.prompt([
									{
										name: 'manager_id',
										type: 'list',
										message:
											'Assigned manager of the employee?',
										choices: managerChoices,
									},
								])
								.then((answer) => {
									let managerId = answer.manager_id;
									let employee = {
										first_name: firstName,
										last_name: lastName,
										role_id: roleId,
										manager_id: managerId,
									};
									db.createEmployee(employee)
										.then(() =>
											console.log(
												`${firstName} ${lastName} record created.`
											)
										)
										.then(() => viewAllEmployees());
								});
						});
					});
			});
		});
};

// update an employee's role
const updateEmployeeRole = () => {
	db.findAllEmployees().then(([rows]) => {
		let employee = rows;
		const employeeChoices = employee.map(({ id, first_name, last_name }) => ({
			name: `${first_name} ${last_name}`,
			value: id,
		}));
		inquirer
			.prompt([
				{
					name: 'id',
					type: 'list',
					message: 'Which employee would you like to update?',
					choices: employeeChoices,
				},
			])
			.then((answer) => {
				let employeeId = answer.id;
				db.findAllRoles().then(([rows]) => {
					let roles = rows;
					const roleChoices = roles.map(({ id, title }) => ({
						name: title,
						value: id,
					}));
					inquirer
						.prompt([
							{
								name: 'role_id',
								type: 'list',
								message:
									'What is the new role of the employee?',
								choices: roleChoices,
							},
						])
						.then((answer) => {
							let roleId = answer.role_id;
							db.updateEmployeeRole(employeeId, roleId)
								.then(() => console.log('Employee role updated.'))
								.then(() => viewAllEmployees());
						});
				});
			});
	});
};

// exit the application
const exit = () => {
	console.log('Thank you and goodbye!');
	process.exit();
};

start();

app.listen(PORT, () => {
     console.log(`Server running on port ${PORT}`);
   });
