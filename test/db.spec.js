var expect = require('chai').expect;
var Department = require('../db').Department;
var User = require('../db').User;

describe('Department model', function(){
	it('exists', function(done){
		expect(Department).to.be.ok;
		done();
	})
});

describe('User model', function(){
	it('exists', function(done){
		expect(User).to.be.ok;
		done();
	})
});

