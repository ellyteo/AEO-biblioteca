import ServiceLivros from '../service/livros.js'

class ControllerLivros {

    async Buscar(_, res) {
        try {
            const livros = await ServiceLivros.Buscar()
            res.send({ message: livros })
        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }
    }

    async Detalhe(req, res) {
        try {
            const id = req.params.id

            const livro = await ServiceLivros.Detalhe(id)

            res.send({ message: livro })
        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }
    }

    async Criar(req, res) {
        try {
            const { nome } = req.body

            await ServiceLivros.Criar(nome)

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
            const { nome } = req.query

            await ServiceLivros.Alterar(id, nome)

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

            await ServiceLivros.Deletar(id)

            res.send({ message: "Deletado!" })
        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }
    }

}
export default new ControllerLivros()