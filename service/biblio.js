import RepositoryBi from "../repository/biblotecario.js"

class ServiceEdi {
    async Buscar() {
        return RepositoryBi.Find()
    }

    async Detalhe(id) {
        if (!id) {
            throw new Error("Favor passar o id")
        }

        const biblio = await RepositoryBi.Detalhes(id)

        if(!editoras){
            throw new Error(`ID ${id} da Editora não encontrado`)
        }
        
        return editoras
    }

    async Criar(nome) {
        if(!nome){
            throw new Error("Favor informar todos os dados ")
        }

        const editoras = await RepositoryEdi.Creat(nome)
        return {editoras}
    }

    async Alterar(id,nome) {
        if(!id || !nome){
            throw new Error("Favor informar os dados")
        }

        const alterarEdi = await RepositoryEdi.Update(id,nome)

        return alterarEdi
    }

    async Deletar(id){
        if(!id){
            throw new Error("Favor informar os dados")

            const DeletarEdi = await RepositoryEdi.Delete(id)

            return DeletarEdi
        }
    }
}

export default ServiceEdi