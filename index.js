import express from 'express'
import categorias from './router/categorias.js'

const app = express()
app.use( express.json())
app.use('/api/v1/categorias', categorias)

app.listen(3000, () =>{
    console.log("Servidor escutando na porta 3000")
})







