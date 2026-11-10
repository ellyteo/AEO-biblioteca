import ServiceLivros from '../service/livros.js'

class ControllerLivros {

    async Buscar(_, res) {
        try {
            const livros = await ServiceLivros.Buscar()

            res.status(200).send({ message: livros })
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

            res.status(200).send({ message: livro })
        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }
    }

    async Criar(req, res) {
        try {
            const { nome, idAutor, ano, editora } = req.body

            await ServiceLivros.Criar(nome, idAutor, ano, editora)

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
            const { nome, idAutor, ano, editora } = req.body

            await ServiceLivros.Alterar(id, nome, idAutor, ano, editora)

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

            await ServiceLivros.Deletar(id)

            res.status(200).send({ message: "Deletado com sucesso!" })
        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }
    }

}
export default new ControllerLivros()