var Sequelize = require('Sequelize');

//put connection string in a variable
var db = new Sequelize('postgres://localhost/acmedepartments', {logging:false});

var User = db.define('user', {
	name: Sequelize.STRING
});

var Department = db.define('department', {
	name: Sequelize.STRING,
	isDefault: Sequelize.BOOLEAN,
  defaultValue: false
}, {
	classMethods: {
		getDefault: function(){
			return this.findOne({
				where: {
					isDefault: true
				}
			})
			.then(function(foundDep){
				if(foundDep)
					return foundDep;
				return Department.create({
					name: 'New Department',
					isDefault: true
				});
			});
		}
	}
});

User.belongsTo(Department);

//how about exporting a models property-- this way this module can have other methods as well.
module.exports = {
	User: User,
	Department: Department
};
