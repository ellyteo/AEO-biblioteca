import RepositoryCategorias from '../repository/categorias.js'

class ServiceCategorias {

    async Buscar() {
        return RepositoryCategorias.Find()
    }

    async Detalhe(id) {
        if (!id) {
            throw new Error("Favor informar o ID!")
        }

        const categoria = await RepositoryCategorias.FindById(id)

        if (!categoria) {
            throw new Error(`ID ${id} do categoria não encontrado!`)
        }

        return categoria
    }

    async Criar(nome, genero, formato, livros) {
        if (!nome || !genero || !formato || !livros) {
            throw new Error("Favor informar todos os dados!")
        }

        const categoria = await RepositoryCategorias.Create(nome, genero, formato, livros)

        return categoria
    }

    async Alterar(id, nome, genero, formato, livros) {
        if (!id || !nome || !genero || !formato || !livros) {
            throw new Error("Favor informar o ID!")
        }
        
        const categoriaAlterar = await RepositoryCategorias.Update(id, nome, genero, formato, livros)

        return categoriaAlterar
    }

    async Deletar(id) {
        if (!id) {
            throw new Error("Favor informar o ID!")
        }

        const categoria = await RepositoryCategorias.Delete(id)

        return categoria
    }

}
export default new ServiceCategorias()