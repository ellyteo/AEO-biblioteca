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

    async Create(nome, autor, ano, editora ) {
        const livroCriar = await livro.create({ nome, autor, ano, editora })

        return livroCriar
    }

    async Update(id, nome, autor, ano, editora) {
        const livroAlterar = await livro.findByPk(id)

        if (!livroAlterar) {
            throw new Error("Usuário não encontrado!")
        }

        livroAlterar.nome = nome
        livroAlterar.autor = autor
        livroAlterar.ano = ano
        livroAlterar.editora = editora

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