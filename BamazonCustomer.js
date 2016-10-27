var mysql = require('mysql');
var prompt = require('prompt');



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


//Searches through the entire MySQL table and lists all the products that are available
connection.query('SELECT * FROM Products', function(err, res){
	
	if(err) throw err;
	for(var i=0; i < res.length; i++){
		console.log("--------------------------")
		console.log("Item ID: " + res[i].ItemID);
		console.log("Product Name: " + res[i].ProductName);
		console.log("Price: " + res[i].Price);
		console.log("--------------------------")
	}
	
	//Begins PROMPT function
	prompt.start();

	prompt.get([{

		description: "What is the ID of the product you are interested in?",
		type: "String", 
		pattern: /^[0-9]*$/,
		name: "ID",
		message: "IDs must be a string of numbers",
		required: true

	}, {	

		description: "How many units would you like to buy?",
		type: "String", 
		pattern: /^[0-9]*$/,
		name: "units",
		message: "IDs must be a string of numbers",
		required: true

	}], function(err, result){

		//Targets the ItemID in from MySQL table, then finds the row and product -->
		//-->containing the ItemID entered by the user
		connection.query("SELECT * FROM Products WHERE ItemID = ?", [parseInt(result.ID)], function(err, res){
			if(err) throw err;
			for(var i=0; i<res.length; i++){
				console.log(res[i].ProductName);
				//Console Logs the ItemID and the number of units customer wants to purchase
				console.log("Item ID: " + result.ID);
				console.log("Number of units purchased: " + result.units);

				//Check to see if the number of units requested is larger or smaller than the number of units available in MySQL table
				if(parseInt(result.units) > res[i].StockQuantity){
					console.log("=======================");
					console.log("Insufficient quantity!");
					console.log("=======================");
				} else {
					console.log("==============================================================================");
					console.log("Great! Your order is complete.")
					console.log("Your total for this purchase is $" + (parseInt(result.units) * res[i].Price));
					console.log("==============================================================================");

					// connection.query("UPDATE Products SET StockQuantity = ? WHERE ItemID = ?", [res[i]StockQuantity - parseInt(result.units), parseInt(result.ID)], function(err, result){
					// 	if(err) throw err;
					// 	console.log("MySQL table has been updated");
					// });
				}
			}
		});



		connection.end();
		

	});


});





