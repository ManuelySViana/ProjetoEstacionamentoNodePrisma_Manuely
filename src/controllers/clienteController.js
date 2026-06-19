const { prisma } = require('../config/prisma.js');

class ClienteController {
  async criar(req, res) {
    try {
      const { nome, cpf, telefone, email } = req.body;

      const clienteExiste = await prisma.cliente.findUnique({ where: { cpf } });
      if (clienteExiste) return res.status(400).json({ error: 'CPF já cadastrado.' });

      const cliente = await prisma.cliente.create({
        data: { nome, cpf, telefone, email }
      });

      return res.status(201).json(cliente);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar cliente.' });
    }
  }

  async listar(req, res) {
    try {
      const clientes = await prisma.cliente.findMany({ include: { veiculos: true } });
      return res.json(clientes);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar clientes.' });
    }
  }
}

export { ClienteController };