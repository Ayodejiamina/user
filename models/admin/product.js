const Sequelize = require('sequelize')
const sequelize = require('../../database/connect')

const products = sequelize.define('product',{
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement:true,
        primaryKey: true
    },
    title:{
        type:Sequelize.STRING(100),
        allowNull:false
    },
    description:{
        type:Sequelize.STRING(200),
        allowNull:false
    },
    price:{
        type:Sequelize.DOUBLE,
        allowNull:false
    }
    // ,
    // image:{
    //     type:Sequelize.STRING(100),
    //     allowNull:false
    // }

})
module.exports = products
