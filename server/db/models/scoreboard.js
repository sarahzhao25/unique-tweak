const Sequelize = require('sequelize');
const db = require('../db');

const Scoreboard = db.define('scoreboard', {
  score: {
    type: Sequelize.INTEGER
  }
})

module.exports = Scoreboard;
