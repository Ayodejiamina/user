const router = require('express').Router()
const userSubmit = require('../controller/admin/added-user')
//  router.get('/add-user',userSubmit.userAdded)
router.post('/deleteUser',userSubmit.deleteUser)
router.get('/update/:id',userSubmit.getUpdate)
router.post('/update',userSubmit.updateUser)
module.exports = router