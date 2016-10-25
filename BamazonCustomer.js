var mysql = require('mysql');
var prompt = require('prompt');



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
});

connection.end();