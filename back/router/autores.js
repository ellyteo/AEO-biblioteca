import express from 'express'
import ControllerAutores from '../controller/autores.js'
import authMiddleware from "../middleware/auth.js"

const router = express.Router()

router.get("/listar", ControllerAutores.Buscar)
router.get("/detalhe/:id", ControllerAutores.Detalhe)
router.post("/criar", authMiddleware, ControllerAutores.Criar)
router.put("/alterar/:id", authMiddleware, ControllerAutores.Alterar)
router.delete("/deletar/:id", authMiddleware, ControllerAutores.Deletar)

export default router