const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const Log = sequelize.define('Log', {
  level: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  resourceId: {
    type: DataTypes.STRING,
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  traceId: {
    type: DataTypes.STRING,
  },
  spanId: {
    type: DataTypes.STRING,
  },
  commit: {
    type: DataTypes.STRING,
  },
  metadata: {
    type: DataTypes.JSONB,
  },
});

module.exports = Log;
