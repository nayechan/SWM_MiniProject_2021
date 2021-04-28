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

// 모델 초기화
const modelInstances = {};
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
		modelInstances[model.name] = model;
	});
// 모델 관계 초기화
Object.keys(modelInstances).forEach(function (modelName) {
	if ('associate' in modelInstances[modelName]) {
		modelInstances[modelName].associate(modelInstances);
	}
});

// 데이터 베이스 동기화
sequelize.sync({ 
	// force: true,
	logging: console.log
});
module.exports = sequelize;