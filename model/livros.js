import database from "../config/database.js"

class Livros {
    constructor() {
        this.model = database.db.define("livros", {
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            nome: {
                type: database.db.Sequelize.STRING
            },
            autor: {
                type: database.db.Sequelize.STRING
            },
            ano: {
                type: database.db.Sequelize.INTEGER
            },
            editora: {
                type: database.db.Sequelize.STRING
            }
        })
    }
}
export default new Livros().model