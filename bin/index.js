#! /usr/bin/env node

const { program } = require('commander');
const axios = require('axios');

program
  .version('1.0.0')
  .description('CLI for Log Ingestor and Query Interface');

// Command to insert a log
program
  .command('insert-log')
  .description('Insert a log')
  .action(async () => {
    try {
      const response = await axios.post('http://localhost:3000/insert-log', {
        // Provide log data here
            "level": "version info 2",
            "message": "Testing Log version 1 Ingestor",
            "resourceId": "server-231",
            "traceId": "abc23",
            "spanId": "span56",
            "commit": "Commit for 56789",
            "metadata": {
              "parentResourceId": "server-789"
            }   
        });

      console.log(response.data.message);
    } catch (error) {
      console.error('Error inserting log:', error.response ? error.response.data : error.message);
    }
  });

// Command to search logs within a date range
program
  .command('search-date-range <startDate> <endDate>')
  .description('Search logs within a date range')
  .action(async (startDate, endDate) => {
    try {
      const response = await axios.get(`http://localhost:3000/logs?startDate=${startDate}&endDate=${endDate}`);

      console.log('Queried Logs:', response.data);
    } catch (error) {
      console.error('Error searching logs:', error.response ? error.response.data : error.message);
    }
  });

program
  .command('get-logs')
  .description('Get logs')
  .action(async () => {
    try {
        /// for search with any field we can add query in same endpoint
        ///http://localhost:3000/logsmessage=Testing Log version 1 Ingestor (like this)
      const response = await axios.get('http://localhost:3000/logs');

      console.log('All Logs:', response.data);
    } catch (error) {
      console.error('Error getting logs:', error.response ? error.response.data : error.message);
    }
  });

program.parse(process.argv);
