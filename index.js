import express from 'express'
import livro from './router-Livros/livros.js'
import emprestimo from './router-Livros/emprestimos.js'

import categoria from './router-Livros/categorias.js'

const app = express()
app.use(express.json())

app.use('/api/v1/livro', livro)
app.use('/api/v1/emprestimo',emprestimo)
app.use('/api/v1/categoria', categoria )

app.listen(3000, () => {
    console.log("Servidor escutando na porta 3000")
})