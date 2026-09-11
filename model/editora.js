import { databaseEditoras } from "../config/databaseEditoras.js"

class Editora{
    constructor(){
        this.model = databaseEditoras.db.define("editoras", {
            id:{
                type:databaseEditoras.db.Sequelize.INTEGER,
                primaryKey:true,
                autoIncrement:true
            },
            nome:{
                type:databaseEditoras.db.Sequelize.INTEGER
            }
        })
    }
}