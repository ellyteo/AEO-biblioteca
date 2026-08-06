import express from 'express'
import editora from './repository/editora';

const app = express()

app.use(express.json())

app.use('/api/v1/registrar/editora', editora)
app.use('/api/v1/alterar/editora', editora)
app.use('/api/v1/deletar/editora', editora)

app.listen(3000,() => {
    console.log("bah ta funcionando 3000")
});