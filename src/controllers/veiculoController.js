const { prisma } = require('../config/prisma');

class VeiculoController {
  async criar(req, res) {
    try {
      const { placa, modelo, marca, cor, tipo, clienteId } = req.body;

      const veiculoExiste = await prisma.veiculo.findUnique({ where: { placa } });
      if (veiculoExiste) return res.status(400).json({ error: 'Placa já cadastrada.' });

      const veiculo = await prisma.veiculo.create({
        data: { placa, modelo, marca, cor, tipo, clienteId }
      });

      return res.status(201).json(veiculo);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao cadastrar veículo.' });
    }
  }

  async listar(req, res) {
    try {
      const veiculos = await prisma.veiculo.findMany({ include: { cliente: true } });
      return res.json(veiculos);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar veículos.' });
    }
  }
}

export { VeiculoController };