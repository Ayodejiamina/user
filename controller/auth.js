const RegModel = require('../models/register')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const nodemailer = require('nodemailer');
const { validationResult } = require('express-validator/check')
exports.dashboard = (req, res) => {
  let username
  if(!req.session.isLoggedIn){
     username =""
  }
  username = req.session.userData.name

  res.render('admin/dashboard', { title: "dashboard", username:username })
}

// exports.userAdded = (req, res) => {
//   let errors = req.flash('errors')
//   res.render('admin/view-user', { title: 'Register', errorses: errors,modalOpen:true })
// }
exports.userAdded = (req, res) => {

  res.render('admin/view-user', { title: 'Register'})
}
 
exports.postRegister = (req,res)=>{
//  return res.status(200).json('submitted')
 RegModel.create(alldata).then(result=>{
  if(result){
    res.redirect('/login')
  }
 })
}
// exports.postRegister = (req, res) => {
  
//   const { name, role, email, phone, password } = req.body






//   // let errors = validationResult(req)
//   // console.log(errors)
//   // if (!errors.isEmpty()) {
//   //   req.flash('errors', errors.array())
//   //   req.session.save(() => {
//   //     res.redirect('/add-user')
//   //   })
//   // }
//   // else {
//   //   bcrypt.hash(password, 12).then(hashedPassword => {
//   //     RegModel.create({
//   //       name: name,
//   //       role: 'user',
//   //       email: email,
//   //       phone: phone,
//   //       password: hashedPassword
//   //     }).then(result => {
//   //       res.render('auth/login')
//   //       const email = {
//   //         to: [result.email, 'ayomide@gmail.com'],
//   //         from: {
//   //           name: 'Amin Mart',
//   //           email: 'aminat@gmail.com'
//   //         },
//   //         subject: 'Welcome to Amin Mart Shopping',
//   //         html: `
//   //      <h2>Welcome ${result.email}</h2>
//   //     `
//   //       }

//   //       var transport = nodemailer.createTransport({
//   //         host: "sandbox.smtp.mailtrap.io",
//   //         port: 2525,
//   //         auth: {
//   //           user: "d35dde509992f8",
//   //           pass: "a71f3840f520c5"
//   //         }
//   //       });
//   //       transport.sendMail(email).then(resp => {

//   //         return res.redirect('/login')

//   //       }).catch(err => { console.log(err) })

//   //     }).catch(err => { console.log(err) })
//   //   }).catch(err => { console.log(err) })

//   // }
// }
exports.getLogin = (req, res) => {
  let myError = req.flash('errors')
  let allErrors = req.flash('allErr')
  res.render('auth/login', { title: 'Login', loggingError: myError, inError: allErrors })
  console.log(myError)
}
exports.postLogin = (req, res) => {
  let logErrors = validationResult(req)
  // console.log(logErrors)
  if (!logErrors.isEmpty()) {
    req.flash('errors', logErrors.array())
    return req.session.save(() => {
      res.redirect('/login')
    })
  } else {
    const { email, password } = req.body
    RegModel.findOne({
      where: {
        email: email,
        // password:password
      }
    }).then(data => {
      if (!data) {
        req.flash('allErr', 'invalid email or password')
        return req.session.save(() => {
          res.redirect('/login')
          return data
        })
      }
      bcrypt.compare(password, data.password).then(result => {
        console.log(result)
        if (!result) {
          req.session.save(() => {
            return res.redirect('/login')
          })
        }
        req.session.isLoggedIn = true
        req.session.userData = data
        
        return req.session.save(() => {
         res.redirect('/dashboard')
        })
      })
    }).catch(err => {
      console.log(err)
    })
  }
}
exports.forgotPassword = (req, res) => {
  let errors = req.flash('foError')
  res.render('auth/forgot-password', {
    title: "forgot",
    forError: errors
  })
}
exports.forgotPasswordPost = (req, res) => {
  const { email } = req.body
  let foErrors = validationResult(req)
  if (!foErrors.isEmpty()) {
    req.flash('foError', foErrors.array())
    return req.session.save(() => {
      res.redirect('/forgot')
    })
  }
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      req.flash('cryError', 'invalid details used')
      req.session.save(() => {
        res.redirect('/forgot')
      })
    }
    let token = buffer.toString('hex')
    RegModel.findOne({
      where: {
        email: email
      }
    }).then(user => {
      if (!user) {
        req.flash('userErr', 'invalid email')
        req.session.save(() => {
          res.redirect('/forgot')
          return user
        })
      }
      user.resetToken = token;
      console.log(token)
      user.resetTokenExpiration = Date.now() + 90000000
      return user.save()
    })
      .then(users => {
        const email = {
          to: users.email,
          from: {
            name: "Ayomide",
            email: "aminat@gmail.com"
          },
          subject: "retrieve password",
          html: `
        <h2>You are welcome to Amin Mart store${users.email}</h2> .
        <h2>You requested to retrive your password</h2>
        <p><a href="http:/localhost:3000/retrive/${token}">Click here </a> to retrive your password</p>
        <p>This link will expire in the next 24 hours.<br>
        Kindly ignore if you don't send this request
        </p>
      `
        }
        var transport = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "d35dde509992f8",
            pass: "a71f3840f520c5"
          }
        });
        transport.sendMail(email).then((respons) => {
          req.session.save(()=>{
            return res.redirect('/login');
          })
        }).catch(err => console.log(err))
        return res.redirect('/login');
      })
  })
}

exports.retrievePassword = (req, res) => {
  let token = req.params.token
  RegModel.findAll({
    where:{
      resetToken:token
    }
  }).then(rest=>{
    if(!rest){
      req.flash('error','invalid url')
      req.session.save(()=>{
        res.redirect('/login')
      })
    }
    if(rest.resetTokenExpiration < Date.now()){
      req.flash('reterr','your token has expired kindly login again to retrieve a new one')
      req.session.save(()=>{
        res.redirect('/login')
      }) 
    }
  }).catch(err=>{
    console.log(err)
  })
  res.render('auth/retrieve-password', { title: "retrieve" })
}



exports.reset=(req,res)=>{
  let resetError = req.flash('resErrors')
  res.render('auth/reset-password',{title:'Reset',resetErrors:resetError})
}
exports.postReset = (req,res)=>{
  const{name,email,password,newPassword,conPassword}= req.body
let resError = validationResult(req)
console.log(resError)
if(!resError.isEmpty()){
  req.flash('resErrors',resError.array())
  return req.session.save(()=>{
    res.redirect('/reset')
  })
}else{
  RegModel.findOne({
    where:{
      email:email,
    }
  }).then(datas=>{
    if (!datas) {
      req.flash('userErr', 'invalid details')
      req.session.save(() => {
        res.redirect('/reset')
        return datas
      })
    }
  bcrypt.compare(password,datas.password).then(match=>{
    if(!match){
      req.flash('errors','the password does not exist')
      res.session.save(()=>{
        res.redirect('/reset')
      })
    }
    bcrypt.hash(newPassword,12).then(hashedP=>{
      datas.password = hashedP
      return datas.save()
.then(result=>{req.session.save(()=>{
        return res.redirect('/register')
      })
      })
    })
  } ).catch(err=>{console.log(err)})
  }).catch(err=>{console.log(err)})
}
}
