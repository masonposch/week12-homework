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



connection.query('SELECT * FROM Products', function(err, res){
	if(err) throw err;
	for(var i=0; i < res.length; i++){
		console.log("--------------------------")
		console.log("Item ID: " + res[i].ItemID);
		console.log("Product Name: " + res[i].ProductName);
		console.log("Price: " + res[i].Price);
		console.log("--------------------------")
	}
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

		console.log(result.ID);
		console.log(result.units);

	});
});


connection.end();




