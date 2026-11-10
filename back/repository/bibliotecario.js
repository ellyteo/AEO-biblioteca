import Biliotecario from "../model/bibliotecario.js"

class RepositoryBibliotecario {

    async Find() {
        const bibliotecarios = await Biliotecario.findAll()

        return bibliotecarios
    }

    async FindById(id) {
        const bibliotecarioDetalhes = await Biliotecario.findByPk(id)

        return bibliotecarioDetalhes
    }

    async Create(nome, senha, email) {
        const bibliotecarioCreate = await Biliotecario.create({ nome, senha, email })

        return bibliotecarioCreate
    }

    async Update(id, nome, senha, email) {
        const bibliotecarioAlterar = await Biliotecario.findByPk(id)

        if (!bibliotecarioAlterar) {
            throw new Error("Bibliotecario não encontrado")
        }

        bibliotecarioAlterar.nome = nome || bibliotecarioAlterar.nome
        bibliotecarioAlterar.senha = senha || bibliotecarioAlterar.senha
        bibliotecarioAlterar.email = email || bibliotecarioAlterar.email

        await bibliotecarioAlterar.save()
    }

    async Delete(id) {
        const bibliotecarioDeletar = await Biliotecario.findByPk(id)

        if (!bibliotecarioDeletar) {
            throw new Error("Bibliotecario não encontrado")
        }

        await bibliotecarioDeletar.destroy()
    }

    async FindByEmail(email) {
        return Biliotecario.findOne({ where: { email } })
    }

}

export default new RepositoryBibliotecario()