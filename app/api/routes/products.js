import express from 'express'
const router = express.Router()

import Product from '../models/product'

// All
router.get('/', (req, res, next) => {
    Product.find()
        .exec()
        .then(docs =>{
            console.log(docs)
            //if(docs.length >= 0){
                res.status(200).json(docs)
            // } else {
            //     res.status(404).json({message: 'There is no product in DB' })
            // }
        })
        .catch(error =>{
             console.log(error)
             res.status(500).json({error: error})
        })
})

// Create one
router.post('/', (req, res, next) => {
    let product = new Product({
        name: req.body.name,
        price: req.body.price
    })
    product.save()
        .then(result =>{
            console.log(result)
            res.status(201).json(result)
        })
        .catch(error =>{
            console.log(error)
            res.status(500).json({error: error})
       })
})

// Find one
router.get('/:id', (req, res, next) => {
    let id = req.params.id
    Product.findById(id)
        .exec()
        .then(doc =>{
            console.log(doc)
            if(doc){
                res.status(200).json(doc)
            } else {
                res.status(404).json({message: 'No valid entry found for ID: ' + id })
            }
        })
        .catch(error =>{
             console.log(error)
             res.status(500).json({error: error})
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
            res.status(200).json(result)
        })
        .catch(error =>{
             console.log(error)
             res.status(500).json({error: error})
        })
})

// Remove one
router.delete('/:id', (req, res, next) => {
    let id = req.params.id
    Product.remove({ _id: id })
        .exec()
        .then(result =>{
            console.log(result)
            res.status(200).json(result)
        })
        .catch(error =>{
             console.log(error)
             res.status(500).json({error: error})
        })
})

module.exports = router