import conexao from "../config/db.js";

export const buscarTodosUsuarios = async () => {
    const [rows] = await conexao.query("SELECT id, name, email, perfil, criadoEm, atualizadoEm FROM Usuario");
    return rows;
};

export const buscarUsuarioPorId = async (id) => {
    const [rows] = await conexao.query("SELECT id, name, email, perfil, criadoEm, atualizadoEm FROM Usuario WHERE id = ?", [id]);
    return rows[0];
};

export const verificarEmailEmUso = async (email, id = null) => {
    const query = id ? "SELECT id FROM Usuario WHERE email = ? AND id != ?" : "SELECT id FROM Usuario WHERE email = ?";
    const params = id ? [email, id] : [email];
    const [rows] = await conexao.query(query, params);
    return rows.length > 0;
};

export const criarUsuarioBanco = async (dados) => {
    const { name, email, senha, perfil } = dados;
    const sql = "INSERT INTO Usuario (name, email, senha, perfil) VALUES (?, ?, ?, ?)";
    const [result] = await conexao.query(sql, [name, email, senha, perfil || "Funcionando"]);
    return { id: result.insertId, ...dados };
};

export const atualizarUsuarioBanco = async (id, dados) => {
    const { name, email, senha, perfil } = dados;
    const sql = "UPDATE Usuario SET name = ?, email = ?, senha = ?, perfil = ? WHERE id = ?";
    return await conexao.query(sql, [name, email, senha, perfil, id]);
};

export const removerUsuarioBanco = async (id) => {
    return await conexao.query("DELETE FROM Usuario WHERE id = ?", [id]);
};