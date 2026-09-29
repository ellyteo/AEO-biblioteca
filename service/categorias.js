import RepositoryCategorias from '../repository/categorias.js'

const segredo = 'S3gred0'

class ServiceCategorias {

    async Buscar() {
        return RepositoryCategorias.Find()
    }

    async Detalhe(id) {
        if (!id) {
            throw new Error("Favpr informar o ID!")
        }

        const categoria = await RepositoryCategorias.FindById(id)

        if (!categoria) {
            throw new Error(`ID ${id} do categoria não encontrado!`)
        }

        return categoria
    }

    async Criar(nome) {
        if (!nome) {
            throw new Error("Favor informar todos os dados!")
        }

        const categoria = await RepositoryCategorias.Create(nome)

        return categoria
    }

    async Alterar(id, nome) {
        if (!id || !nome) {
            throw new Error("Favor informar o ID!")
        }
        
        const categoriaAlterar = await RepositoryCategorias.Update(id, nome)

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