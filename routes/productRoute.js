const router = require('express').Router()
const productSubmit = require('../controller/admin/added-product')
const {check} = require('express-validator')
 router.get('/add-product',productSubmit.addProducts)
 router.post('/add-product',[
    check('name').notEmpty().withMessage('name field is required'),
    check('description').notEmpty().withMessage('description field is required'),
    check('price').notEmpty().withMessage('price field is required').isNumeric().withMessage('price must be numbers and not letters')
   //  check('image').notEmpty().withMessage('image field is required')
 ],productSubmit.postProducts)
 router.get('/products',productSubmit.product)
router.post('/delete',productSubmit.deleteProduct)
router.get('/updateProd/:id',productSubmit.getUpdate)
router.post('/updateProd',productSubmit.updateUser)
router.get('/',productSubmit.index)
module.exports = router