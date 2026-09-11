import editoras from "../model/editora.js"

class RepositoryEdi{
    async Find(){
        const editora = await editoras.findAll()

        return editora
    }

    async Detalhes(id){
        const dd = await editoras.findByPk(id)

        return dd
    }

    async Creat(nome){
        const criarEditora = await editoras.creat({nome})

        return criarEditora
    }

    async Update(id,nome){
        const update = await editoras.findByPk(id)

        if(!update){
            throw new Error("Editora não encontrada")
        }
        update.nome = nome

        await update.save()

        return update
    }

    async Delete(id){
    const deletarEdi = await editoras.findByPk(id)

    if(!deletarEdi){
        throw new Error("Editora não encontrada")
    }
    await deletarEdi.destroy()

    return deletarEdi
    }


}

export default new RepositoryEdi