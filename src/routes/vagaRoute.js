import { Router } from 'express';
import { VagaController } from '../controllers/vagaController.js';

const vagaRoutes = Router();
const controller = new VagaController();

/**
 * @swagger
 * /vagas:
 * post:
 * summary: Cria uma nova vaga no estacionamento
 * tags: [Vagas]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Vaga'
 * responses:
 * 201:
 * description: Vaga criada com sucesso
 * 400:
 * description: Número de vaga já existente
 */
vagaRoutes.post('/', controller.criar);

/**
 * @swagger
 * /vagas:
 * get:
 * summary: Retorna a lista de todas as vagas (livres e ocupadas)
 * tags: [Vagas]
 * responses:
 * 200:
 * description: Lista de vagas obtida com sucesso
 */
vagaRoutes.get('/', controller.listar);

export { vagaRoutes };