import express from 'express'
import ControllerClientes from '../controller/categorias.js'

const router = express.Router()

router.get("/listar", ControllerClientes.Buscar)
router.get("/detalhe/:id", ControllerClientes.Detalhe)
router.post("/criar", ControllerClientes.Criar)
router.put("/alterar/:id", ControllerClientes.Alterar)
router.delete("/deletar/:id", ControllerClientes.Deletar)

export default router