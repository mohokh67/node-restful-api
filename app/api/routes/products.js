import express from 'express'
const router = express.Router()

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /products'
    })
})

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'Handling POST request in /products'
    })
})

router.get('/:id', (req, res, next) => {
    let id = req.params.id
    res.status(200).json({
        message: 'Handling GET requests to /products/' + id
    })
})

router.patch('/:id', (req, res, next) => {
    let id = req.params.id
    res.status(200).json({
        message: 'Handling UPDATE requests to /products/' + id
    })
})

router.delete('/:id', (req, res, next) => {
    let id = req.params.id
    res.status(200).json({
        message: 'Handling DELETE requests to /products/' + id
    })
})


module.exports = router