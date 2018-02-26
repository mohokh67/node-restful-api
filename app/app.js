import express from 'express'
const app = express()

import productsRoute from './api/routes/products'
app.use('/products', productsRoute);

import ordersRoute from './api/routes/orders'
app.use('/orders', ordersRoute);

app.use((req, res, next)=> {
    res.status(200).json({
        message: 'it works'
    })
})

module.exports = app;