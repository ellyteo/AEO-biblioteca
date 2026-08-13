import express from 'express'
import editoras from './router/editora.js';
import autores from './router/autores.js';
import categorias from './router/categorias.js';
import emprestimos from './router/emprestimos.js';
import livros from './router/livros.js';

const app = express()

app.use(express.json())

app.use('/api/v1/editoras', editoras)
app.use('/api/v1/autores', autores)
app.use('/api/v1/categorias', categorias)
app.use('/api/v1/emprestimos', emprestimos)
app.use('/api/v1/livros', livros)

app.listen(3000,() => {
    console.log("funcionando na porta 3000")
});
