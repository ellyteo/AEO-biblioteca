import biliotecario from "../model/bibliotecario.js"

class RepositoryBiblio {

    async Find() {
        const biblioS = await biliotecario.findAll()

        return biblioS
    }

    async FindById(id) {
        const biblioDetalhes = await biliotecario.findByPk(id)

        return biblioDetalhes
    }

    async FindByNome(nome) {
        return biblio.findOne({ where: { nome } })
    }

    async Create(nome) {
        const biblioCreate = await biliotecario.create({ nome })

        return biblioCreate
    }

    async Update(id, nome) {
        const biblioAlterar = await biliotecario.findByPk(id)

        if (!biblioAlterar) {
            throw new Error("Bibliotecario não encontrado")
        }

        biblioAlterar.nome = nome || biblioAlterar.nome

        await biblioAlterar.save()
    }

    async Delete(id) {
        const biblioDeletar = await biliotecario.findByPk(id)

        if (!biblioDeletar) {
            throw new Error("Bibliotecario não encontrado")
        }

        await biblioDeletar.destroy()

        return biblioDeletar
    }

    async FindByEmail(email) {
        return livro.findOne({ where: { email } })
    }

}

export default new RepositoryBiblio()