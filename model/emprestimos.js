import database from "../config/database.js"

class Emprestimos {
    constructor() {
        this.model = database.db.define("livros", {
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            livro: {
                type: database.db.Sequelize.STRING
            },
            autor: {
                type: database.db.Sequelize.STRING
            },
            datareq: {
                type: database.db.Sequelize.STRING
            },
            datadev: {
                type: database.db.Sequelize.STRING
            }
        })
    }
}
export default new Emprestimos().model