import { Router } from 'express';
import { MovimentacaoController } from '../controllers/MovimentacaoController.js';

const movimentacaoRoutes = Router();
const controller = new MovimentacaoController();

/**
 * @swagger
 * /movimentacoes/entrada:
 * post:
 * summary: Registra a entrada de um veículo e altera a vaga para Ocupada
 * tags: [Movimentações]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required: [veiculoId, vagaId, usuarioId, valorHora]
 * properties:
 * veiculoId: { type: integer, example: 1 }
 * vagaId: { type: integer, example: 3 }
 * usuarioId: { type: integer, example: 1 }
 * valorHora: { type: number, example: 15.00 }
 * responses:
 * 201:
 * description: Entrada registrada com sucesso
 * 400:
 * description: Vaga não disponível ou inexistente
 */
movimentacaoRoutes.post('/entrada', controller.registrarEntrada);

/**
 * @swagger
 * /movimentacoes/{movimentacaoId}/saida:
 * put:
 * summary: Registra a saída, calcula o valor total e libera a vaga
 * tags: [Movimentações]
 * parameters:
 * - in: path
 * name: movimentacaoId
 * required: true
 * schema:
 * type: integer
 * responses:
 * 200:
 * description: Saída processada com sucesso
 * 400:
 * description: Movimentação inválida ou já encerrada
 */
movimentacaoRoutes.put('/:movimentacaoId/saida', controller.registrarSaida);

/**
 * @swagger
 * /movimentacoes:
 * get:
 * summary: Lista todo o histórico de movimentações (Entradas e Saídas)
 * tags: [Movimentações]
 * responses:
 * 200:
 * description: Histórico completo obtido
 */
movimentacaoRoutes.get('/', controller.listar);

export { movimentacaoRoutes };