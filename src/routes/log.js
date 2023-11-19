// ./src/routes/log.js

const express = require('express');
const { Op } = require('sequelize');
const Log = require('../models/logModel');

const router = express.Router();

// Route for ingesting a log (POST request to /logs)
router.post('/', async (req, res) => {
  try {
    const logData = req.body;
    // Create a new log entry in the database
    const log = await Log.create(logData);
    res.status(201).json({ message: 'Log inserted successfully', log });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route for querying logs (GET request to /logs)
router.get('/', async (req, res) => {
    try {
      const { level, message, resourceId, timestamp, traceId, spanId, commit, parentResourceId } = req.query;  
      // Build a filter object based on provided parameters
      const filter = {
        level,
        message: {
          [Op.like]: `%${message || ''}%`, // Ensure message is defined
        },
        resourceId,
        timestamp,
        traceId,
        spanId,
        commit,
        'metadata.parentResourceId': parentResourceId,
      };
      // Remove undefined or null filters
      Object.keys(filter).forEach((key) => (filter[key] === undefined || filter[key] === null) && delete filter[key]);
      // Query the database using the built filter
      const logs = await Log.findAll({
        where: filter,
        order: [['timestamp', 'DESC']], // Order by timestamp in descending order
      });
      res.status(200).json(logs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  });

// Route for searching logs within date ranges 
router.get('/date-range', async (req, res) => {
  try {
    const { start, end } = req.query;
    if (!start || !end) {
      return res.status(400).json({ error: 'Failed to Connect' });
    }
    const filter = {
      timestamp: {
        [Op.between]: [start, end],
      },
    };
    const logs = await Log.findAll({
      where: filter,
    });
    res.status(200).json(logs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed To Connect' });
  }
});

  
    
module.exports = router;
