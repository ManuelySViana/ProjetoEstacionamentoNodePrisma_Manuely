import { Router } from 'express';
import { ClienteController } from '../controllers/clienteController.js';

const clienteRoutes = Router();
const controller = new ClienteController();

/**
 * @swagger
 * /clientes:
 * post:
 * summary: Cadastra um novo cliente
 * tags: [Clientes]
 * requestBody:
 * required: true
 * content:
 * application:json:
 * schema:
 * $ref: '#/components/schemas/Cliente'
 * responses:
 * 201:
 * description: Cliente cadastrado
 * 400:
 * description: CPF já cadastrado
 */
clienteRoutes.post('/', controller.criar);

/**
 * @swagger
 * /clientes:
 * get:
 * summary: Lista todos os clientes
 * tags: [Clientes]
 * responses:
 * 200:
 * description: Retorna a lista de clientes
 */
clienteRoutes.get('/', controller.listar);

export { clienteRoutes };