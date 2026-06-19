import { Router } from 'express';
import { UsuarioController } from '../controllers/usuarioController.js';

const usuarioRoutes = Router();
const controller = new UsuarioController();

/**
 * @swagger
 * /usuarios:
 * post:
 * summary: Cria um novo usuário
 * tags: [Usuários]
 * requestBody:
 * required: true
 * content:
 * application:json:
 * schema:
 * $ref: '#/components/schemas/Usuario'
 * responses:
 * 201:
 * description: Usuário criado com sucesso
 * 400:
 * description: E-mail já cadastrado
 */
usuarioRoutes.post('/', controller.criar);

/**
 * @swagger
 * /usuarios:
 * get:
 * summary: Retorna a lista de todos os usuários
 * tags: [Usuários]
 * responses:
 * 200:
 * description: Lista de usuários
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * $ref: '#/components/schemas/Usuario'
 */
usuarioRoutes.get('/', controller.listar);

/**
 * @swagger
 * /usuarios/{id}:
 * get:
 * summary: Busca um usuário pelo ID
 * tags: [Usuários]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: integer
 * responses:
 * 200:
 * description: Usuário encontrado
 * 404:
 * description: Usuário não encontrado
 */
usuarioRoutes.get('/:id', controller.buscarPorId);

/**
 * @swagger
 * /usuarios/{id}:
 * put:
 * summary: Atualiza um usuário existente
 * tags: [Usuários]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: integer
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Usuario'
 * responses:
 * 200:
 * description: Usuário atualizado com sucesso
 */
usuarioRoutes.put('/:id', controller.atualizar);

/**
 * @swagger
 * /usuarios/{id}:
 * delete:
 * summary: Exclui um usuário do sistema
 * tags: [Usuários]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: integer
 * responses:
 * 204:
 * description: Usuário deletado com sucesso
 */
usuarioRoutes.delete('/:id', controller.deletar);

export { usuarioRoutes };