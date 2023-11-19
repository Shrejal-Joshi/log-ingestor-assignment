const logsService = require('../services/logServices');

class LogsController {
  async ingestLog(req, res, next) {
    try {
      const result = await logsService.ingestLog(req.body);
      res.status(201).send(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new LogsController();
