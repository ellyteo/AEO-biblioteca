import express from 'express'
import editoras from '../repository/editora.js'


const router = express.Router()

router.get("/buscar", (req, res) => {
    res.send({ message : editoras })
})

router.post("/registrar", (req, res) => {
    const { id, nome } = req.body
    if(!id || !nome) {
        res.send({ message: "Favor informar id e nome da editora" })
        return 
    }
    editoras.push({ id, nome })
    console.log(editora)
    
    res.send({ message: "Editora adicionada com sucesso" })
})

router.get("/:id", (req, res) => {
    const id = req.params.id

    const editora = editoras.find(it => it.id == id)

    if (!id) {
        res.send({ message: "Editora não encontrada" })
        return
    }

    res.send({ message: editora })
})

router.post("/alterar/:id", (req, res) => {
    const id = req.body.id
    const { nome } = req.query
    const editora = editoras.find(it => it.id == id)

    if(!editora) {
        res.send({ message: "Favor informar o id" })
        return 
    }
    editora.nome = nome
    res.send({ message: "Editora alterada com sucesso" })
})

router.post("/deletar/:id", (req, res) => {
    const id = req.body.id
    const editora = editoras.find(it => it.id == id)
    if(!editoras) {
        res.send({ message: "Favor informar id e name" })
        return 
    }
    editora.splice(it => it.id == id, 1)
    res.send({ message: "Editora deletada com sucesso" })
})

export default router