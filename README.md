# MySQL-App
This is app is powered by NodeJS and MySQL
It allows the user to interact with a MySQL database that contains several different shopping items with respective prices and quantities
There are two seperate levels to this app: the Customer level, and the Manager level

Customer Level:
To run the customer level through node just run node bamazonCusomer.js in your CLI
This level allows the user to act as a customer to select an item and "purchase" a quantity of it
Doing so will affect the quantity of the item in the database and then a table representing the data will be displayed in the CLI

Manager Level:
To run the manager level through node just run node bamazonManager.js in your CLI
This level allows the user to act as a manager and once it is run the user is presented with a list of 4 options
View Products: This option allows you to view all products and then displays the information in a table in the CLI
View Low Inventory: This option allows you to view all products with a quantity of < 5 and then displays the information in a table in the CLI
Add To Inventory: This option allows you to change the quantity of any item in the database and then displays the information in a table in the CLI
Add New Product: This option allows you to add a new product to the database and specify its name, departmet, price, and quantity and then displays the information in a table in the CLI

