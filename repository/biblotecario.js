import bibliotecario from "../model/bibliotecario.js"

class RepositoryBi{
    async Find() {
        const biblio = await bibliotecario.findAll()

        return biblio
    }

    async FindById(id) {
        const biblioDetalhes = await bibliotecario.findByPk(id)

        return biblioDetalhes
    }

    async Create(nome) {
        const biblioCreate = await bibliotecario.create({ nome })

        return biblioCreate
    }

    async Update(id,nome) {
        const biblioAlterar = await bibliotecario.findByPk(id)

        if(!biblioAlterar) {
            throw new Error("bibliotecario não encontrado")
        }

        biblioAlterar.nome = nome || biblioAlterar.nome
       
        await biblioAlterar.save()
    }

    async Delete(id) {
        const biblioDeletar = await bibliotecario.findByPk(id)

        if(!biblioDeletar){
            throw new Error("bibliotecario não encontrado")
        }

        await biblioDeletar.destroy()

        return biblioDeletar
    }
}

export default new RepositoryBi