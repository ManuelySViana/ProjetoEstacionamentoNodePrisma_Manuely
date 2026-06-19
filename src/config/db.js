import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const conexao = mysql.createPool(process.env.DATABASE_URL);

export default conexao;