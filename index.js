import express from 'express';
import emprestimos from './router/emprestimos.js';

const app = express();
app.use(express.json());
app.use('/api/v1/emprestimos', emprestimos);
app.listen (3000, () => {
    console.log('Servidor rodando na porta 3000');
})
