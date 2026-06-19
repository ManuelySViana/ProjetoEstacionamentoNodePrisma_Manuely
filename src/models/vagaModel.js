import conexao from "../config/db.js";

export const buscarTodasVagas = async () => {
    const [rows] = await conexao.query("SELECT * FROM Vaga");
    return rows;
};

export const buscarVagaPorId = async (id) => {
    const [rows] = await conexao.query("SELECT * FROM Vaga WHERE id = ?", [id]);
    return rows[0];
};

export const verificarNumeroVagaEmUso = async (numero) => {
    const [rows] = await conexao.query("SELECT id FROM Vaga WHERE numero = ?", [numero]);
    return rows.length > 0;
};

export const criarVagaBanco = async (dados) => {
    const { numero, setor, tipo } = dados;
    const sql = "INSERT INTO Vaga (numero, setor, tipo) VALUES (?, ?, ?)";
    const [result] = await conexao.query(sql, [numero, setor, tipo]);
    return { id: result.insertId, ...dados };
};

export const atualizarStatusVaga = async (id, status, connectionClient = conexao) => {
    return await connectionClient.query("UPDATE Vaga SET status = ? WHERE id = ?", [status, id]);
};