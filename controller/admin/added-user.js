const userModel = require('../../models/register')


exports.userAdded = (req,res)=>{
  userModel.findAll({
    where:{
        role:'user'
    }
  }).then(users=>{
    req.session.save(()=>{
        res.render('admin/view-user',{Users:users})
    })
  }) .catch(err=>console.log(err))
}
exports.deleteUser= (req,res)=>{
    const{id}= req.body
   userModel.findAll({
    where:{
        id:id
    }
   }).then(result=>{
    let myDelete = result[0]
    return myDelete.destroy()
   }) .then(result=>{
    res.redirect('/add-user')
   }) .catch(err=>{
    console.log(err)
   })
}
exports.getUpdate=(req,res)=>{
    const id = req.params.id
    userModel.findByPk(id).then(result=>{
        res.render('admin/update-add',{userUp:result})
    })
} 
exports.updateUser = (req,res)=>{
   const{id,name,email,phone,password}= req.body
    userModel.findByPk(id).then(data=>{
            data.name = name,
            data.email = email,
            data.phone = phone,
            data.password = password;
            return data.save(); 
    }).then(data=>{
        return res.redirect('/add-user')
    }).catch(err=>{
        console.log(err)
    })
}