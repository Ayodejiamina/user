// const modelUser = require('../../models/admin/user')
 
// exports.addedUser = (req,res)=>{
//     res.render('admin/add-user')
// }
// exports.postUser = (req,res)=>{
//     const{Name,Email,Phone,Password}= req.body
//     modelUser.create({
//        name:Name,
//        email:Email,
//        phone:Phone,
//        password:Password
//     })
//     console.log('successful')
//     res.redirect('/dashboard')
// }
// exports.users =(req,res)=>{
//     modelUser.findAll()
//     .then(result=>{
//        return res.render('user/index',{userInfo:result})
//     }).catch(err=>{
//         console.log(err)   
//      })
   
// }
// exports.deleteUser = (req,res)=>{
//     const{id}= req.body
//     modelUser.findAll({
//         where:{
//             id : id
//         }
//     }).then(result=>{
//          let product = result[0]
//         return product.destroy()
//     }).then(result=>{
//         res.redirect('/')
//     }).catch(err=>{
//         console.log(err)
//     })
// }
// exports.getUpdate = (req,res)=>{
//     const id = req.params.userID
//     modelUser.findByPk(id).then(data=>{
//         res.render('user/update',{user:data})
//     }).catch(err=>{
//         console.log(err)
//     })
// }
// exports.postUpdate =(req,res)=>{
//  const{id,name,email,phone,password}= req.body
//  modelUser.findByPk(id).then(data=>{
//     data.name = name,
//     data.email = email,
//     data.phone = phone,
//     data.password = password;
//     return data.save();
//  }).then(result=>{
//     res.redirect('/')
//  })
//  .catch(err=>{
//     console.log(err)
//  })
// }