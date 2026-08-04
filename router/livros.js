import express from 'express'
import livros from '../repository/livros.js'

const router = express.Router()

router.get("/api/v1/livros", (req, res) => {
    res.send({ livro : livros})
})

router.get("/api/v1/livros/:id", (req, res) => {
    const
})