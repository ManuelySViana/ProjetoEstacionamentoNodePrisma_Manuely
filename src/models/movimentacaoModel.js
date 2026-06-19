import conexao from "../config/db.js";

export const buscarTodasMovimentacoes = async () => {
    const sql = `
        SELECT m.*, v.placa, vg.numero AS vaga_numero, u.name AS usuario_nome
        FROM Movimentacao m
        INNER JOIN Veiculo v ON m.veiculoId = v.id
        INNER JOIN Vaga vg ON m.vagaId = vg.id
        INNER JOIN Usuario u ON m.usuarioId = u.id
    `;
    const [rows] = await conexao.query(sql);
    return rows;
};

export const buscarMovimentacaoPorId = async (id) => {
    const [rows] = await conexao.query("SELECT * FROM Movimentacao WHERE id = ?", [id]);
    return rows[0];
};

export const criarEntradaBanco = async (dados) => {
    const { veiculoId, vagaId, usuarioId, valorHora } = dados;
    const conn = await conexao.getConnection();

    try {
        await conn.beginTransaction();

        //Cria a movimentação
        const sqlMov = "INSERT INTO Movimentacao (valorHora, valorTotal, status, veiculoId, vagaId, usuarioId) VALUES (?, 0, 'Aberto', ?, ?, ?)";
        const [resultMov] = await conn.query(sqlMov, [valorHora, veiculoId, vagaId, usuarioId]);

        //Atualiza a vaga para Ocupada
        await conn.query("UPDATE Vaga SET status = 'Ocupada' WHERE id = ?", [vagaId]);

        await conn.commit();
        return { id: resultMov.insertId, ...dados, status: 'Aberto' };
    } catch (error) {
        await conn.rollback();
        throw error;
    } finally {
        conn.release();
    }
};

export const registrarSaidaBanco = async (id, dataSaida, valorTotal, vagaId) => {
    const conn = await conexao.getConnection();

    try {
        await conn.beginTransaction();

        //Atualiza a movimentação
        const sqlMov = "UPDATE Movimentacao SET dataSaida = ?, valorTotal = ?, status = 'Fechado' WHERE id = ?";
        await conn.query(sqlMov, [dataSaida, valorTotal, id]);

        //Libera a vaga
        await conn.query("UPDATE Vaga SET status = 'Livre' WHERE id = ?", [vagaId]);

        await conn.commit();
        return true;
    } catch (error) {
        await conn.rollback();
        throw error;
    } finally {
        conn.release();
    }
};