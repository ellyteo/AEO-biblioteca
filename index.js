import express from 'express'
import livro from './router/livros.js'

const app = express()
app.use(express.json())

app.use('/api/v1/livro', livro)

app.listen(3000, () => {
    console.log("Servidor escutando na porta 3000")
})