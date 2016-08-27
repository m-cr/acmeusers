var express = require('express');
var router = express.Router();
var Department = require('../db').Department;
var Users = require('../db').User;

module.exports = router;

router.get('/:id', function(req, res, next){
	Department.findOne({where: {id: req.params.id*1}})
	.then(function(foundDep){
		if(foundDep.isDefault === true){
			return res.render('departments', {
				title: 'Departments', 
				defaultDepartment: foundDep,
				thisDepartment: foundDep, 
				onDefault: true})
		};

		return Department.getDefault()
		.then(function(foundDefault){
			res.render('departments', {
				title: 'Departments',
				defaultDepartment: foundDefault,
				thisDepartment: foundDep,
				onDefault: false
			});
		});
	})
	.catch(next);
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

// router.delte('/:depId/employees/:usrId', function(req, res, next){
// 	User.create({});
// });

// router.post('/:depId/employees', function(req, res, next){
	//updates default
// });

//router.put('/:depId/customers/:usrId')
//makes employee into customer