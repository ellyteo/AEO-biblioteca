import RepositoryBiblio from '../repository/bibliotecario.js'

class Servicebiblio {

    async Buscar() {
        return RepositoryBiblio.Find()
    }

    async Detalhe(id) {
        if(!id) {
            throw new Error("Favor informar o ID")
        }

        const biliotecario = await RepositoryBiblio.FindById(id)
        
        if(!biliotecario) {
            throw new Error(`ID ${id} do bibliotecario não encontrado`)
        }

        return biliotecario
    }
   
    async Criar(nome) {
        if (!nome) {
            throw new Error("Favor informar todos os dados")
        }

        const bibliotecario = await RepositoryBiblio.Create(nome)

        return bibliotecario
    }

    async Login(id, nome) {
        if(!id, nome) {
            throw new Error("Favor informar todos os dados.")
        }

        const biblio = await RepositoryBiblio.FindByEmail(id)

        
    }

    async Alterar(id, nome) {
        if (!id) {
            throw new Error("Favor informar os dados");
        }

        const biblioAlterado = await RepositoryBiblio.Update(id, nome)
        
        return biblioAlterado
    }

    async Deletar(id) {
        if (!id) {
            throw new Error("Favor informar o ID")
        }
        
        const biblio = await RepositoryBiblio.Delete(id)

        return biblio
    }

}

export default new Servicebiblio()