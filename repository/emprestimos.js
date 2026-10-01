import emprestimo from '../model/emprestimos.js'

class Repositoryemprestimos {


    async Find() {
        const emprestimos = await emprestimo.findAll()

        return emprestimos
    }

    async FindById(id) {
        const EmprestimoDetalhe = await emprestimo.findByPk(id)

        return EmprestimoDetalhe
    }

    async Create(livro, autor, datareq, datadev) {
        const  emprestimoCriar = await emprestimo.create({ livro, autor, datareq, datadev })

        return  emprestimoCriar
    }

    async Update(id, livro, autor, datareq, datadev) {
        const emprestimoAlterar = await emprestimo.findByPk(id)

        if (!emprestimoAlterar) {
            throw new Error("Usuário não encontrado!")
        }

        emprestimoAlterar.livro = livro
        emprestimoAlterar.autor = autor
        emprestimoAlterar.datareq = datareq
        emprestimoAlterar.datadev = datadev

        await emprestimoAlterar.save()
    }

    async Delete(id) {
        const emprestimoDeletar = await emprestimo.findByPk(id)

        if (!emprestimoDeletar) {
            throw new Error("Usuário não encontrado!")
        }

        await emprestimoDeletar.destroy()

        return emprestimoDeletar
    }

    async FindByEmail(email) {
        return emprestimo.findOne({ where: { email } })
    }

}
export default new Repositoryemprestimos()