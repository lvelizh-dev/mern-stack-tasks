const express = require('express');
const router = express.Router();

const personaController = require('../controllers/persona.controller');
router.get('/', personaController.getPersonas);
router.get('/:id', personaController.getPersonaByID);
router.post('/', personaController.postPersona);
router.put('/:id', personaController.putPersona);
router.delete('/:id', personaController.deletePersona);

module.exports = router;