import express from 'express'
const app = express()
import morgan from 'morgan'

import productsRoute from './api/routes/products'
import ordersRoute from './api/routes/orders'

app.use(morgan('dev'))

// Routes
app.use('/products', productsRoute);
app.use('/orders', ordersRoute);

// catch 404 and forward to error handler
app.use((req, res, next)=> {
    let error = new Error('Not found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next)=> {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;