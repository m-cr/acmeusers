var express = require('express');
var router = express.Router();
var Department = require('../db').Department;
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

/*
 * router.post('/:id/employees', function(){
 *  //create a user with the departmenId which is passed;
 *  //redirect back to department
 *
 * });
 */
/*
 * router.delete('/:departmentId/employees/:id', function(){
 *  //delete the user and redirect to department
 *
 * });
 */

//restful routes-- you're updating department here... no?
//should be put /:id
router.post('/:id/employees', function(req, res, next){
	Department.getDefault()
	.then(function(department){
    department.isDefault = false;
    return department.save();
	})
  .then(function(){
	  return Department.findById(req.params.id);
  })
  .then(function(department){
    department.isDefault = true;
    return department.save();
  })
  .then(function(department){
	  res.redirect('/departments/' + req.params.id);
  })
	.catch(next);
});
