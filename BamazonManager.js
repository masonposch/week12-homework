var mysql = require('mysql');
var prompt = require('prompt');
var inquirer  = require('inquirer');



//=========================================================================================
//Global Variables
//=========================================================================================



var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '',
	database: 'Bamazon'
});



connection.connect(function(err){
	if(err) throw err;
	console.log('Connected as ID' + connection.threadID);
});

inquirer.prompt([
	{
		type: "list",
		message: "What would you like to do?",
		choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
		name: "choice"
	}
]).then(function(user){

	if(user.choice === "View Products for Sale"){
		
		connection.query("SELECT * FROM Products", function(err, res){
			if(err) throw err;
			for(var i=0; i < res.length; i++){
				console.log("--------------------------")
				console.log("Item ID: " + res[i].ItemID);
				console.log("Product Name: " + res[i].ProductName);
				console.log("Price: " + res[i].Price);
				console.log("--------------------------")
			}
		});

		connection.end();

	}

	else if(user.choice === "View Low Inventory"){

		connection.query("SELECT * FROM Products", function(err, res){
			if(err) throw err;
			for(var j=0; j<res.length; j++){
				if(res[j].StockQuantity <= 100){
					console.log("--------------------------")
					console.log("Low inventory on " + res[j].ProductName);
					console.log("--------------------------")
				}
			}
		});

			connection.end();

	}

	else if(user.choice === "Add to Inventory"){
		inquirer.prompt([

		{
			type: "Input",
			message: "What item would you like to restock?",
			name: "Item"
		},
		{
			type: "Input",
			message: "How many items would you like to add?",
			name: "Number"
		}

		]).then(function(newUser){
			console.log(newUser.Number);
			console.log(newUser.Item);
		});
	}

});






