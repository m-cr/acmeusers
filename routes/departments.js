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
		res.render('departments', {
			title: "Departments",
			defaultDepartment: defaultDep,
			departments: departments,
			thisDepartment: thisDep,
			onDefault: thisDep.isDefault,
			tab: 'departments'
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

router.post('/:id/employees', function(req, res, next){
	Department.getDefault()
	.then(function(defaultDep){
		return defaultDep.updateAttributes({
			isDefault: false
		})
	})
	Department.findOne({
		where: {
			id: req.params.id*1
		}
	})
	.then(function(thisDep){
		return thisDep.updateAttributes({
			isDefault: true
		})
	})
	.catch(next);

	res.redirect('/departments/' + req.params.id);
});