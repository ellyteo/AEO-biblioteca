import express from 'express'
import ControllerAutores from '../controller/autores.js'

const router = express.Router()

router.get("/listar", ControllerAutores.Buscar)
router.get("/detalhe/:id", ControllerAutores.Detalhe)
router.post("/criar", ControllerAutores.Criar)
router.put("/alterar/:id", ControllerAutores.Alterar)
router.delete("/deletar/:id", ControllerAutores.Deletar)

export default router