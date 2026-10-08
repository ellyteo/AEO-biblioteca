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

    async Create(idLivro, idAutor, requerimento, devolucao) {
        const  emprestimoCriar = await emprestimo.create({ idLivro, idAutor, requerimento, devolucao })

        return  emprestimoCriar
    }

    async Update(id, idLivro, idAutor, requerimento, devolucao) {
        const emprestimoAlterar = await emprestimo.findByPk(id)

        if (!emprestimoAlterar) {
            throw new Error("Usuário não encontrado!")
        }

        emprestimoAlterar.idLivro = idLivro
        emprestimoAlterar.idAutor = idAutor
        emprestimoAlterar.requerimento = requerimento
        emprestimoAlterar.devolucao = devolucao

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

}
export default new Repositoryemprestimos()