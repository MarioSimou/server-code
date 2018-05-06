/*
This function constructs a string, which represents the time that the function was executed.
The time is given in YEAR-MONTH-DAY-HOUR-MIN-SEC
Inputs: none
Output: tim

https://stackoverflow.com/questions/7357734/how-do-i-get-the-time-of-day-in-javascript-node-jse
*/
function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;
}


// express is the server that forms part of the nodejs program
var express = require('express'); // require is a nodeJS speak for import
var http = require('http'); // require an http protocol 
var path = require("path"); 
var app = express(); // set up an app to run the server, using the imported express API
var httpServer = http.createServer(app); // create the server
httpServer.listen(4480); // tell it which port to listen on

var pg = require('pg'); // postgres
var fs = require('fs');


// add an http server to serve files to the Edge browser 
// due to certificate issues it rejects the https files if they are notv
// directly called in a typed URL

// adding functionality to allow cross-domain queries when PhoneGap is running a server
app.use(function(req, res, next) {
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
		res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		next();
	});


// POST REQUESTS
// bodyParser configuration
var bodyParser = require('body-parser'); // create a body-parser object
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended : true})); // support encoded bodies

app.post('/insertDb', function(req,res)
	{
	console.log('insertDb request has started...');
 	// use of POST to upload the data
 	// parameters form part of the BODY of the request rather than the RESTful API
 	console.dir(req.body);
 	// attempt to connect on the database
	
	// read in the file and force it to be a string by adding '' at the beginning
	var configtext = ""+ fs.readFileSync('/home/studentuser/certs/postGISConnection.js');

	// split the configtext variable based on a comma separator
	var configarray = configtext.split(',');
	// create an empty object 
	var config = {};

	// iterate over the configarray, populating the config array
	for(var i=0; i < configarray.length; i++)
	{
		var split = configarray[i].split(':');
		config[split[0].trim()] = split[1].trim();
	}
	// create the uri that the client requests
	var uri = 'postgres://'+config['user'] +':' + config['password'] + '@'+ config['host'] + ':' + config['port'] + '/' + config['database'];

	// postgres client, that will allow access to the postgres database
	// uri = postgres server address
	const client = new pg.Client(uri);

	client.connect(function(err)
		{
		// if an error is not thrown
		if(!err)
			{
				// and if the request object (postString) does not contain the req.body.userid variable
				if(req.body.userid == null){
					// perform an INSERT Query based on an input from the question app
					console.log('QUESTION APP IMPORT HAS STARTED...');
					// the query is constructed
					var queryString = 'INSERT INTO webapps."questions"(depname,question,answerA,answerB,answerC,answerD,correct,geom) VALUES (';
					queryString  = queryString +"'" + req.body.depname+ "','"+ req.body.question+ "','" + req.body.firstAns + "','" + req.body.secondAns + "','" + req.body.thirdAns + "','" + req.body.forthAns + "','" + req.body.correct  +"'," + "st_GeomFromText('POINT("+ req.body.lng + " " + req.body.lat+ ")',4326))";			
				// if the request object (postString) contains a userid variable, then, the following condition is executed
				}else if(req.body.userid != null){
					console.log('QUIZ APP IMPORT HAS STARTED...');
					// the query String is constructed
					var queryString = 'INSERT INTO webapps."userRes"(userid,isMobile,question,userans,correct,time,geom) VALUES(';
					queryString = queryString + "'" + req.body.userid + "','" + req.body.isMobile + "','" + req.body.question + "','" + req.body.userAns + "','" + req.body.correct +"','"  + getDateTime() +"'," + "st_GeomFromText('POINT(" + req.body.lng + " " + req.body.lat + ")',4326))";
				}else{	
					// indefined input
					console.log('Undefined paremeters');
				}
				// message - the constructed query is shown
				console.log(queryString);
				// perfrom the query
				client.query(queryString,function(err,results)
				{// if an error exist in the query
					if(err)
					{
						console.log(err);
						res.status(400).send(err);
					}else
					{
						res.status(200).send('The data has benn correctly stored...');
					}
				});	
			}else{console.log('problem during the connection');}	
		});

	});


	
// adding functionality to log the requests
app.use(function (req, res, next) {
		var filename = path.basename(req.url);
		var extension = path.extname(filename);
		console.log("The file " + filename + " was requested.");
		next();
	});

app.get('/',function (req,res) {
		res.send("hello world from the HTTP server");
	});


	// the / indicates the path that you type into the server - in this case, what happens when you type in:  http://developer.cege.ucl.ac.uk:32560/xxxxx/xxxxx
 app.get('/:name1', function (req, res) {
  // run some server-side code
  // the console is the command line of your server - you will see the console.log values in the terminal window
  console.log(req.params.name1);
  if(req.params.name1 == 'postgis'){
		// read in the file and force it to be a string by adding '' at the beginning
	var configtext = ""+ fs.readFileSync('/home/studentuser/certs/postGISConnection.js');

	// split the configtext variable based on a comma separator
	var configarray = configtext.split(',');
	// create an empty object 
	var config = {};

	// iterate over the configarray, populating the config array
	for(var i=0; i < configarray.length; i++)
	{
		var split = configarray[i].split(':');
		config[split[0].trim()] = split[1].trim();
	}
	// create the uri that the client requests
	var uri = 'postgres://'+config['user'] +':' + config['password'] + '@'+ config['host'] + ':' + config['port'] + '/' + config['database'];

	// postgres client, that will allow access to the postgres database
	// uri = postgres server address
	const client = new pg.Client(uri);

// attempt to connect on the database
	client.connect((err)=>{
		// if an error is not thrown
		if(!err)
		{
			// perform a query that selects features from ucl poi dataset
			
			var queryString = "SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features FROM (SELECT 'Feature' As type ,";
			var queryString = queryString + ' ST_AsGeoJSON(lg."geom")::json As geometry, row_to_json((SELECT l FROM (SELECT lg."id",lg."question",lg."depname",lg."answera" ,lg."answerb", lg."answerb", lg."answerc",lg."answerd",lg."correct")As l )) As properties FROM webapps."questions" As lg limit 100 ) As f';
			console.log('Query of Geojson extraction:\n' + queryString);
			client.query(queryString, (err,results)=>
			{
				// if the quert returns an error, console that error
				if(err)
				{
					console.log(err);
					res.status(400).send(err);
				}else
				{
					// if the query returns results, console them
					console.log(results.rows);
					res.status(200).send(results.rows[0]);
				}		
			});	
		}	
	});


  // the res is the response that the server sends back to the browser - you will see this text in your browser window
	}else{
	  res.sendFile(__dirname + '/'+req.params.name1);
	}
});


 // the / indicates the path that you type into the server - in this case, what happens when you type in:  http://developer.cege.ucl.ac.uk:32560/xxxxx/xxxxx
 app.get('/:name1/:name2', function (req, res) {
 // run some server-side code
 // the console is the command line of your server - you will see the console.log values in the terminal window
  console.log('request '+req.params.name1+"/"+req.params.name2);

  // the res is the response that the server sends back to the browser - you will see this text in your browser window
  res.sendFile(__dirname + '/'+req.params.name1+'/'+req.params.name2);
});


	// the / indicates the path that you type into the server - in this case, what happens when you type in:  http://developer.cege.ucl.ac.uk:32560/xxxxx/xxxxx/xxxx
	app.get('/:name1/:name2/:name3', function (req, res) {
		// run some server-side code
		// the console is the command line of your server - you will see the console.log values in the terminal window
		console.log('request '+req.params.name1+"/"+req.params.name2+"/"+req.params.name3); 
		// send the response
		res.sendFile(__dirname + '/'+req.params.name1+'/'+req.params.name2+ '/'+req.params.name3);
	});
  // the / indicates the path that you type into the server - in this case, what happens when you type in:  http://developer.cege.ucl.ac.uk:32560/xxxxx/xxxxx/xxxx
  app.get('/:name1/:name2/:name3/:name4', function (req, res) {
  // run some server-side code
  // the console is the command line of your server - you will see the console.log values in the terminal window
 console.log('request '+req.params.name1+"/"+req.params.name2+"/"+req.params.name3+"/"+req.params.name4); 
  // send the response
  res.sendFile(__dirname + '/'+req.params.name1+'/'+req.params.name2+ '/'+req.params.name3+"/"+req.params.name4);
});

