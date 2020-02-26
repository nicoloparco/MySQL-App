var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table2");



var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "docker",
    database: "bamazonDB"
})

connection.connect(function (err) {
    if (err) throw err;
    console.log(`Connected as ID ${connection.threadId}`);
    manager();
});

var manager = function () {
    inquirer.prompt({
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
            "View Products For Sale",
            "View Low Inventory",
            "Add to Inventory",
            "Add New Product",
            "Exit"
        ]
    }).then(function(answer) {
       switch (answer.action) {
           case "View Products For Sale":
            viewProducts();
            break;
           
            case "View Products For Sale":
            viewLowInventory();
            break;
           
            case "View Products For Sale":
            addToInventory();
            break;
           
            case "View Products For Sale":
            addNewProduct();
            break;

            case "Exit":
            connection.end();
            break;
       } 
    })
};

function viewProducts() {
    connection.query("SELECT * FROM products", function(err, res){
        if (err) throw err;
        
        var table = new Table({
            head: ["Product Id", "Product Name", "Department Name", "Product Price", "Product Quantity"],
            colWidths: [15, 100, 30, 15, 20],
            colAlign: "center",
            styel: {
                head: ["aqua"],
                compact: true
            }
        });

        for (var i = 0; i < res.length; i++){
            table.push([
                res[i].id,
                res[i].product_name,
                res[i].department_name,
                res[i].price,
                res[i].stock_quantity,
            ])
        };

        console.log(table.toString());
        console.log("")
    })
};

function viewLowInventory() {

};

function addToInventory() {

};

function addNewProduct() {

}
