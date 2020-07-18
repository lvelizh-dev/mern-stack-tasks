const express = require('express');
const router = express.Router();

const taskController = require('../controllers/task.controller');
router.get('/', taskController.getTasks);
router.get('/:id', taskController.getTaskByID);
router.post('/', taskController.postTask);
router.put('/:id', taskController.putTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;