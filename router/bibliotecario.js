import express from "express"
import ControllerBiblio from "../controller/bibliotecario.js"
const router = express.Router()

router.get("/buscar", ControllerBiblio.Buscar)
router.get("/detalhe/:id", ControllerBiblio.Detalhe)
router.post("/criar", ControllerBiblio.Criar)
router.put("/alterar/:id", ControllerBiblio.Alterar)
router.delete("/deletar/:id", ControllerBiblio.Deletar)
router.post("/login", ControllerBiblio.Login)

export default router