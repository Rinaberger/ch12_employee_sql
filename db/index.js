const connection = require('./connect');

class DB {
	constructor(connection) {
		this.connection = connection;
	}

	// Find all employees, join with roles and departments to display their roles, salaries, departments, and managers
	findAllEmployees() {
		return this.connection
			.promise()
			.query(
				"SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.dept_name, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) manager FROM employee LEFT JOIN roles on employee.role_id = roles.id LEFT JOIN department on roles.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
			);
	}

	// Create a new employee
	createEmployee(employee) {
		return this.connection
			.promise()
			.query('INSERT INTO employee SET ?', employee);
	}

	// Remove an employee with the given id
	removeEmployee(employeeId) {
		return this.connection
			.promise()
			.query('DELETE FROM employee WHERE id = ?', employeeId);
	}

	// Update the given employee's role
	updateEmployeeRole(employeeId, roleId) {
		return this.connection
			.promise()
			.query('UPDATE employee SET role_id = ? WHERE id = ?', [
				roleId,
				employeeId,
			]);
	}

    // Find all roles I am presented with the job title, role id, the department that role belongs to, and the salary for that role
	findAllRoles() {
		return this.connection
			.promise()
			.query(
				'SELECT roles.id, roles.title, department.dept_name department, salary FROM roles LEFT JOIN department on roles.department_id = department.id'
			);
	}

	// Create a new role
	createRole(role) {
		console.log(role);
		return this.connection.promise().query('INSERT INTO roles SET ?', role);
	}

	// Remove a role from the db
	removeRole(roleId) {
		return this.connection
			.promise()
			.query('DELETE FROM role WHERE id = ?', roleId);
	}

	// Find all departments, join with employees and roles and sum up utilized department budget
	findAllDepartments() {
		return this.connection.promise().query('SELECT * FROM department');
	}

	// Create a new department
	createDepartment(department) {
		console.log(department);
		return this.connection
			.promise()
			.query('INSERT INTO department SET name = ?', department);
	}

	// Remove a department from the db
	removeDepartment(departmentId) {
		return this.connection
			.promise()
			.query('DELETE FROM department WHERE id = ?', departmentId);
	}

	// Find all employees in a given department, join with roles to display role titles
	findAllEmployeesByDepartment(departmentId) {
		return this.connection
			.promise()
			.query(
				'SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id WHERE department.id = ?',
				departmentId
			);
	}

	// Find all employees by manager, join with departments and roles to display titles and department names
	findAllEmployeesByManager(managerId) {
		return this.connection
			.promise()
			.query(
				'SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id WHERE manager_id = ?',
				managerId
			);
	}

	// create a new employee
	createEmployee(employee) {
		return this.connection
			.promise()
			.query('INSERT INTO employee SET ?', employee);
	}

	// update an employee's role
	updateEmployeeRole(employeeId, roleId) {
		return this.connection
			.promise()
			.query('UPDATE employee SET role_id = ? WHERE id = ?', [
				roleId,
				employeeId,
			]);
	}

	// update an employee's manager
	updateEmployeeManager(employeeId, managerId) {
		return this.connection
			.promise()
			.query('UPDATE employees SET manager_id = ? WHERE employee_id = ?', [
				managerId,
				employeeId,
			]);
	}	
}

module.exports = new DB(connection);