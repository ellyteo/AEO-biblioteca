import RepositoryAutores from '../repository/autores.js'

class ServiceAutores {

    async Buscar() {
        return RepositoryAutores.Find()
    }

    async Detalhe(id) {
        if (!id) {
            throw new Error("Favor informar o ID!")
        }

        const autor = await RepositoryAutores.FindById(id)

        if (!autor) {
            throw new Error(`ID ${id} do autor não encontrado!`)
        }

        return autor
    }

    async Criar(nome, idLivro) {
        if (!nome || !idLivro) {
            throw new Error("Favor informar todos os dados!")
        }

        const autor = await RepositoryAutores.Create(nome, idLivro)

        return autor
    }

    async Alterar(id, nome, idLivro) {
        if (!id || !nome || !idLivro) {
            throw new Error("Favor informar o ID!")
        }
        
        const autorAlterar = await RepositoryAutores.Update(id, nome, idLivro)

        return autorAlterar
    }

    async Deletar(id) {
        if (!id) {
            throw new Error("Favor informar o ID!")
        }

        const autor = await RepositoryAutores.Delete(id)

        return autor
    }

}
export default new ServiceAutores()