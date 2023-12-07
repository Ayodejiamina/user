const router = require('express').Router()
const authController = require('../controller/auth')
const isAdmin = require('../middlewares/is_admin')
const isUser = require('../middlewares/is-user')
const { check} = require('express-validator/check');
const isLoggedIn = require('../middlewares/isLoggedIn');


// router.get('/register',authController.getRegister)
router.get('/add-user',authController.userAdded)
router.post('/add-user',authController.postRegister)
// router.post('/add-user',[
//     check('name').notEmpty().withMessage('Your name is required'),
//     check('phone').notEmpty().withMessage('Your contact is required').isLength({max:11}).withMessage('invalid phone number'),
//     check('email').notEmpty().withMessage('Your email is required').isEmail().withMessage('Invalid email').normalizeEmail(),
//     check('password').notEmpty().withMessage('Password is required').isAlphanumeric().withMessage('Your password must contain both alphabet and numbers').isLength({ min: 6 }).withMessage('Your password lenth must be greater than 6 characters'),
// ],
// authController.postRegister)
router.get('/login',authController.getLogin)
router.post('/login',[
    check('email').notEmpty().withMessage('email is required').trim(),
  check('password').notEmpty().withMessage('password is required').trim()
],
authController.postLogin)
router.get('/dashboard', isLoggedIn, authController.dashboard)
router.get('/retrieve/:token',authController.retrievePassword)
router.get('/forgot',authController.forgotPassword)
router.post('/forgot',check('email', 'email is required or invalid email').notEmpty().isEmail().normalizeEmail(),
authController.forgotPasswordPost)
router.get('/reset',authController.reset)
router.post('/reset',[
    check('name').notEmpty().withMessage('Your name is required'),
    check('email').notEmpty().withMessage('Your email is required').isEmail().withMessage('Invalid email').normalizeEmail(),
    check('password').notEmpty().withMessage('Password is required').isAlphanumeric().withMessage('Your password must contain both alphabet and numbers').isLength({ min: 6 }).withMessage('Your password lenth must be greater than 6 characters'),
    check('newPassword').notEmpty().withMessage('Password is required').isAlphanumeric().withMessage('Your password must contain both alphabet and numbers').isLength({ min: 6 }).withMessage('Your password lenth must be greater than 6 characters'),
    check('conPassword').notEmpty().withMessage('Confirm Password is required').isAlphanumeric().withMessage('Your password must contain both alphabet and numbers').isLength({ min: 6 }).withMessage('Your password lenth must be greater than 6 characters').custom((value, {req})=>{
        if(value !== req.body.newPassword){
            throw new Error('The password does not match');
        }
        return true
    })
],authController.postReset)

module.exports = router