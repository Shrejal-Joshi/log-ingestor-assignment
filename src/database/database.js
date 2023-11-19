const { Sequelize } = require('sequelize');

console.log(process.env.DATABSE_URL, ' === env ')
const sequelize = new Sequelize(process.env.DATABSE_URL, {
  dialect: 'postgres',
});

module.exports = sequelize;
