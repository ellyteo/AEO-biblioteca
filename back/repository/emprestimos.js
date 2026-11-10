import Emprestimo from '../model/emprestimos.js'

class RepositoryEmprestimos {

    async Find() {
        const emprestimos = await Emprestimo.findAll()

        return emprestimos
    }

    async FindById(id) {
        const emprestimoDetalhe = await Emprestimo.findByPk(id)

        return emprestimoDetalhe
    }

    async Create(idLivro, idAutor, requerimento, devolucao) {
        const  emprestimoCriar = await Emprestimo.create({ idLivro, idAutor, requerimento, devolucao })

        return  emprestimoCriar
    }

    async Update(id, idLivro, idAutor, requerimento, devolucao) {
        const emprestimoAlterar = await Emprestimo.findByPk(id)

        if (!emprestimoAlterar) {
            throw new Error("Empréstimo não encontrado!")
        }

        emprestimoAlterar.idLivro = idLivro
        emprestimoAlterar.idAutor = idAutor
        emprestimoAlterar.requerimento = requerimento
        emprestimoAlterar.devolucao = devolucao

        await emprestimoAlterar.save()
    }

    async Delete(id) {
        const emprestimoDeletar = await Emprestimo.findByPk(id)

        if (!emprestimoDeletar) {
            throw new Error("Empréstimo não encontrado!")
        }

        await emprestimoDeletar.destroy()
    }

}
export default new RepositoryEmprestimos()