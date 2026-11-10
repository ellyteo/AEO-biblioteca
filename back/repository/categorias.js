import Categorias from '../model/categorias.js'

class RepositoryCategorias {


    async Find() {
        const categoria = await Categorias.findAll()

        return categoria
    }

    async FindById(id) {
        const categoriaDetalhe = await Categorias.findByPk(id)

        return categoriaDetalhe
    }

    async Create(nome, genero, formato, livros) {
        const categoriaCriar = await Categorias.create({ nome, genero, formato, livros })

        return categoriaCriar
    }

    async Update(id, nome, genero, formato, livros) {
        const categoriaAlterar = await Categorias.findByPk(id)

        if (!categoriaAlterar) {
            throw new Error("Categoria não encontrada!")
        }

        categoriaAlterar.nome = nome
        categoriaAlterar.genero = genero
        categoriaAlterar.formato = formato
        categoriaAlterar.livros = livros

        await categoriaAlterar.save()
    }

    async Delete(id) {
        const categoriaDeletar = await Categorias.findByPk(id)

        if (!categoriaDeletar) {
            throw new Error("Categoria não encontrada!")
        }

        await categoriaDeletar.destroy()
    }

}
export default new RepositoryCategorias()