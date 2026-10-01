import RepositoryLivros from '../repository/livros.js'

const segredo = 'S3gred0'

class ServiceLivros {

    async Buscar() {
        return RepositoryLivros.Find()
    }

    async Detalhe(id) {
        if (!id) {
            throw new Error("Favpr informar o ID!")
        }

        const livro = await RepositoryLivros.FindById(id)

        if (!livro) {
            throw new Error(`ID ${id} do livro não encontrado!`)
        }

        return livro
    }

    async Criar(nome, autor, ano, editora) {
        if (!nome || !autor || !ano || !editora) {
            throw new Error("Favor informar todos os dados!")
        }

        const livro = await RepositoryLivros.Create(nome, autor, ano, editora)

        return livro
    }

    async Alterar(id, nome, autor, ano, editora) {
        if (!id || !nome || !autor || !ano || !editora) {
            throw new Error("Favor informar o ID!")
        }
        
        const livroAlterar = await RepositoryLivros.Update(id, nome, autor, ano, editora)

        return livroAlterar
    }

    async Deletar(id) {
        if (!id) {
            throw new Error("Favor informar o ID!")
        }

        const livro = await RepositoryLivros.Delete(id)

        return livro
    }

}
export default new ServiceLivros()