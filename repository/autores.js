import autor from '../model/autores.js'

class RepositoryAutores {


    async Find() {
        const autores = await autor.findAll()

        return autores
    }

    async FindById(id) {
        const autorDetalhe = await autor.findByPk(id)

        return autorDetalhe
    }

    async Create(nome) {
        const autorCriar = await autor.create({ nome })

        return autorCriar
    }

    async Update(id, nome) {
        const autorAlterar = await autor.findByPk(id)

        if (!autorAlterar) {
            throw new Error("Usuário não encontrado!")
        }

        autorAlterar.nome = nome

        await autorAlterar.save()
    }

    async Delete(id) {
        const autorDeletar = await autor.findByPk(id)

        if (!autorDeletar) {
            throw new Error("Usuário não encontrado!")
        }

        await autorDeletar.destroy()

        return autorDeletar
    }

    async FindByEmail(email) {
        return autor.findOne({ where: { email } })
    }

}
export default new RepositoryAutores()