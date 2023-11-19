require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const logsRouter = require('./src/routes/log');
const errorMiddleware = require('./src/middlewares/errorMiddleware');
const sequelize = require('./src/database/database');
const Log = require('./src/models/logModel'); // Import the Log model
const {getCurrentDateTime} = require('./src/utils/util')


const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.json());

// Sync models with the database
sequelize.sync()
  .then(() => {
    console.log('Database synced');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });

// route for inserting data
app.post('/insert-log', async (req, res) => {
  try {
    const logData = req.body;
    logData.timestamp = getCurrentDateTime();
    const log = await Log.create(logData);
    res.status(201).json({ message: 'Log inserted successfully', log });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// route for all logs or search 
app.use('/logs', logsRouter);


// Error handling middleware
app.use(errorMiddleware);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
