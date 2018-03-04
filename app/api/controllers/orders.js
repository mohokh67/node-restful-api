import config from './../../../config/config'
const parentRoute = 'orders/'
import Order from '../models/order'
import Product from '../models/product'

exports.all = (req, res, next) => {
    Order.find()
        .select('_id product quantity')
        .populate('product', 'name price')
        .exec()
        .then(docs =>{
            let response = {
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        _id: doc._id,
                        product: doc.product,
                        quantity: doc.quantity,
                        request: {
                            type: 'GET',
                            url: config.url + ':' + config.port + '/'+ parentRoute  + doc._id
                        }
                    }
                })
            }
            res.status(200).json({
                message: 'success',
                list : response
            })
        })
        .catch(error =>{
            console.log(error)
            res.status(500).json({
                message: 'error',
                error: error
            })
        })
}

exports.create = (req, res, next) => {
    Product.findById(req.body.productId)
        .then(product => {
            if(!product){
                return res.status(404).json({
                    message: 'error',
                    detail: 'Product not found'
                })
            }
            let order = new Order({
                product: req.body.productId,
                quantity: req.body.quantity
            })
            return order.save()
        })
        .then(result =>{
            res.status(201).json({
                message: 'OK',
                createdOrder: {
                    id: result._id,
                    product: result.product,
                    quantity: result.quantity,
                    request: {
                        type: 'GET',
                        url: config.url + ':' + config.port + '/'+ parentRoute + result._id
                    }
                }
            })
        })
        .catch(error =>{
        console.log(error)
        res.status(500).json({
            message: 'error',
            error: error
        })
        })
}

exports.find = (req, res, next) => {
    let id = req.params.id
    Order.findById(id)
        .select('_id product quantity')
        .populate('product')
        .exec()
        .then(doc =>{
            console.log(doc)
            if(doc){
                res.status(200).json({
                    message: 'success',
                    product: doc,
                    request: {
                        type: 'GET',
                        description: 'List of all orders',
                        url: config.url + ':' + config.port + '/' + parentRoute
                    }
                })
            } else {
                res.status(404).json({message: 'No valid entry found for ID: ' + id })
            }
        })
        .catch(error =>{
             console.log(error)
             res.status(500).json({
                message: 'error',
                error: error
             })
        })
}

exports.delete =  (req, res, next) => {
    let id = req.params.id
    Order.remove({ _id: id })
        .exec()
        .then(result =>{
            console.log(result)
            res.status(200).json({
                message: 'success',
                request: {
                    type: 'GET',
                    description: 'List of all orders',
                    url: config.url + ':' + config.port + '/' + parentRoute
                }
            })
        })
        .catch(error =>{
             console.log(error)
             res.status(500).json({
                message: 'error',
                error: error
             })
        })
}