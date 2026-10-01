import ServiceEmprestimos from '../service/emprestimos.js'

class ControllerEmprestimos {

    async Buscar(_, res) {
        try {
            const emprestimos = await ServiceEmprestimos.Buscar()
            res.send({ message: emprestimos })
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

            res.send({ message: emprestimo })
        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }
    }

    async Criar(req, res) {
        try {
            const { livro, autor, datareq, datadev } = req.body

            await ServiceEmprestimos.Criar(livro, autor, datareq, datadev)

            res.send({ message: "Criado com sucesso!" })
        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }
    }

    async Alterar(req, res) {
        try {
            const id = req.params.id
            const { livro, autor, datareq, datadev } = req.query

            await ServiceEmprestimos.Alterar(id, livro, autor, datareq, datadev)

            res.send({ message: "Alterado com sucesso!" })
        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }
    }

    async Deletar(req, res) {
        try {
            const id = req.params.id

            await ServiceEmprestimos.Deletar(id)

            res.send({ message: "Deletado!" })
        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }
    }

}
export default new ControllerEmprestimos()