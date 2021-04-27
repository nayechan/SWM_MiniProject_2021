const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const Config = require('config');
const post = require('./models/post.js');

const sequelize = new Sequelize(
	Config.DBInfo.database,
	Config.DBInfo.username,
	Config.DBInfo.password,
	Config.DBInfo
);

// console.log(post);
// post(sequelize, DataTypes);

const db = {};
sequelize.authenticate().then(() => {
	console.log('authenticated DB');
});

fs.readdirSync(path.join(__dirname, 'models'))
	.filter(function (file) {
		return (
			file.indexOf('.') !== 0 // && file !== 'index.js' && file !== 'config.json'
		);
	})
	.forEach(function (file) {
		const model = require(path.join(__dirname, 'models', file))(sequelize, DataTypes);
		db[model.name] = model;
	});

Object.keys(db).forEach(function (modelName) {
	if ('associate' in db[modelName]) {
		db[modelName].associate(db);
	}
});

sequelize.sync({ 
	force: true,
	logging: console.log
});
module.exports = sequelize;