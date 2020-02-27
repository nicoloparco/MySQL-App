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
           
            case "View Low Inventory":
            viewLowInventory();
            break;
           
            case "Add to Inventory":
            addToInventory();
            break;
           
            case "Add New Product":
            addNewProduct();
            break;

            case "Exit":
            connection.end();
            break;
       } 
    })
};

function viewProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        
        var table = new Table({
            head: ["Product Id", "Product Name", "Department Name", "Product Price", "Product Quantity", "Product Sales"],
            colWidths: [15, 100, 30, 15, 15, 15],
            colAlign: "center",
            style: {
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
                response[i].product_sales
            ])
        };

        console.log(table.toString());
        console.log("")
        connection.end
    })
};

function viewLowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, res) {
        if (err) throw err;

        var table = new Table({
            head: ["Product Id", "Product Name", "Department Name", "Product Price", "Product Quantity", "Product Sales"],
            colWidths: [15, 100, 30, 15, 15, 15],
            colAlign: "center",
            style: {
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
                response[i].product_sales
            ])
        };

        console.log(table.toString());
        console.log("")
        connection.end
    })
};

function addToInventory() {
    inquirer.prompt({
        type: "input",
        message: "Please Enter the Name of the Product",
        name: "product"
    }).then(() => {
        inquirer.prompt({
            type: "input",
            message: 'Please Enter the New Quantity',
            name: "quantity"
        })
    }).then(function(answers) {
        console.log(answers)
        

        // connection.query(`UPDATE products SET stock_quantity=${}`)
    })
}
    

function addNewProduct() {
    inquirer.prompt({
        type: "input",
        message: 'Please Enter Information About Product ("name of product", "department of product", "price", "quantity")',
        name: "product"
    }).then(function(answer){ 
        
        var product = answer.product

        connection.query(`INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (${product})`).then(
            
            connection.query("SELECT * FROM products", function(err, res) {
            if (err) throw err;
            
            var table = new Table({
                head: ["Product Id", "Product Name", "Department Name", "Product Price", "Product Quantity", "Product Sales"],
                colWidths: [15, 100, 30, 15, 15, 15],
                colAlign: "center",
                style: {
                    head: ["aqua"],
                    compact: true
                }
            });

            for (var i = 0; i < res.length; i++ ){
                table.push([
                    res[i].id,
                    res[i].product_name,
                    res[i].department_name,
                    res[i].price,
                    res[i].stock_quantity,
                    response[i].product_sales
                ])
            };
    
            console.log(table.toString());
            console.log("")
            connection.end
            })
        )
    })
}



