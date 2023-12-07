const express = require('express')
const sequelize = require('./database/connect')
const path = require('path')
// const user_model = require('../../models/user_model')
const register = require('./models/register')
const errorController = require('./controller/errors/error')
const multer = require('multer')
const bodyParser = require('body-parser')
const expressSession = require('express-session')
const userRoute = require('./routes/userRoute')
const authRoutes = require('./routes/auth')
const productRoutes = require('./routes/productRoute')
const flash = require('connect-flash')
const products = require('./models/admin/product')
const SequelizeStore = require("connect-session-sequelize")(expressSession.Store);
//  
const app = express()
app.use(flash())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(expressSession({
    secret: 'my user profile',
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({
        db: sequelize,
    }),
    cookie: {}
}))
// let multStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'public/images')
//     },
//     filename:(req, file, cb)=>{
//         console.log(file)
//         console.log(req.body)
//       let extension = file.mimetype.split('/')[1];
//       console.log(extension)
//         cb(null, Date.now() + "-" + req.body.name + '.'+ extension)
//       }
// })
// app.use(multer({ storage: multStorage }).single('image'))
app.set('view engine', 'ejs')
app.use(userRoute)
app.use(authRoutes)
app.use(productRoutes)
app.use('/500',errorController.error500)
app.get((error,req,res,next)=>{
    res.redirect('/500')
})
app.use(errorController.error404)
app.use((req, res, next) => {
    res.locals.isLoggedIn = req.session.isLoggedIn;
    res.locals.userData = req.session.userData
    next()
})


// products.sync({alter:true})
sequelize.sync().then(result => {
    app.listen(3001)
}).catch(err => {
    console.log(err)
})