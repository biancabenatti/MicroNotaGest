const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const PORT = process.env.PORT || 5001;

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Auth Service - NotaGest',
      version: '1.0.0',
      description: 'Microserviço responsável pelo registro e login de usuários com JWT.',
    },
    servers: [
      { url: `http://localhost:${PORT}`, description: 'Servidor local do Auth Service' }
    ],
    components: {
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }
      },
      schemas: {
        RegisterInput: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            name: { type: 'string', example: 'Ana Laura' },
            email: { type: 'string', example: 'ana@example.com' },
            password: { type: 'string', example: '123456' }
          }
        },
        RegisterSuccess: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'Usuário registrado com sucesso!' },
            user: {
              type: 'object',
              properties: { id: { type: 'string', example: '671bcd00f29b2b83a4e1a8f3' }, email: { type: 'string', example: 'ana@example.com' } }
            }
          }
        },
        LoginInput: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', example: 'ana@example.com' },
            password: { type: 'string', example: '123456' }
          }
        },
        LoginSuccess: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'Login realizado com sucesso!' },
            token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR...' }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: { error: { type: 'string', example: 'Credenciais inválidas.' } }
        }
      }
    }
  },
  apis: ['./../docs/swaggerPaths.js'] 
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`📘 Swagger rodando em: http://localhost:${PORT}/api-docs`);
};

module.exports = setupSwagger;
