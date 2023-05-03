const productsModel = require('../../models/admin/product')
const { validationResult } = require('express-validator')

exports.product = (req, res) => {
    productsModel.findAll().then(result => {
        return res.render('admin2/product-added', { prodInfo: result })
    }).catch(err => {
        console.log(err)
    })
}
exports.addProducts = (req, res) => {
    let error = req.flash('errors')
    res.render('admin2/add-product')
}
exports.postProducts = (req, res) => {
    // return res.status(200).json('submitted')
    let errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json(errors.array())
    }
    console.log(req.body)
    const { id, name, description, price } = req.body
    // let imagepath = '/images/' + req.file.filename
    // console.log(imagepath)
    productsModel.create({
        id: id,
        title: name,
        description: description,
        price: price,
        // image: imagepath
     })
    .then(product=>{
        return res.redirect('/products')
    }).catch(err=>{
        console.log(err)
    })

}
exports.deleteProduct = (req, res) => {
    const { id } = req.body
    productsModel.findAll({
        where: {
            id: id
        }
    }).then(data => {
        let deleteIt = data[0]
        return deleteIt.destroy()
    }).then(result => {
        res.redirect('/products')
    }).catch(err => {
        console.log(err)
    })
}
exports.getUpdate = (req, res) => {
    const id = req.params.id
    productsModel.findByPk(id).then(result => {
        res.render('admin2/update-product', { prodUp: result })
    })
}
exports.updateUser = (req, res) => {
    const { id, name, description, price, image } = req.body
    let imagepath = '/images/' + req.file.filename
    productsModel.findByPk(id).then(data => {
        data.title = name,
            data.description = description,
            data.price = price,
            data.image = imagepath;
        return data.save();
    }).then(data => {
        return res.redirect('/products')
    }).catch(err => {
        console.log(err)
    })
}
exports.index = (req, res) => {
    let page = Number.parseInt(req.query.page) || 1;
    let totalProductsFromDb;
    let totalItemOnEachPage = 4;
    productsModel.count().then(dataTot => {
        totalProductsFromDb = dataTot
        // console.log(totalProductsFromDb)
        productsModel.findAll({
            limit: totalItemOnEachPage,
            offset: (page - 1) * totalItemOnEachPage
        }).then(data => {
            if (data) {
                res.render('user/index',
                    {
                        datas: data,
                        pages: totalProductsFromDb / totalItemOnEachPage,
                        nextPage: page + 1,
                        hasNextPage: totalProductsFromDb > totalItemOnEachPage * page,
                        myLength: totalProductsFromDb

                    })
            }
        })
    })
        .catch(err => {
            console.log(err)
        })
}