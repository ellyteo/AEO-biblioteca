import express from 'express'
import ControllerLivros from '../controller/livros.js'
import authMiddleware from '../middleware/auth.js'

const router = express.Router()

router.get("/listar", authMiddleware, ControllerLivros.Buscar)
router.get("/detalhe/:id", ControllerLivros.Detalhe)
router.post("/criar", ControllerLivros.Criar)
router.put("/alterar/:id", ControllerLivros.Alterar)
router.delete("/deletar/:id", ControllerLivros.Deletar)

export default router