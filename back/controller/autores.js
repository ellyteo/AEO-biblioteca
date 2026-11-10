import ServiceAutores from '../service/autores.js'

class ControllerAutores {

    async Buscar(_, res) {
        try {
            const autores = await ServiceAutores.Buscar()
            res.status(200).send({ message: autores })
        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }
    }

    async Detalhe(req, res) {
        try {
            const id = req.params.id

            const autor = await ServiceAutores.Detalhe(id)

            res.status(200).send({ message: autor })
        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }
    }

    async Criar(req, res) {
        try {
            const { nome, biografia, genero, livros } = req.body

            await ServiceAutores.Criar(nome, biografia, genero, livros)

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
            const { nome, biografia, genero, livros } = req.body

            await ServiceAutores.Alterar(id, nome, biografia, genero, livros)

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

            await ServiceAutores.Deletar(id)

            res.status(200).send({ message: "Deletado!" })
        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }
    }

}
export default new ControllerAutores()