import conexao from "../config/db.js";

export const buscarTodosVeiculos = async () => {
    const sql = `
        SELECT v.*, c.nome AS cliente_nome 
        FROM Veiculo v
        INNER JOIN Cliente c ON v.clienteId = c.id
    `;
    const [rows] = await conexao.query(sql);
    return rows;
};

export const verificarPlacaEmUso = async (placa) => {
    const [rows] = await conexao.query("SELECT id FROM Veiculo WHERE placa = ?", [placa]);
    return rows.length > 0;
};

export const criarVeiculoBanco = async (dados) => {
    const { placa, modelo, marca, cor, tipo, clienteId } = dados;
    const sql = "INSERT INTO Veiculo (placa, modelo, marca, cor, tipo, clienteId) VALUES (?, ?, ?, ?, ?, ?)";
    const [result] = await conexao.query(sql, [placa, modelo, marca, cor, tipo, clienteId]);
    return { id: result.insertId, ...dados };
};