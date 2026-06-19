import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from './config/swaggerSpecs.js';

import { usuarioRoutes } from './routes/usuarioRoute.js';
import { clienteRoutes } from './routes/clienteRoute.js'; 
import { veiculoRoutes } from './routes/veiculoRoute.js';
import { vagaRoutes } from './routes/vagaRoute.js';
import { movimentacaoRoutes } from './routes/movimentacaoRoute.js';

const app = express();

app.use(express.json());

// Rota do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Uso das rotas ajustado para as variáveis que importamos acima
app.use('/usuarios', usuarioRoute);
app.use('/clientes', clienteRoute);
app.use('/veiculos', veiculoRoute);
app.use('/vagas', vagaRoute);
app.use('/movimentacoes', movimentacaoRoute);

// Exportação corrigida para ES Modules (Substituindo o antigo module.exports)
export default app;