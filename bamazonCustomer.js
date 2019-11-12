var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Chicago4$",
    database: "bamazonDB"
})

connection.connect(function (err) {
    if (err) throw err;
    console.log(`Connected as ID ${connection.threadId}`);
    loadDatabase();
});

function loadDatabase() {
    connection.query("SELECT * FROM products", function (err, response) {
        if (err) throw err;
        console.log(response);

        inquirer.prompt([
            {
                type: "input",
                message: "What is the ID number of the item you would like to buy?",
                name: "item"
            },
            {
                type: "input",
                messsage: "How many of the item would you like to buy?",
                name: "quantity"
            }
        ]).then(function (response) {
            console.log(response)
        })
    })
};

// inquirer.prompt([
//     {
//         type: "input",
//         message: "What is the ID number of the item you would like to buy?",
//         name: "item"
//     },
//     {
//         type: "input",
//         messsage: "How many of the item would you like to buy?",
//         name: "quantity"
//     }
// ]).then(function (response) {
//     console.log(response)
// })