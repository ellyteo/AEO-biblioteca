import express from 'express'
import editora from './repository/editora.js'

const router = express.Router()

router.get("/api/editoras", (req, res) => {
    res.send({ pessoas: editora })
})

router.get("/api/editoras/:id", (req, res) => {
    const id = req.params.id
    const editoras = editora.find(it => it.id == id)
    if (!editoras) {
        res.send({ message: "Editora não encontrada" })
        return
    }
    res.send({ editoras })
})

router.get("/api/editoras2", (req, res) => {
    const { id, nome } = req.query
    if(!id || !nome) {
        res.send({ message: "Favor informar id e nome da editora" })
        return 
    }
    editora.push({ id, nome })
    res.send({ message: "Editora adicionada com sucesso" })
})

router.get("/api/alterarEditora/:id", (req, res) => {
    const id = req.params.id
    const { nome } = req.query
    const editoras = editora.find(it => it.id == id)
    if(!editoras) {
        res.send({ message: "Favor informar id" })
        return 
    }
    editora.nome = nome
    res.send({ message: "Editora alterada com sucesso" })
})

export default router