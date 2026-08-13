import express from 'express'
import emprestimos from '../repository/emprestimos.js';

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).send({emprestimo : emprestimos});
});

router.post("/registrar", (req, res) => {
    const { id, livro, dataRequisicao, dataDevolucao } = req.body
    if(!id || !livro || !dataRequisicao || !dataDevolucao) {
        res.send({ message: "Favor informar id , o livro , a Data de requisicao , e Data de devolucao do emprestimo" })
        return 
}
    emprestimos.push({ id, livro , dataRequisicao , dataDevolucao  })
    res.send({ message: "Emprestimo adicionado com sucesso" })

})

router.get("/:id", (req, res) => {
    const id = req.params.id
    const emprestimo = emprestimos.find(it => it.id == id)
    if (!emprestimo) {
        res.send({ message: "Emprestimo não encontrado" })
        return
    }
    res.send({ emprestimo })
})
router.post("/alterar/:id", (req, res) => {
    const id = req.params.id
    const { livro ,dataRequisicao , dataDevolucao } = req.body
    const emprestimo = emprestimos.find(it => it.id == id)
    if(!emprestimo) {
        res.send({ message: "Favor informar o id" })
        return 
    }
    emprestimo.livro = livro
    res.send({ message: "Emprestimo alterado com sucesso" })
})
router.post("/deletar/:id", (req, res) => {
    const id = req.body.id
    const emprestimo = emprestimos.find(it => it.id == id)
    if(!emprestimo) {
        res.send({ message: "Favor informar id e name" })
        return 
    }
    emprestimos.splice(it => it.id == id, 1)
    res.send({ message: "Emprestimo deletado com sucesso" })
})
export default router


