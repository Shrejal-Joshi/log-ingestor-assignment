const Log = require('../models/logModel');

class LogsService {
  async ingestLog(logData) {
    try {
      await Log.create(logData);
      return 'Log ingested successfully';
    } catch (error) {
      throw error;
    }
  }

}

module.exports = new LogsService();
