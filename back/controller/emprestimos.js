import ServiceEmprestimos from '../service/emprestimos.js'

class ControllerEmprestimos {

    async Buscar(_, res) {
        try {
            const emprestimos = await ServiceEmprestimos.Buscar()

            res.status(200).send({ message: emprestimos })
        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }
    }

    async Detalhe(req, res) {
        try {
            const id = req.params.id
            const emprestimo = await ServiceEmprestimos.Detalhe(id)

            res.status(200).send({ message: emprestimo })
        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }
    }

    async Criar(req, res) {
        try {
            const { idLivro, idAutor, requerimento, devolucao } = req.body

            await ServiceEmprestimos.Criar(idLivro, idAutor, requerimento, devolucao)

            res.status(200).send({ message: "Criado com sucesso!" })
        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }
    }

    async Alterar(req, res) {
        try {
            const id = req.session.id
            const { idLivro, idAutor, requerimento, devolucao } = req.body

            await ServiceEmprestimos.Alterar(id, idLivro, idAutor, requerimento, devolucao)

            res.status(200).send({ message: "Alterado com sucesso!" })
        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }
    }

    async Deletar(req, res) {
        try {
            const id = req.session.id

            await ServiceEmprestimos.Deletar(id)

            res.status(200).send({ message: "Deletado com sucesso!" })
        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }
    }

}
export default new ControllerEmprestimos()