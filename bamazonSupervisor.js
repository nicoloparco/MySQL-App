var mysql = require("mysql");
var inquirer = require("inquirer")
var Table = require("cli-table2");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "docker",
    databse: "bamazonDB"
})

connection.connect(function(err) {
    if (err) throw err;
    console.log(`Connected as ID ${connection.threadId}`)
});

var supervisor = function() {
    inquirer.prompt({
        type: "list",
        name: "action",
        message: "What Would You Like to Do?",
        choices: [
            "View Product Sales By Department",
            "Create New Department",
            "Exit"
        ]
    }).then(function(answer) {
        switch (answer.action) {
            case "View Product Sales By Department":
                viewSalesByDepartment();
                break;
            
            case "Create New Department":
                createNewDepartment();
                break;
            
            case "Exit":
                connection.end();
                break;
        }
    })
}

function viewSalesByDepartment() {

}

function createNewDepartment() {
    inquirer.prompt({
        type: "input",
        message: 'Please Enter The Department Information As Follows ("department name", "overhead costs)',
        name: "department",
    }).then(function (answer) {
        var department = answer.department

        connection.query(`INSERT INTO departments VALUES (${department})`).then(
            
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
};

supervisor();
