import database from "../config/database.js"

class Categorias {
    constructor() {
        this.model = database.db.define("categorias", {
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            nome: {
                type: database.db.Sequelize.STRING
            },
            genero: {
                type: database.db.Sequelize.STRING
            },
            formato: {
                type: database.db.Sequelize.STRING
            }
        })



    }
}
export default new Categorias ().model