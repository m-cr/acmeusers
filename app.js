var express = require('express');
var swig = require('swig');
swig.setDefaults({ cache: false });
var bodyParser = require('body-parser');
var path = require('path');

var db = require('./db');
var Department = db.Department;

var app = express();
app.use(express.static(path.join(__dirname, '/node_modules')));

app.set('view engine', 'html');
app.engine('html', swig.renderFile);
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({extended:false}));

app.use(require('volleyball'));//interesting



app.get('/', function(req, res, next){
	Department.getDefault()
	.then(function(department){
		return res.render('index', {
			title: 'Acme Departments - Home', 
			defaultDepartment: department,
			tab: 'home'
		});
	});
});

app.use('/departments', require('./routes/departments'));

app.use(function(err, req, res, next) {
	console.log("Error: ");
	console.log(err, err.stack);
  //how about sending response with error?
});

// app.use('/customers', require('./routes/customers'));

module.exports = app;
