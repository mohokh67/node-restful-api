import config from './../../../config/config'
import express from 'express'
const router = express.Router()
import mongoose from 'mongoose'

const parentRoute = 'orders/'
import Order from '../models/order'

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'orders were fetched'
    })
})

router.post('/', (req, res, next) => {
    let order = new Order({
        product: req.body.productId,
        quantity: req.body.quantity
    })

    order.save()
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

})

router.get('/:id', (req, res, next) => {
    let id = req.params.id
    res.status(200).json({
        message: 'Order details' + id
    })
})

router.delete('/:id', (req, res, next) => {
    let id = req.params.id
    res.status(200).json({
        message: 'Order deleted' + id
    })
})

module.exports = router