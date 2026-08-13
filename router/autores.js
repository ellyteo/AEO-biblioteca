import express from 'express'
import autores from '../repository/autores.js'


const router = express.Router();

router.get("/", (req, res) => {
    res.send({ autor : autores })
})

router.post("/registrar", (req, res) => {
    const { id, nome } = req.body
    if(!id || !nome) {
        res.send({ message: "Favor informar id e nome do autor" })
        return 
    }
    autores.push({ id, nome })
    console.log(autores)
    
    res.send({ message: "autor adicionado com sucesso" })
})

router.get("/:id", (req, res) => {
    const id = req.params.id

    const autor = autores.find(it => it.id == id)

    if (!autor) {
        res.send({ message: "autor não encontrado" })
        return
    }

    res.send({ autor })
})

router.post("/alterar/:id", (req, res) => {
    const id = req.params.id
    const { nome } = req.body
    const autor = autores.find(it => it.id == id)

    if(!autor) {
        res.send({ message: "Favor informar o id" })
        return 
    }
    autor.nome = nome
    res.send({ message: "autor alterado com sucesso" })
})

router.post("/deletar/:id", (req, res) => {
    const id = req.body.id
    const autor = autores.find(it => it.id == id)
    if(!autor) {
        res.send({ message: "Favor informar id e name" })
        return 
    }
    autores.splice(it => it.id == id, 1)
    res.send({ message: "autor deletado com sucesso" })
})

export default router