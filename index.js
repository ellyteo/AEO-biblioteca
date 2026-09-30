import express from 'express'
import database from './config/database.js'
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

database.db
    .sync({ force: false })
    .then((_) => {
        app.listen(3000, () => {
            console.log("Servidor ouvindo na porta 3000")
        })
    })
    .catch((e) => {
        console.log(e)
    })
