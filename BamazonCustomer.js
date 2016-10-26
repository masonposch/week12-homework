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
				console.log(result.ID);
				console.log(result.units);
			}
		});

		connection.end();
		
		//Console Logs the ItemID and the number of units customer wants to purchase

	});


});





