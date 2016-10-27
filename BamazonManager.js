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

});