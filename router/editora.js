import express from "express"
import Controlleredi from "../controller/editora.js"

const router = express.Router()

router.get("/buscar", Controlleredi.Buscar)
router.get("/detalhe/:id", Controlleredi.Detalhe)
router.get("/criar", Controlleredi.Criar)
router.get("/alterar/:id", Controlleredi.Alterar)
router.get("/deletar/:id", Controlleredi.Deletar)