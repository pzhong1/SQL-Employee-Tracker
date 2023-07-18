## TASK
build a command-line application from scratch to manage a company's employee   database, using Node.js, Inquirer, and MySQL.  

## A walkthrough video demonstrating the functionality of the application.
https://drive.google.com/file/d/1D84vXdBF4WsYxLSNw0CC3QU962B_jqED/view

## The URL of the GitHub repository,   
https://github.com/pzhong1/SQL-Employee-Tracker.git


# install package require for this project
npm i inquirer@8.2.4, mysql2, console.table, dotenv

# MYSQL database setup
1. mysql -u root -p 
2. create databases employee_tracker;
3. source schema.sql;
4. source seeds.sql;

# to RUN
in the ternimal type node server.js  (nodemon server.js will not work on this one, because i did not change/add it at the package.json file)  
## User Story
AS A business owner  
I WANT to be able to view and manage the departments, roles, and employees in my company  
SO THAT I can organize and plan my business  

## Acceptance Criteria
GIVEN a command-line application that accepts user input  
WHEN I start the application  
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role  
WHEN I choose to view all departments  
THEN I am presented with a formatted table showing department names and department ids  
WHEN I choose to view all roles  
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role  
WHEN I choose to view all employees  
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to  
WHEN I choose to add a department  
THEN I am prompted to enter the name of the department and that department is added to the database  
WHEN I choose to add a role  
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database  
WHEN I choose to update an employee role  
THEN I am prompted to select an employee to update and their new role and this information is updated in the database  


## Getting Started
You'll need to use the MySQL2 packageLinks to an external site. to connect to your MySQL database and perform queries, and the Inquirer packageLinks to an external site. to interact with the user via the command line.



## Database schema includes tables labeled “employee,” role,” and “department.”


# department

id: INT PRIMARY KEY

name: VARCHAR(30) to hold department name

# role

id: INT PRIMARY KEY

title: VARCHAR(30) to hold role title

salary: DECIMAL to hold role salary

department_id: INT to hold reference to department role belongs to

# employee

id: INT PRIMARY KEY

first_name: VARCHAR(30) to hold employee first name

last_name: VARCHAR(30) to hold employee last name

role_id: INT to hold reference to employee role

manager_id: INT to hold reference to another employee that is the manager of the current employee (null if the employee has no manager)


# screenShot

![mysql ternimal sceentshot](https://github.com/pzhong1/SQL-Employee-Tracker/assets/123424361/81348400-27c0-47cc-b32d-d8744030086d)




![node server js sceenshot](https://github.com/pzhong1/SQL-Employee-Tracker/assets/123424361/5b0b7b47-57b4-476b-9cf6-9dd006d11c1c)



