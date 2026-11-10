import RepositoryBibliotecario from '../repository/bibliotecario.js'

const segredo = 'S3gred0'
const SALT = 12

class ServiceBibliotecario {

    async Buscar() {
        return RepositoryBibliotecario.Find()
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

    async Criar(nome, email, senha) {
        if (!nome || !email || !senha) {
            throw new Error("Favor informar todos os dados")
        }

        const cryptPass = await bcrypt.hash(senha, SALT)

        await RepositoryBibliotecario.Criar(nome, email, cryptPass)
    }

    async Login(email, senha) {
        if (!email || !senha) {
            throw new Error("Email ou senha inválido")
        }

        const bibliotecario = await RepositoryBibliotecario.FindByEmail(email)

        if (!bibliotecario) {
            throw new Error("Email ou senha inválido")
        }

        if (
            !(await bcrypt.compare(String(senha), bibliotecario.senha))
        ) {
            throw new Error("Email ou senha inválido")
        }

        return jwt.sign(
            {
                id: bibliotecario.id,
                email: bibliotecario.email
            },
            segredo,
            {
                expiresIn: 60
            }
        )
    }

    async Alterar(id, nome, email, senha) {
        if(!id || !nome || !email || !senha) {
            throw new Error("Favor informar todos os parametros")
        }
        
        const cryptPass = !senha
            ? undefined
            : await bcrypt.hash(senha, SALT)

        await RepositoryUser.Alterar(id, nome, email, cryptPass)
    }

    async Deletar(id) {
        if (!id) {
            throw new Error("Favor informar o ID")
        }

        const bibliotecario= await RepositoryBibliotecario.Delete(id)

        return bibliotecario    }

}

export default new ServiceBibliotecario()