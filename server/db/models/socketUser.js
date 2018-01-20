const Sequelize = require('sequelize');
const db = require('../db');

const SocketUser = db.define('socketUser', {
  name: Sequelize.STRING
})

module.exports = SocketUser;
//maybe i'll use it
