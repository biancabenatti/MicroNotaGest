const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const PORT = process.env.PORT || 5001;
const BACKEND_URL = process.env.AUTH_SERVICE_URL || `http://localhost:${PORT}`;

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Auth Service - NotaGest',
      version: '1.0.0',
      description: 'Microserviço responsável pelo registro e login de usuários com JWT.',
    },
    servers: [
      {
        url: BACKEND_URL,
        description: 'Servidor Auth Service'
      }
    ],
    components: {
      schemas: {
        RegisterInput: {
          type: 'object',
          properties: {
            email: { type: 'string', example: 'usuario@email.com' },
            password: { type: 'string', example: 'senha123' }
          },
          required: ['email', 'password']
        },
        RegisterSuccess: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'Usuário registrado com sucesso' },
            userId: { type: 'string', example: 'abc123' }
          }
        },
        LoginInput: {
          type: 'object',
          properties: {
            email: { type: 'string', example: 'usuario@email.com' },
            password: { type: 'string', example: 'senha123' }
          },
          required: ['email', 'password']
        },
        LoginSuccess: {
          type: 'object',
          properties: {
            token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6...' }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            error: { type: 'string', example: 'Mensagem de erro' }
          }
        }
      }
    }
  },


apis: [path.join(__dirname, '../routes/authRoutes.js')]
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`📘 Swagger rodando em: ${BACKEND_URL}/api-docs`);
};

module.exports = setupSwagger;
