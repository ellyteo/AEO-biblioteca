import livro from '../model/livros.js'

class RepositoryLivro {


    async Find() {
        const livros = await livro.findAll()

        return livros
    }

    async FindById(id) {
        const livroDetalhe = await livro.findByPk(id)

        return livroDetalhe
    }

    async Create(nome) {
        const livroCriar = await livro.create({ nome })

        return livroCriar
    }

    async Update(id, nome) {
        const livroAlterar = await livro.findByPk(id)

        if (!livroAlterar) {
            throw new Error("Usuário não encontrado!")
        }

        livroAlterar.nome = nome

        await livroAlterar.save()
    }

    async Delete(id) {
        const livroDeletar = await livro.findByPk(id)

        if (!livroDeletar) {
            throw new Error("Usuário não encontrado!")
        }

        await livroDeletar.destroy()

        return livroDeletar
    }

    async FindByEmail(email) {
        return livro.findOne({ where: { email } })
    }

}
export default new RepositoryLivro()