import express from 'express'
import ControllerLivros from '../controller/livros.js'
import authMiddleware from '../middleware/auth.js'

const router = express.Router()

router.get("/listar", ControllerLivros.Buscar)
router.get("/detalhe/:id", ControllerLivros.Detalhe)
router.post("/criar",  authMiddleware, ControllerLivros.Criar)
router.put("/alterar/:id",  authMiddleware, ControllerLivros.Alterar)
router.delete("/deletar/:id",  authMiddleware, ControllerLivros.Deletar)

export default router