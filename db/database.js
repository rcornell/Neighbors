const config = require('../private/dbconfig.js');

const sequelizeConfig = { url: process.env.databaseURL || config.databaseUrl, dialect: 'postgres' };

module.exports = sequelizeConfig;
