const { prisma } = require('../config/prisma');

class MovimentacaoController {
  async registrarEntrada(req, res) {
    try {
      const { veiculoId, vagaId, usuarioId, valorHora } = req.body;

      const vaga = await prisma.vaga.findUnique({ where: { id: vagaId } });
      if (!vaga || vaga.status !== 'Livre') {
        return res.status(400).json({ error: 'Vaga não disponível ou inexistente.' });
      }

      const resultado = await prisma.$transaction(async (tx) => {
        const movimentacao = await tx.movimentacao.create({
          data: { veiculoId, vagaId, usuarioId, valorHora, valorTotal: 0, status: 'Aberto' }
        });

        await tx.vaga.update({
          where: { id: vagaId },
          data: { status: 'Ocupada' }
        });

        return movimentacao;
      });

      return res.status(201).json(resultado);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao registrar entrada.' });
    }
  }

  async registrarSaida(req, res) {
    try {
      const { movimentacaoId } = req.params;

      const movimentacao = await prisma.movimentacao.findUnique({
        where: { id: Number(movimentacaoId) }
      });

      if (!movimentacao || movimentacao.status !== 'Aberto') {
        return res.status(400).json({ error: 'Movimentação inválida ou encerrada.' });
      }

      const dataSaida = new Date();
      const dataEntrada = new Date(movimentacao.dataEntrada);
      const diferencaMs = dataSaida.getTime() - dataEntrada.getTime();
      const horasIdas = Math.ceil(diferencaMs / (1000 * 60 * 60)) || 1;

      const valorTotal = horasIdas * Number(movimentacao.valorHora);

      const resultado = await prisma.$transaction(async (tx) => {
        const movimentacaoAtualizada = await tx.movimentacao.update({
          where: { id: Number(movimentacaoId) },
          data: { dataSaida, valorTotal, status: 'Fechado' }
        });

        await tx.vaga.update({
          where: { id: movimentacao.vagaId },
          data: { status: 'Livre' }
        });

        return movimentacaoAtualizada;
      });

      return res.json({ message: 'Saída registrada!', permanenciaHoras: horasIdas, detalhes: resultado });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao registrar saída.' });
    }
  }

  async listar(req, res) {
    try {
      const movimentacoes = await prisma.movimentacao.findMany({
        include: { veiculo: true, vaga: true, usuario: true }
      });
      return res.json(movimentacoes);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar movimentações.' });
    }
  }
}

export { MovimentacaoController };