import ServiceBi from '../service/biblio.js'

class ControllerBi {
    // não sei quem vai fazer o usuario
    async Buscar(_, res) {
        try {
            const editoras = await ServiceBi.Buscar()
            res.status(200).send({ mensagem: editoras })
        } catch (error) {
            res.status(500).send({
                mensagem: error.message
            })
        }
    }

    async Detalhe(req, res) {
        try {
            const id = req.params.id

            const agendas = await ServiceBi.Detalhe(id)

            res.status(200).send({ mensagem: agendas })
        } catch (error) {
            res.status(500).send({
                mensagem: error.message
            })
        }
    }

    async Criar(req, res) {
        try {
            const { nome } = req.body

            await ServiceEdi.Criar(nome)
            
            res.status(201).send({ mensagem: "Cadastrado com sucesso" })
        } catch (error) {
            res.status(500).send({
                mensagem: error.message
            })
        }
    }

    async Alterar(req, res) {
        try {
            const { nome } = req.body
            const id = req.params.id

            await ServiceEdi.Alterar(id, nome)
            
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

            await ServiceEdi.Deletar(identificador)

            res.status(204).send({ mensagem: "Deletado" })
        } catch (error) {
            res.status(500).send({
                mensagem: error.message
            })
        }
    }
}

export default new ControllerCarro()