/*

	Multiple servers on one port
		http://httpd.apache.org/docs/2.2/vhosts/examples.html
		https://stackoverflow.com/questions/25971399/create-a-domain-name-pointing-to-an-ip-of-port-different-than-80

	Send updates to customers
		Nodemailer - for email updates/responce
		Text updates?

	respond user viewable data for unit
	Make somthing like /unit/customer that has login
	for accessing list of customers lights
	accessed individually through /unit/customer/id or as a group with /customer/lights
	or somthing idk yet

*/

var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
//var unitController = require('./controllers/unitController')

var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Carter01msql!",
  database: "home"
});

//Set ejs as view engine & setup assets (css)
app.set('view engine', 'ejs');
app.use(express.static('./public'));

//Home page
app.get('/', function(req,res){
	res.render('index');
});

//Contact page
app.get('/contact', function(req,res){
	res.render('contact');
});

//lights page for customers
app.get('/lights', function(req,res){

  var sql = "SELECT * FROM lights";
  con.query(sql, (error, results, fields) => {
    if (error) throw err;

    console.log(results);
    res.render('lights', {data: results});

  });

});

//Unit page for customers individual unit
app.get('/lights/:light_num', function(req,res){

  var sql = "SELECT * FROM lights WHERE light_num ='"+req.params.light_num +"'";
  con.query(sql, (error, results, fields) => {
    if (error) throw err;

    var databaseEntry = results;
    if (databaseEntry[0] == undefined){
        res.render('404');
    } else {
      res.render('light', {light_num: req.params.light_num, data: databaseEntry[0]});
    }
  });

});

//API, responds w/ json data to unit general
app.get('/api/lights', function(req,res){
	var jsonObj = require('./lights.json');
	res.json(jsonObj);
	//res.send('requested data for unit #' + req.params.id);
});

//API, responds w/ json data to unit specific
app.get('/api/:light_num', function(req,res){

  var sql = "SELECT * FROM lights WHERE fan_num ='"+req.params.light_num +"'";
  con.query(sql, (error, results, fields) => {
    if (error) throw err;

    var databaseEntry = results;
    if (databaseEntry[0] == undefined){
        res.send('404');
    } else {
      res.json(databaseEntry);
      //res.render('unit', {fan_num: req.params.fan_num, data: databaseEntry[0]});
    }
  });

  //var jsonObj = require('./lights.json');
	//res.json(jsonObj);
	//res.send('requested data for unit #' + req.params.id);
});

//API, recieves unit data
app.post('/api', urlencodedParser, function (req, res) {

  var date = new Date();
  var sql = "INSERT INTO lights ("+
  "light_num, "+
  "brightness, "+
  "colors, "+
  "leds_powered"+
  ") VALUES (" +
    "'"+req.body.light_num+"', "+
    "'"+req.body.brightness+"', "+
    "'"+req.body.colors+"', "+
    "'"+req.body.leds_powered+"'"+
    ") ON DUPLICATE KEY UPDATE "+
    "brightness = "+
    "'"+req.body.brightness+"', "+
    "colors = "+
    "'"+req.body.colors+"', "+
    "leds_powered = "+
    "'"+req.body.leds_powered+"'";
	con.query(sql, function(err, result){
		if (err) throw err;
    //console.log(sql);
	});

	console.log('POST # '+req.body.light_num+' ('+ req.body.leds_powered+')');
  res.send('POST request from fan# ' + req.body.light_num + ' ('+ req.body.leds_powered+')');
	//location.reload() TODO: figure this out
})

app.listen(3000);
