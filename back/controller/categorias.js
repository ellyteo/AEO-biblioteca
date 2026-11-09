import ServiceCategorias from '../service/categorias.js'

class ControllerCategorias {

    async Buscar(_, res) {
        try {
            const categorias = await ServiceCategorias.Buscar()
            res.send({ message: categorias })
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

            res.send({ message: categoria })
        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }
    }

    async Criar(req, res) {
        try {
            const { nome } = req.body

            await ServiceCategorias.Criar(nome)

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

            await ServiceCategorias.Alterar(id, nome)

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

            await ServiceCategorias.Deletar(id)

            res.send({ message: "Deletado!" })
        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }
    }

}
export default new ControllerCategorias()