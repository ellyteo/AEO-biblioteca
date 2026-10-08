import database from "../config/database.js"

class Autores {
    constructor() {
        this.model = database.db.define("autores", {
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            nome: {
                type: database.db.Sequelize.STRING,
                allowNull: false
            },
            biografia: {
                type: database.db.Sequelize.STRING,
                allowNull: false
            },
            genero: {
                type: database.db.Sequelize.STRING,
                allowNull: false
            },
            idLivro: {
                type: database.db.Sequelize.INTEGER
            }
        })
    }
}
export default new Autores().model