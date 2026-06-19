const { prisma } = require('../config/prisma');

class VagaController {
  async criar(req, res) {
    try {
      const { numero, setor, tipo } = req.body;

      const vagaExiste = await prisma.vaga.findUnique({ where: { numero } });
      if (vagaExiste) return res.status(400).json({ error: 'Vaga já cadastrada.' });

      const vaga = await prisma.vaga.create({
        data: { numero, setor, tipo }
      });

      return res.status(201).json(vaga);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar vaga.' });
    }
  }

  async listar(req, res) {
    try {
      const vagas = await prisma.vaga.findMany();
      return res.json(vagas);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar vagas.' });
    }
  }
}

export { VagaController };