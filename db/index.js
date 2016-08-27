var Sequelize = require('sequelize');

var db = new Sequelize(process.env.DATABASE_URL, {logging:false});

var User = db.define('user', {
	name: Sequelize.STRING
});

var Department = db.define('department', {
	name: Sequelize.STRING,
	isDefault: Sequelize.BOOLEAN
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

module.exports = {
	User: User,
	Department: Department
};
