import express from 'express'
import categorias from '../repository/categorias.js'
 
const router = express.Router()
 
router.get("/", (req, res) => {
    res.send({ categoria: categorias })
})
 
router.post("/registrar", (req, res) => {
    const { id, nome } = req.body
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
 
    if (!categorias) {
        res.send({ message: "Categorias não encontrada" })
        return
    }
 
    res.send({ categoria })
})
 
router.post("/alterar/:id", (req, res) => {
    const id = req.params.id
    const { nome } = req.body
    const categoria = categorias.find(it => it.id == id)
 
    if(!categorias) {
        res.send({ message: "Favor informar a categorias" })
        return
    }
    categorias.nome = nome
    res.send({ message: "Categoria alterado com sucesso" })
})
 
router.post("/deletar/:id", (req, res) => {
    const id = req.body.id
    const categorias = categorias.find(it => it.id == id)
    if(!categorias) {
        res.send({ message: "Favor informar id e name" })
        return
    }
    categorias.splice(it => it.id == id, 1)
    res.send({ message: "Categorias deletado com sucesso" })
})
 
export default router
 