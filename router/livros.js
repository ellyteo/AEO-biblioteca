import express from 'express'
import livros from '../repository/livros.js'

const router = express.Router()

router.get("/", (req, res) => {
    res.send({ livro : livros })
})

router.post("/registrar", (req, res) => {
    const { id, nome } = req.body
    if(!id || !nome) {
        res.send({ message: "Favor informar id e nome do livro" })
        return 
    }
    livros.push({ id, nome })
    console.log(livros)
    
    res.send({ message: "Livro adicionado com sucesso" })
})

router.get("/:id", (req, res) => {
    const id = req.params.id

    const livro = livros.find(it => it.id == id)

    if (!livro) {
        res.send({ message: "Livro não encontrado" })
        return
    }

    res.send({ livro })
})

router.post("/alterar/:id", (req, res) => {
    const id = req.body.id
    const { nome } = req.query
    const livro = livros.find(it => it.id == id)

    if(!livro) {
        res.send({ message: "Favor informar o id" })
        return 
    }
    livro.nome = nome
    res.send({ message: "Livro alterado com sucesso" })
})

router.post("/deletar/:id", (req, res) => {
    const id = req.body.id
    const livro = livros.find(it => it.id == id)
    if(!livro) {
        res.send({ message: "Favor informar id e name" })
        return 
    }
    livros.splice(it => it.id == id, 1)
    res.send({ message: "Livro deletado com sucesso" })
})

export default router