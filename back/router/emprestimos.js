import express from 'express'
import ControllerEmprestimos from '../controller/emprestimos.js'
import authMiddleware from '../middleware/auth.js'

const router = express.Router()

router.get("/listar", ControllerEmprestimos.Buscar)
router.get("/detalhe/:id", ControllerEmprestimos.Detalhe)
router.post("/criar", authMiddleware, ControllerEmprestimos.Criar)
router.put("/alterar/:id", authMiddleware, ControllerEmprestimos.Alterar)
router.delete("/deletar/:id", authMiddleware, ControllerEmprestimos.Deletar)

export default router