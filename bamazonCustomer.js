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
    loadDatabase();
});

function loadDatabase() {
    connection.query("SELECT * FROM products", function (err, response) {
        if (err) throw err;
        console.log("\n----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------\n");
        console.log("Welcome to the Bamazon Store!");
        console.log("");
        console.log("Below is a list of all items and their respective quantities");
        console.log("\n----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------\n");


        var table = new Table({
            head: ["Product Id", "Product Name", "Department Name", "Product Price", "Product Quantity", "Product Sales"],
            colWidths: [15, 100, 30, 15, 15, 15],
            colAligns: ["center"],
            style: {
                head: ["aqua"],
                compact: true
            }
        });

        for (var i = 0; i < response.length; i++) {
            table.push([
                response[i].item_id,
                response[i].product_name,
                response[i].department_name,
                response[i].price,
                response[i].stock_quantity,
                response[i].product_sales])
        };

        console.log(table.toString());
        console.log("");
    });

};

loadDatabase();

var customer = function () {
    inquirer.prompt(
        {
            type: "input",
            message: "What is the ID number of the item you would like to buy?",
            name: "item"
        }
    ).then(function (firstAnswer) {

        var productID = firstAnswer.item

        connection.query(`SELECT * FROM products WHERE item_id=${productID}`, function (err, res) {
            if (err) throw err;
            if (res.length === 0) {
                console.log("This product is out of stock or does not exist, please try a different ID number")
                customer();
            } else {
                
                inquirer.prompt(
                    {
                        type: "input",
                        message: "How many of this item would you like to purchase?",
                        name: "quantity"
                    }).then(
                        function (secondAnswer) {
                        console.log(secondAnswer)
                        var productQuantity = secondAnswer.quantity

                        if (productQuantity > res[0].stock_quantity) {
                            console.log(`Sorry, we only have ${res[0].stock_quantity} left`)
                            customer();
                        } else {
                            console.log("")
                            console.log(`${res[0].product_name} purchased`);
                            console.log(`${productQuantity} @ ${res[0].price}`);

                            var newQuantity = res[0].stock_quantity - productQuantity;
                            var quantitySold = (100 - newQuantity)
                            
                            connection.query(
                                "UPDATE products SET stock_quantity = " +
                                newQuantity +
                                " WHERE item_id = " +
                                res[0].item_id,

                                function (err, res) {
                                    if (err) throw err;
                                    console.log("")
                                    console.log("Your purchase has been made")
                                    }
                                ).then(
                                    connection.query(`UPDATE products SET product_sales = ${quantitySold} * price WHERE item_id = ${res[0].item_id}`, function (err, res) {
                                        if (err) throw err;
                                        loadDatabase();
                                        customer();
                                    })
                                )
                            }
                        });
                    }
            });
        });
    };

customer();

