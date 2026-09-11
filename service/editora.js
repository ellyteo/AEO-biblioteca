import RepositoryEdi from "../repository/editora.js"

class ServiceEdi {
    async Buscar() {
        return RepositoryEdi.Find()
    }

    async Detalhe(id) {
        if (!id) {
            throw new Error("Favor passar o id")
        }

        const editoras = await RepositoryEdi.Detalhes(id)

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