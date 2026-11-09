import RepositoryEmprestimos from '../repository/emprestimos.js'

class ServiceEmprestimos {

    async Buscar() {
        return RepositoryEmprestimos.Find()
    }

    async Detalhe(id) {
        if (!id) {
            throw new Error("Favor informar o ID!")
        }

        const emprestimo = await RepositoryEmprestimos.FindById(id)

        if (!emprestimo) {
            throw new Error(`ID ${id} do emprestimo não encontrado!`)
        }

        return emprestimo
    }

    async Criar(idLivro, idAutor, requerimento, devolucao) {
        if (!idLivro || !idAutor || !requerimento || !devolucao) {
            throw new Error("Favor informar todos os dados!")
        }

        const emprestimo = await RepositoryEmprestimos.Create(idLivro, idAutor, requerimento, devolucao)

        return emprestimo
    }

    async Alterar(id, idLivro, idAutor, requerimento, devolucao) {
        if (!id || !idLivro || !idAutor || !requerimento || !devolucao) {
            throw new Error("Favor informar o ID!")
        }
        
        const emprestimoAlterar = await RepositoryEmprestimos.Update(id, idLivro, idAutor, requerimento, devolucao)

        return emprestimoAlterar
    }

    async Deletar(id) {
        if (!id) {
            throw new Error("Favor informar o ID!")
        }

        const emprestimo = await RepositoryEmprestimos.Delete(id)

        return emprestimo
    }

}
export default new ServiceEmprestimos()