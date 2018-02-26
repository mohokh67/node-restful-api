import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'

const app = express()

// Import routes
import productsRoute from './api/routes/products'
import ordersRoute from './api/routes/orders'

app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    // Prevent CORS erros
    // It must come before routes
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Typr, Accept, Authorization')
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, GET, DELETE')
        return res.status(200).json({})
    }
    next()
})

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