import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Estacionamento',
      version: '1.0.0',
      description: 'Documentação da API do Sistema de Gerenciamento de Estacionamento',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor Local',
      },
    ],
    components: {
      schemas: {
        Usuario: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'Pedro Admin' },
            email: { type: 'string', example: 'pedro@email.com' },
            perfil: { type: 'string', example: 'Gerente' }
          }
        },
        Cliente: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            nome: { type: 'string', example: 'Amanda Silva' },
            cpf: { type: 'string', example: '12345678910' },
            telefone: { type: 'string', example: '11999998888' },
            email: { type: 'string', example: 'amanda@email.com' }
          }
        },
        Veiculo: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            placa: { type: 'string', example: 'ABC1B34' },
            modelo: { type: 'string', example: 'Onix' },
            marca: { type: 'string', example: 'Chevrolet' },
            cor: { type: 'string', example: 'Prata' },
            tipo: { type: 'string', example: 'Carro' },
            clienteId: { type: 'integer', example: 1 }
          }
        },
        Vaga: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            numero: { type: 'string', example: 'V-10' },
            setor: { type: 'string', example: 'Piso Azul' },
            status: { type: 'string', example: 'Livre' },
            tipo: { type: 'string', example: 'Carro' }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js'], 
};

const swaggerSpecs = swaggerJsdoc(options);

export default swaggerSpecs;