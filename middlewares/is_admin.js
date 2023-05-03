module.exports = (req,res,next)=>{
    if(req.session.userData.role != 'admin'){
        return res.redirect('/')
    }
}