import express from 'express'
import ControllerBibliotecario from '../controller/bibliotecario.js'
import authMiddleware from '../middleware/auth.js'

const router = express.Router()

router.get("/listar", ControllerBibliotecario.Buscar)
router.get("/detalhe/:id", ControllerBibliotecario.Detalhe)
router.post("/criar", ControllerBibliotecario.Criar)
router.put("/alterar/:id", authMiddleware, ControllerBibliotecario.Alterar)
router.delete("/deletar/:id", authMiddleware, ControllerBibliotecario.Deletar)
router.post("/login", ControllerBibliotecario.Login)

export default router