import express from 'express'
import ControllerEmprestimos from '../controller/emprestimos.js'


const router = express.Router()

router.get("/listar", ControllerEmprestimos.Buscar)
router.get("/detalhe/:id", ControllerEmprestimos.Detalhe)
router.post("/criar", ControllerEmprestimos.Criar)
router.put("/alterar/:id", ControllerEmprestimos.Alterar)
router.delete("/deletar/:id", ControllerEmprestimos.Deletar)

export default router