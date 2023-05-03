const seqPath = require('../database/connect');
const Sequelize = require('sequelize');


const allUser = seqPath.define('usertables',{
    
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
    role:{
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
    },
    resetToken: Sequelize.STRING,
    resetTokenExpiration: Sequelize.DATE

})
module.exports = allUser