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

    async Criar(nome, biografia, genero, livros) {
        if (!nome || !biografia || !genero || !livros) {
            throw new Error("Favor informar todos os dados!")
        }

        const autor = await RepositoryAutores.Create(nome, biografia, genero, livros)

        return autor
    }

    async Alterar(id, nome, biografia, genero, livros) {
        if (!id || !nome || !biografia || !genero || !livros) {
            throw new Error("Favor informar o ID!")
        }
        
        const autorAlterar = await RepositoryAutores.Update(id, nome, biografia, genero, livros)

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