import express from 'express'
const router = express.Router()

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'orders were fetched'
    })
})

router.post('/', (req, res, next) => {
    let order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    }
    res.status(201).json({
        message: 'order was created',
        order: order
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