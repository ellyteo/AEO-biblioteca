import ServiceBibliotecario from '../service/bibliotecario.js'

class ControllerBibliotecario {

    async Buscar(_, res) {
        try {
            const bibliotecario = await ServiceBibliotecario.Buscar()

            res.status(200).send({ mensagem: bibliotecario })
        } catch (error) {
            res.status(500).send({
                mensagem: error.message
            })
        }
    }

    async Detalhe(req, res) {
        try {
            const id = req.session.id
            const bibliotecario = await ServiceBibliotecario.Detalhe(id)

            res.status(200).send({ mensagem: bibliotecario })
        } catch (error) {
            res.status(500).send({
                mensagem: error.message
            })
        }
    }

    async Criar(req, res) {
        try {
            const { nome, senha, email } = req.body

            await ServiceBibliotecario.Criar(nome, senha, email)

            res.status(201).send({ mensagem: "Cadastrado com sucesso" })
        } catch (error) {
            res.status(500).send({
                mensagem: error.message
            })
        }
    }

    async Alterar(req, res) {
        try {
            const id = req.session.id
            const { nome, senha, email } = req.body

            await ServiceBibliotecario.Alterar(id, nome, senha, email)

            res.status(201).send({ mensagem: "Cadastrado com sucesso" })
        } catch (error) {
            res.status(500).send({
                mensagem: error.message
            })
        }
    }

    async Deletar(req, res) {
        try {
            const id = req.session.id

            await ServiceBibliotecario.Deletar(id)

            res.status(204).send({ mensagem: "Deletado com sucesso!" })
        } catch (error) {
            res.status(500).send({
                mensagem: error.message
            })
        }
    }

    async Login(req, res) {
        try {
            const { email, senha } = req.body

            const token = await ServiceBibliotecario.Login(email, senha)

            res.status(200).send({
                token
            })
        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }

    }
}

export default new ControllerBibliotecario()