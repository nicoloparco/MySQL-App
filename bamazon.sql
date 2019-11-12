DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products(
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NULL,
    department_name VARCHAR(45) NULL,
    price INT NULL,
    stock_quantity INT NULL,
    PRIMARY KEY (id)
);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Echo Dot 3rd Gen", "Electronics", 49.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Call of Duty Modern Warfare", "Video Games", 59.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Crayola 140 Count Art Set", "Toys & Games", 24.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Polar Express 30th Anniversary Edition", "Books", 9.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Carhartt Men's Acrylic Watch Hat A18", "Clothing, Shoes and Jewelry", 24.92, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Gorilla Glue, 20 Gram, Clear", "Tools & Home Improvement", 14.89, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("ExpertPower 12V 7 Amp EXP1270 Rechargeable Lead Acid Battery (1 Pack)", "Automotive", 17.50, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Cottonelle Ultra ComfortCare Toilet Paper, Soft Bath Tissue, Septic-Safe, 12 Big Rolls", "Health & Household", 9.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Instant Pot DUONOVA10 Duo Nova 10 Quart Pressure Cooker, QT, Stainless Steel/Black", "Kitchen & Dining", 151.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("YETI Rambler 20 oz Stainless Steel Vacuum Insulated Tumbler w/MagSlider Lid", "Sports & Fitness", 24.99, 100);
