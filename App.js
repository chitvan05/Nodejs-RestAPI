var http = require('http');
var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyparser = require('body-parser');

const fs = require('fs');

let rawdata = fs.readFileSync('C:\\Users\\Admin\\Desktop\\json_parser\\json_parser\\smartship_json.json');
let student = JSON.parse(rawdata);
console.log(student);

var connection = mysql.createConnection({
host:"localhost",
user:"root",
password:"root",
database:"node",

});



connection.connect(function(err){
	if(err) throw err
		console.log("you are now connected");
});



app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
	extended: true
}));


var server = app.listen(3000, "127.0.0.1", function () {

  

  console.log("Example app listening at 3000");
});



app.get('/technology',function(req,res){

var sql = "SELECT * FROM technology";
connection.query(sql,function(err,result){
	if(err) throw err;

	console.log("list of technology"+JSON.stringify(result));
	res.end(JSON.stringify(result));
});

}); 

app.post('/technology',function(req,res){

	const Angular = req.body.angular;
	const Reactjs = req.body.reactjs;
	const id = req.body.id;
	const data = req.body;
	console.log(req.body);
	var sql = "INSERT INTO technology (Reactjs,Angular,id) values(?,?,?) ";
	connection.query(sql,[Reactjs,Angular,id],function(error,result,fields){
		if (error) throw error;

		res.end("added successfully")
	});
});

app.put('/technology',function(req,res){

console.log(req.body);
	var reactjs = req.body.Reactjs;
	var angular = req.body.Angular;
	var id = req.body.id;

	sql ="UPDATE technology set Reactjs = ?,Angular = ? where id = ?";

	connection.query(sql,[reactjs,angular,id],function(error,fields,result){
		if(error) throw error;
		res.end("updated records......");

	});
});

app.delete('/technology',function(req,res){

	var ID = req.body.id;
console.log(ID)
	console.log(req.body);

	connection.query("DELETE FROM technology where id = ?",[1],function (error,result,fields){
		if (error) throw error;
		res.end("record deleted successfully");
	});
});