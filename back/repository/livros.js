import Livro from '../model/livros.js'

class RepositoryLivro {


    async Find() {
        const livros = await Livro.findAll()

        return livros
    }

    async FindById(id) {
        const livroDetalhe = await Livro.findByPk(id)

        return livroDetalhe
    }

    async Create(nome, idAutor, ano, editora ) {
        const livroCriar = await Livro.create({ nome, idAutor, ano, editora })

        return livroCriar
    }

    async Update(id, nome, idAutor, ano, editora) {
        const livroAlterar = await Livro.findByPk(id)

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
        const livroDeletar = await Livro.findByPk(id)

        if (!livroDeletar) {
            throw new Error("Usuário não encontrado!")
        }

        await livroDeletar.destroy()

        return livroDeletar
    }

}
export default new RepositoryLivro()