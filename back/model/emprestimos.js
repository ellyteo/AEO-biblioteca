import database from "../config/database.js"

class Emprestimos {
    constructor() {
        this.model = database.db.define("emprestimos", {
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            idLivro: {
                type: database.db.Sequelize.INTEGER
            },
            idAutor: {
                type: database.db.Sequelize.INTEGER
            },
            requerimento: {
                type: database.db.Sequelize.STRING
            },
            devolucao: {
                type: database.db.Sequelize.STRING
            }
        })
    }
}
export default new Emprestimos().model