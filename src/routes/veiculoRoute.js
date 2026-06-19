import { Router } from 'express';
import { VeiculoController } from '../controllers/veiculoController.js';

const veiculoRoutes = Router();
const controller = new VeiculoController();

/**
 * @swagger
 * /veiculos:
 * post:
 * summary: Cadastra um novo veículo vinculado a um cliente
 * tags: [Veículos]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Veiculo'
 * responses:
 * 201:
 * description: Veículo cadastrado com sucesso
 * 400:
 * description: Placa já cadastrada no sistema
 */
veiculoRoutes.post('/', controller.criar);

/**
 * @swagger
 * /veiculos:
 * get:
 * summary: Retorna a lista de todos os veículos cadastrados
 * tags: [Veículos]
 * responses:
 * 200:
 * description: Lista de veículos obtida com sucesso
 */
veiculoRoutes.get('/', controller.listar);

export { veiculoRoutes };