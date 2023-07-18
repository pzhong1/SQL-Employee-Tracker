const inquirer = require('inquirer'); // install inquirer for asking questions and interacting with the user.
const connection = require('./config/connection');
require('dotenv').config(); // uses the (dotenv) library to load the .env file
require('console.table'); //imports the 'console.table' library

// prompt questions
const questions = () => {
    inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View all Employees',
            'Add an Employee',
            'Update an employee role',
            'View All Roles',
            'Add a Role',
            'View all Departments',
            'Add a Department',
            'Quit'
        ]
//if-else statments///////
    }).then((answer) => {
            if (answer.action === 'View all Employees') {
                viewAllEmployees();

            } else if (answer.action === 'Add an Employee') {
                addEmployee();

            } else if (answer.action === 'Update an employee role') {
                updateEmployeeRole();

            } else if (answer.action === 'View All Roles') {
                viewAllRoles();

            } else if (answer.action === 'Add a Role') {
                addRole();

            } else if (answer.action === 'View all Departments') {
                viewAllDepartments();

            } else if (answer.action === 'Add a Department') {
                addDepartment();

            } else if (answer.action === 'Quit') {
                connection.end(); // .end() exit the question function
            }
        });
};

//using the connection.query method toget the result and display it using console.table(department,roles, employess)
const viewAllDepartments = () => {
    const query = 'SELECT * FROM department';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        questions();
    });
};


const viewAllRoles = () => {
    const query = 'SELECT * FROM role';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        questions();
    });
};


const viewAllEmployees = () => {
    const query = `
    SELECT 
        employee.id, 
        employee.first_name, 
        employee.last_name, 
        role.title, 
        department.name AS department, 
        role.salary, 
        CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
    FROM 
        employee 
    LEFT JOIN 
        role ON employee.role_id = role.id 
    LEFT JOIN 
        department ON role.department_id = department.id 
    LEFT JOIN 
        employee manager ON manager.id = employee.manager_id;
`;
//using the connection.query method to performing a database query
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        questions();
    });
};


//using inquirer to prompt user input (department)
const addDepartment = () => {
    inquirer.prompt({
            name: 'department',
            type: 'input',
            message: 'What is the name of the new department?',
        })
        .then(answer => {
            connection.query("INSERT INTO department (name) VALUES (?)", [answer.department], (err, res) => {
                if (err) throw err;
                console.log("Department added successfully!");
                questions();
            });
        });
}

//role
function addRole() {
    connection.query("SELECT * FROM department", function(err, res) { //use connetion.query mthod to call mysql database to select all entries from the department table
        if (err) throw err;// if something wrong throw err
        
        const departments = res.map(department => { //response and map my department table 
            return {
                name: department.name,
                value: department.id
            }
        });

        inquirer.prompt([ //use npm iniquirer pacakge to pompt message 
            {
                name: 'title',
                type: 'input',
                message: 'What is the name of the new role?',
            },
            {
                name: 'salary',
                type: 'input',
                message: 'What is the salary of the new role?',
            },
            {
                name: 'department_id',
                type: 'list',
                message: 'Which department does the role belong to?',
                choices: departments
            },
        ])
        .then(answer => {
            connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answer.title, answer.salary, answer.department_id], function(err, res) {
                if (err) throw err;
                console.log("Role added successfully!");
                questions();
            });
        });
    });
}


//employee
function addEmployee() {
    connection.query("SELECT * FROM role", function(err, roles) {// query for role
        if (err) throw err;

        const roleChoices = roles.map(role => {
            return {
                name: role.title,
                value: role.id
            };
        });

    
        connection.query("SELECT * FROM employee", function(err, employees) {//query for employee
            if (err) throw err;

            const managerChoices = employees.map(employee => {
                return {
                    name: employee.first_name + ' ' + employee.last_name,
                    value: employee.id
                };
            });

            
            managerChoices.push({name: 'None', value: null});// Add "None" option////////////

            inquirer.prompt([
                {
                    name: 'first_name',
                    type: 'input',
                    message: 'What is the first name of the new employee?',
                },
                {
                    name: 'last_name',
                    type: 'input',
                    message: 'What is the last name of the new employee?',
                },
                {
                    name: 'role_id',
                    type: 'list',
                    message: "What is the employee's role?",
                    choices: roleChoices,
                },
                {
                    name: 'manager_id',
                    type: 'list',
                    message: "Who is the employee's manager?",
                    choices: managerChoices,
                }
            ])
            .then(answer => {
                connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", 
                [answer.first_name, answer.last_name, answer.role_id, answer.manager_id || null], 
                (err, res) => {
                    if (err) throw err;
                    console.log("Employee added successfully!");
                    questions();
                });
            });
        });
    });
}



function updateEmployeeRole() {
    connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        
        const employees = res.map(employee => {
            return {
                name: employee.first_name + ' ' + employee.last_name,
                value: employee.id
            }
        });

        connection.query("SELECT * FROM role", function(err, res) {
            if (err) throw err;

            const roles = res.map(role => {
                return {
                    name: role.title,
                    value: role.id
                }
            });
        
            inquirer.prompt([
                {
                    name: 'employee_id',
                    type: 'list',
                    message: 'Which employee\'s role do you want to update?',
                    choices: employees
                },
                {
                    name: 'new_role_id',
                    type: 'list',
                    message: 'Which role do you want to assign to the selected employee?',
                    choices: roles
                }
            ])
            .then(answer => {
                connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [answer.new_role_id, answer.employee_id], function(err, res) {
                    if (err) throw err;
                    console.log("Employee's role updated successfully!");
                    questions();
                });
            });
        });
    });
}


questions(); //call back questions function to start prompt