import express from 'express'
import ControllerCateforia from '../controller/categorias.js'
import authMiddleware from '../middleware/auth.js'
const router = express.Router()

router.get("/listar", ControllerCateforia.Buscar)
router.get("/detalhe/:id", ControllerCateforia.Detalhe)
router.post("/criar", authMiddleware, ControllerCateforia.Criar)
router.put("/alterar/:id", authMiddleware, ControllerCateforia.Alterar)
router.delete("/deletar/:id", authMiddleware, ControllerCateforia.Deletar)

export default router