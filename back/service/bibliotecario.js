import RepositoryBibliotecario from '../repository/bibliotecario.js'

const segredo = 'S3gred0'

class Servicebiblio {

    async Buscar(id) {
        return RepositoryBibliotecario.Find(id)
    }

    async Detalhe(id) {
        if (!id) {
            throw new Error("Favor informar o ID")
        }

        const biliotecario = await RepositoryBibliotecario.FindById(id)

        if (!biliotecario) {
            throw new Error(`ID ${id} do bibliotecario não encontrado`)
        }

        return biliotecario
    }

    async Criar(nome) {
        if (!nome) {
            throw new Error("Favor informar todos os dados")
        }

        const bibliotecario = await RepositoryBibliotecario.Create(nome)

        return bibliotecario
    }

    async Login(email, senha) {
        if (!email || !senha) {
            throw new Error("Email ou senha inválido")
        }

        const usuario = await RepositoreUsuario.FindByEmail(email)

        if (!usuario) {
            throw new Error("Email ou senha inválido")
        }

        if (
            !(await bcrypt.compare(String(senha), usuario.senha))
        ) {
            throw new Error("Email ou senha inválido")
        }

        return jwt.sign(
            { id: usuario.id, email },
            segredo,
            { expiresIn: 60 * 60 }
        )
    }

    async Alterar(id, nome) {
        if (!id) {
            throw new Error("Favor informar os dados");
        }

        const biblioAlterado = await RepositoryBibliotecario.Update(id, nome)

        return biblioAlterado
    }

    async Deletar(id) {
        if (!id) {
            throw new Error("Favor informar o ID")
        }

        const biblio = await RepositoryBibliotecario.Delete(id)

        return biblio
    }

}

export default new Servicebiblio()