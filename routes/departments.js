var express = require('express');
var router = express.Router();
var Department = require('../db').Department;
var User = require('../db').User;
var Promise = require('bluebird');

module.exports = router;

router.get('/:id', function(req, res, next){
	var defaultDep = Department.getDefault();
	var departments = Department.findAll();
	var thisDep = Department.findOne({
		where: {
			id: req.params.id*1
		}
	});

	Promise.all([defaultDep, departments, thisDep])
	.spread(function(defaultDep, departments, thisDep){
		console.log(thisDep.isDefault);
		res.render('departments', {
			title: "Departments",
			defaultDepartment: defaultDep,
			departments: departments,
			thisDepartment: thisDep,
			onDefault: thisDep.isDefault
		});
	})
	.catch(next);
	
	// Department.findOne({where: {id: req.params.id*1}})
	// .then(function(foundDep){
	// 	if(foundDep.isDefault === true){
	// 		return res.render('departments', {
	// 			title: 'Departments', 
	// 			defaultDepartment: foundDep,
	// 			departments: allDeps,
	// 			thisDepartment: foundDep, 
	// 			onDefault: true})
	// 	};

	// 	return Department.getDefault()
	// 	.then(function(foundDefault){
	// 		res.render('departments', {
	// 			title: 'Departments',
	// 			defaultDepartment: foundDefault,
	// 			departments: allDeps,
	// 			thisDepartment: foundDep,
	// 			onDefault: false
	// 		});
	// 	});
	// })
	// .catch(next);
});

router.post('/', function(req, res, next){
	Department.create({
		name: req.body.newDep
	})
	.then(function(newDep){
		res.redirect('/departments/' + newDep.id);
	})
	.catch(next);
});

// router.delete('/:depId/employees/:usrId', function(req, res, next){
// 	User.create({});
// });

// router.post('/:depId/employees', function(req, res, next){
	//updates default
// });

//router.put('/:depId/customers/:usrId')
//makes employee into customer