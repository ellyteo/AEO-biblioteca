import ServiceEdi from "../service/editora";

class Controlleredi {
    async Buscar(_,res) {
        try{
            const editoras = await ServiceEdi.Buscar()
            res.status(200).send({ message: editoras})
        } catch (error) {
            res.status(500).send({ message: error.message })
        }
    }

    async Detalhe(req,res) {
        try {
            const id = req.params.id
            const editoras = await ServiceEdi.Detalhe(id)

            await res.status(200).send({ message: editoras })
        } catch (error) {
            res.status(500).send({ message: error.message })
        }
    }

    async Criar(req,res) {
        try {
            const { nome } = req.body

            await ServiceEdi.Criar(nome)

            res.status(201).send({ message: "cadastro com sucesso" })
        } catch (error) {
            res.status(500).send({ message: error.message })
        }
    }

    async Alterar(req,res) {
        try {
            const { nome } = req.body
            const id = Number(req.params.id)

            await ServiceEdi.Alterar(id,nome)

            res.status(201).send({ message: "alterado com sucesso" })
        } catch (error) {
            res.status(500).send({ message: error.message })
        }
    }

    async Deletar(req,res) {
        try {
            const id = req.params.id

            await ServiceEdi.Deletar(id)

            res.status(204).send({ message: "Deletado" })
        } catch (error) {
            res.status(500).send({ message: error.message })
        }
    }
}

export default new Controlleredi