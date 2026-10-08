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

    async Create(nome, idAutor, ano, editora ) {
        const livroCriar = await livro.create({ nome, idAutor, ano, editora })

        return livroCriar
    }

    async Update(id, nome, idAutor, ano, editora) {
        const livroAlterar = await livro.findByPk(id)

        if (!livroAlterar) {
            throw new Error("Usuário não encontrado!")
        }

        livroAlterar.nome = nome
        livroAlterar.idAutor = idAutor
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

}
export default new RepositoryLivro()