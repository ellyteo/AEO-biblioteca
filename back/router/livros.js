import express from 'express'
import ControllerLivros from '../controller/livros.js'

const router = express.Router()

router.get("/listar", ControllerLivros.Buscar)
router.get("/detalhe/:id", ControllerLivros.Detalhe)
router.post("/criar", ControllerLivros.Criar)
router.put("/alterar/:id", ControllerLivros.Alterar)
router.delete("/deletar/:id", ControllerLivros.Deletar)

export default router