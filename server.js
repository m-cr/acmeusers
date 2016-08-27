var http = require('http');
var db = require('./db');
var Department = db.Department;
var User = db.User;

var server = http.createServer(require('./app'));

Department.sync({force:true})
.then(function(){
	return User.sync({force:true});
})
.then(function(){
	server.listen(process.env.PORT, function(){
		console.log('Listening on Port ' + process.env.PORT)	
	});
})
.catch(console.error);