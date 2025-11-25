const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth/authController'); 

// --- Rotas de Autenticação (PÚBLICAS) ---

// POST /register: Rota para criar uma nova conta de usuário.
router.post('/register', authController.registerUser);

// POST /login: Rota para autenticar o usuário e retornar o JWT de sessão.
router.post('/login', authController.loginUser);

// Exporta o objeto 'router' contendo todas as rotas de autenticação
module.exports = router;