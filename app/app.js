import express from 'express'
import morgan from 'morgan'
const app = express()

// Import routes
import productsRoute from './api/routes/products'
import ordersRoute from './api/routes/orders'

// Log
app.use(morgan('dev'))

// Use routes
app.use('/products', productsRoute);
app.use('/orders', ordersRoute);

// catch 404 and forward to error handler
app.use((req, res, next)=> {
    let error = new Error('Not found')
    error.status = 404
    next(error)
})

// error handler
app.use((error, req, res, next)=> {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;