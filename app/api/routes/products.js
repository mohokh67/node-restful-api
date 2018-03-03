import config from './../../../config/config'
import express from 'express'
const router = express.Router()
import multer from 'multer'
import uniqid from 'uniqid'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
       cb(null, './uploads/')
    },
    filename: (req, file, cb) => {
        let fileName = file.originalname
        //let fileExtension = fileName.split('.').pop()
        let fileExtension = fileName.substr((fileName.lastIndexOf('.')))
        cb(null, uniqid('product_') + fileExtension)
    }
})
const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true)
    } else {
        //reject all other types
        cb(null, false)
    }
}
const upload = multer({ storage: storage, limits: {
        fileSize: 1024 * 1024 * 3 // Max 3 MB
    },
    fileFilter: fileFilter
})

// DB model
import Product from '../models/product'

const parentRoute = 'products/'
// All
router.get('/', (req, res, next) => {
    Product.find()
        .select('_id name price image')
        .exec()
        .then(docs =>{
            let response = {
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        _id: doc._id,
                        name: doc.name,
                        price: doc.price,
                        image: doc.image,
                        request: {
                            type: 'GET',
                            url: config.url + ':' + config.port + '/'+ parentRoute  + doc._id
                        }
                    }
                })
            }
            //if(docs.length >= 0){
                res.status(200).json({
                    message: 'success',
                    list : response
                })
            // } else {
            //     res.status(404).json({message: 'There is no product in DB' })
            // }
        })
        .catch(error =>{
             console.log(error)
             res.status(500).json({
                message: 'error',
                error: error
             })
        })
})

// Create one
router.post('/', upload.single('productImage'), (req, res, next) => {
    //console.log(req.file) // Uploaded file

    let product = new Product({
        name: req.body.name,
        price: req.body.price,
        image: req.file.path
    })
    product.save()
        .then(result =>{
            console.log(result)
            res.status(201).json({
                message: 'success',
                createdProduct: {
                    _id: result._id,
                    name: result.name,
                    price: result.price,
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

// Find one
router.get('/:id', (req, res, next) => {
    let id = req.params.id
    Product.findById(id)
        .select('_id name price image')
        .exec()
        .then(doc =>{
            console.log(doc)
            if(doc){
                res.status(200).json({
                    message: 'success',
                    product: doc,
                    request: {
                        type: 'GET',
                        description: 'List of all products',
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
})

// Update one
router.patch('/:id', (req, res, next) => {
    let id = req.params.id
    let updateOperations = {}
    for(let operation of req.body){
        updateOperations[operation.propName] = operation.value
    }
    Product.update({ _id: id }, { $set: updateOperations })
        .exec()
        .then(result =>{
            console.log(result)
            res.status(200).json({
                message: 'success',
                request: {
                    type: 'GET',
                    url: config.url + ':' + config.port + '/' + parentRoute + id
                }
            })
        })
        .catch(error =>{
             console.log(error)
             message: 'error',
             res.status(500).json({
                message: 'error',
                error: error
             })
        })
})

// Remove one
router.delete('/:id', (req, res, next) => {
    let id = req.params.id
    Product.remove({ _id: id })
        .exec()
        .then(result =>{
            console.log(result)
            res.status(200).json({
                message: 'Removed successfully',
                request: {
                    type: 'GET',
                    description: 'List of all products',
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
})

module.exports = router