//var express = require('express');
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Carter01msql!",
  database: "home"
});

/*
con.connect( (err) =>{
  if(err){
    throw err;
  }
  console.log('MySql connected');
})

var app = express();
app.listen('3000', () =>{
  console.log('Server started on port 3000');
});

*/

/*
con.connect(function(err) {
  if(err) throw err;
  console.log("Connected");
  con.query("CREATE DATABASE home", function (err, result) {
    if(err) throw err;
    console.log("Database created");
  });
});
*/

/*
con.connect(function(err) {
  if(err) throw err;
  console.log("Connected");
  var sql = "CREATE TABLE lights (light_num VARCHAR(255), location VARCHAR(255), state VARCHAR(255))";
  con.query(sql, function (err, result) {
    if(err) throw err;
    console.log("Table created");
  });
});
*/

var sql = "DROP TABLE lights";
con.query(sql, function (err, result) {
  console.log("Table deleted");

  var sql = "CREATE TABLE lights ("+
    "light_num VARCHAR(255),"+
    "brightness VARCHAR(255),"+
    "colors VARCHAR(255),"+
    "leds_powered VARCHAR(255),"+
    "UNIQUE KEY (light_num)"+
    ")";


  con.query(sql, function (err, result) {
    if(err) throw err;
    console.log("Table created");

    var sql = "INSERT INTO lights ("+
      "light_num, "+
      "brightness, "+
      "colors, "+
      "leds_powered"+
      ") VALUES (" +
      "'-1', " +
      "'255', " +
      "'red', " +
      "'1'" +
      ")";

    //con.query(sql, [values], function (err, result) {
    con.query(sql, function (err, result) {
      if(err) throw err;
      console.log("Number of records inserted: " + result.affectedRows);con.query("SELECT * FROM lights", function (err, rows, fields) {
        if(err) throw err;
        console.log(rows);
      });
    });
  });
});


/*
con.connect(function(err) {
  if(err) throw err;
  console.log("Connected");
  var sql = "INSERT INTO home (light_num, location, state) VALUES ('1', 'Office', 'on')";
  con.query(sql, function (err, result) {
    if(err) throw err;
    console.log("1 record inserted");
  });
});
*/

/*
con.connect(function(err) {
  console.log("Connected!");
  var sql = "INSERT INTO home (light_num, location, state) VALUES ?";
  var values = [
    ['0', 'Home', 'on'],
    ['1', 'Office', 'on'],
    ['2', 'Home', 'on']
  ];
  con.query(sql, [values], function (err, result) {
    if(err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });
});
*/

/*
con.connect(function(err) {
  if(err) throw err;
  con.query("SELECT * FROM home", function (err, rows, fields) {
    if(err) throw err;
    console.log(rows);
  });
});
*/
