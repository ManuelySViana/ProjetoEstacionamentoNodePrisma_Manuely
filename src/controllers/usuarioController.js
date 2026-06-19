const { prisma } = require('../config/prisma.js');

class UsuarioController {
  async criar(req, res) {
    try {
      const { name, email, senha, perfil } = req.body;

      const usuarioExiste = await prisma.usuario.findUnique({ where: { email } });
      if (usuarioExiste) return res.status(400).json({ error: 'E-mail já cadastrado.' });

      const usuario = await prisma.usuario.create({
        data: { name, email, senha, perfil }
      });

      return res.status(201).json(usuario);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar usuário.' });
    }
  }

  async listar(req, res) {
    try {
      const usuarios = await prisma.usuario.findMany();
      return res.json(usuarios);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar usuários.' });
    }
  }

  async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const usuario = await prisma.usuario.findUnique({ where: { id: Number(id) } });
      
      if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado.' });
      return res.json(usuario);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar usuário.' });
    }
  }

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { name, email, senha, perfil } = req.body;

      const usuario = await prisma.usuario.update({
        where: { id: Number(id) },
        data: { name, email, senha, perfil }
      });

      return res.json(usuario);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar usuário.' });
    }
  }

  async deletar(req, res) {
    try {
      const { id } = req.params;
      await prisma.usuario.delete({ where: { id: Number(id) } });
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao deletar usuário.' });
    }
  }
}

export { UsuarioController };