const Sequelize = require('sequelize')

const connect = new Sequelize('user_profile','root','ayomidemysql',{
    host:'localhost',
    dialect:'mysql'
})
module.exports = connect