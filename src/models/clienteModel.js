import conexao from "../config/db.js";

export const buscarTodosClientes = async () => {
    const [rows] = await conexao.query("SELECT * FROM Cliente");
    return rows;
};

export const buscarClientePorId = async (id) => {
    const [rows] = await conexao.query("SELECT * FROM Cliente WHERE id = ?", [id]);
    return rows[0];
};

export const verificarCpfEmUso = async (cpf, id = null) => {
    const query = id ? "SELECT id FROM Cliente WHERE cpf = ? AND id != ?" : "SELECT id FROM Cliente WHERE cpf = ?";
    const params = id ? [cpf, id] : [cpf];
    const [rows] = await conexao.query(query, params);
    return rows.length > 0;
};

export const criarClienteBanco = async (dados) => {
    const { nome, cpf, telefone, email } = dados;
    const sql = "INSERT INTO Cliente (nome, cpf, telefone, email) VALUES (?, ?, ?, ?)";
    const [result] = await conexao.query(sql, [nome, cpf, telefone, email || null]);
    return { id: result.insertId, ...dados };
};