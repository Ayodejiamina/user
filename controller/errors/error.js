exports.error404 = (req,res)=>{
    res.render('error/e404',{title:'404'})
}
exports.error500 = (req,res)=>{
    res.status(500).render('error/e500',{title:'500'})
}