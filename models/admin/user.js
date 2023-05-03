const Sequelize = require('sequelize')
const sequelize = require('../../database/connect')

const users = sequelize.define('user',{
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement:true,
        primaryKey: true
    },
    name:{
        type:Sequelize.STRING(100),
        allowNull:false
    },
    email:{
        type:Sequelize.STRING(100),
        allowNull:false
    },
    phone:{
        type:Sequelize.STRING,
        allowNull:false
    },
    password:{
        type:Sequelize.STRING(100),
        allowNull:false
    }

})
module.exports = users
