import RepositoryEmprestimos from '../repository/emprestimos.js'

const segredo = 'S3gred0'

class ServiceEmprestimos {

    async Buscar() {
        return RepositoryEmprestimos.Find()
    }

    async Detalhe(id) {
        if (!id) {
            throw new Error("Favpr informar o ID!")
        }

        const emprestimo = await RepositoryEmprestimos.FindById(id)

        if (!emprestimo) {
            throw new Error(`ID ${id} do emprestimo não encontrado!`)
        }

        return emprestimo
    }

    async Criar(livro, autor, datareq, datadev) {
        if (!livro || !autor || !datareq || !datadev) {
            throw new Error("Favor informar todos os dados!")
        }

        const emprestimo = await RepositoryEmprestimos.Create(livro, autor, datareq, datadev)

        return emprestimo
    }

    async Alterar(id, livro, autor, datareq, datadev) {
        if (!id || !livro || !autor || !datareq || !datadev) {
            throw new Error("Favor informar o ID!")
        }
        
        const emprestimoAlterar = await RepositoryEmprestimos.Update(id, livro, autor, datareq, datadev)

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