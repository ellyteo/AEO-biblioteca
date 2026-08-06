import express from 'express'
import categorias from '../repository/categorias.js'

const router = express.Router()

router.get("/", (req, res) => {
    res.send({ categoria: categorias })
})

router.get("/registrar", (req, res) => {
    const { id, nome } = req.query
    if(!id || !nome) {
        res.send({ message: "Favor informar categorias e nome do livro" })
        return 
    }
    categorias.push({ id, nome })
    console.log(categorias)
    
    res.send({ message: "Categorias adicionado com sucesso" })
})

router.get("/:id", (req, res) => {
    const id = req.params.id

    const categoria = categorias.find(it => it.id == id)

    if (!categoria) {
        res.send({ message: "Categoria não encontrada" })
        return
    }

    res.send({ categoria })
})

router.get("/alterar/:id", (req, res) => {
    const id = req.params.id
    const { nome } = req.query
    const categoria = categorias.find(it => it.id == id)

    if(!categoria) {
        res.send({ message: "Favor informar a categoria" })
        return 
    }
    categoria.nome = nome
    res.send({ message: "Categoria alterado com sucesso" })
})

router.get("/deletar/:id", (req, res) => {
    const id = req.params.id
    const categoria = categorias.find(it => it.id == id)
    if(!categoria) {
        res.send({ message: "Favor informar id e name" })
        return 
    }
    categorias.splice(it => it.id == id, 1)
    res.send({ message: "Categoria deletado com sucesso" })
})

export default router