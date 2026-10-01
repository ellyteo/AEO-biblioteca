import database from "../config/database.js";

class Bibliotecario {
    constructor() {
        this.model = database.db.define("atendimento", {
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            nome: {
                type: database.db.Sequelize.STRING,
                allowNull: false
            }
        })
    }
}

export default new Bibliotecario().model