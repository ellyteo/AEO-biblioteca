import ServiceCategorias from '../service/categorias.js'

class ControllerCategorias {

    async Buscar(_, res) {
        try {
            const categorias = await ServiceCategorias.Buscar()

            res.status(200).send({ message: categorias })
        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }
    }

    async Detalhe(req, res) {
        try {
            const id = req.params.id

            const categoria = await ServiceCategorias.Detalhe(id)

            res.status(200).send({ message: categoria })
        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }
    }

    async Criar(req, res) {
        try {
            const { nome, genero, formato, livros } = req.body

            await ServiceCategorias.Criar(nome, genero, formato, livros)

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
            const { nome, genero, formato, livros } = req.body

            await ServiceCategorias.Alterar(id, nome, genero, formato, livros)

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

            await ServiceCategorias.Deletar(id)

            res.status(200).send({ message: "Deletado com sucesso!" })
        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }
    }

}
export default new ControllerCategorias()