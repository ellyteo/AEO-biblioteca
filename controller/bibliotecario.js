import Servicebiblio from '../service/bibliotecario.js'

class ControllerBiblio {
    
    async Buscar(_, res) {
        try {
            const bibliotecario = await Servicebiblio.Buscar()
            res.status(200).send({ mensagem: bibliotecario })
        } catch (error) {
            res.status(500).send({
                mensagem: error.message
            })
        }
    }

    async Detalhe(req, res) {
        try {
            const id = req.params.id

            const biblio = await Servicebiblio.Detalhe(id)

            res.status(200).send({ mensagem: biblio })
        } catch (error) {
            res.status(500).send({
                mensagem: error.message
            })
        }
    }

    async Criar(req, res) {
        try {
            const { nome } = req.body

            await Servicebiblio.Criar(nome)
            
            res.status(201).send({ mensagem: "Cadastrado com sucesso" })
        } catch (error) {
            res.status(500).send({
                mensagem: error.message
            })
        }
    }

    async Login(req, res) {
        try {
            const { id, nome } = req.body
            const token = await Servicebiblio.Login(id, nome)
            
            res.status(200).send({ token })
        } catch (error) {
            res.status(500).send({ message: error.message })
        }
    }

    async Alterar(req, res) {
        try {
            const { nome } = req.body
            const id = req.params.id

            await Servicebiblio.Alterar(id, nome)
            
            res.status(201).send({ mensagem: "Cadastrado com sucesso" })
        } catch (error) {
            res.status(500).send({
                mensagem: error.message
            })
        }
    }

    async Deletar(req, res) {
        try {
            const identificador = req.params.id

            await Servicebiblio.Deletar(identificador)

            res.status(204).send({ mensagem: "Deletado" })
        } catch (error) {
            res.status(500).send({
                mensagem: error.message
            })
        }
    }
}

export default new ControllerBiblio()