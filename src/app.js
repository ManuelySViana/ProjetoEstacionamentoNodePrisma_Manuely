const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swaggerSpecs');

import { usuarioRoute } from './routes/usuarioRoute.js';
import { clienteRoute } from './routes/clienteRoute.js';
import { veiculoRoute } from './routes/veiculoRoute.js';
import { vagaRoute } from './routes/vagaRoute.js';
import { movimentacaoRoute } from './routes/movimentacaoRoute.js';

import { Router } from 'express';

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use('/usuarios', usuarioRoutes);
app.use('/clientes', clienteRoutes);
app.use('/veiculos', veiculoRoutes);
app.use('/vagas', vagaRoutes);
app.use('/movimentacoes', movimentacaoRoutes);

module.exports = app;