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

    async Create(nome, biografia, genero, livros) {
        const autorCriar = await autor.create({ nome, biografia, genero, livros })

        return autorCriar
    }

    async Update(id, nome, biografia, genero, livros) {
        const autorAlterar = await autor.findByPk(id)

        if (!autorAlterar) {
            throw new Error("Usuário não encontrado!")
        }

        autorAlterar.nome = nome
        autorAlterar.biografia = biografia
        autorAlterar.genero = genero
        autorAlterar.livros = livros

        await autorAlterar.save()
    }

    async Delete(id) {
        const autorDeletar = await autor.findByPk(id)

        if (!autorDeletar) {
            throw new Error("Usuário não encontrado!")
        }

        await autorDeletar.destroy()
    }

}
export default new RepositoryAutores()