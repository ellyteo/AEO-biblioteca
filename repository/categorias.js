import categorias from '../model/categorias.js'

class RepositoryCategorias {


    async Find() {
        const categoria = await categorias.findAll()

        return categoria
    }

    async FindById(id) {
        const categoriaDetalhe = await categorias.findByPk(id)

        return categoriaDetalhe
    }

    async Create(nome) {
        const categoriaCriar = await categorias.create({ nome })

        return categoriaCriar
    }

    async Update(id, nome) {
        const categoriaAlterar = await categorias.findByPk(id)

        if (!categoriaAlterar) {
            throw new Error("Usuário não encontrado!")
        }

        categoriaAlterar.nome = nome

        await categoriaAlterar.save()
    }

    async Delete(id) {
        const categoriaDeletar = await categorias.findByPk(id)

        if (!categoriaDeletar) {
            throw new Error("Usuário não encontrado!")
        }

        await categoriaDeletar.destroy()

        return categoriaDeletar
    }

    async FindByEmail(email) {
        return categorias.findOne({ where: { email } })
    }

}
export default new RepositoryCategorias()