import config from './../../../config/config'
import express from 'express'
const router = express.Router()
import multer from 'multer'
import uniqid from 'uniqid'
import auth from './../middlewares/auth'

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

import ProductsController from './../controllers/products'

router.get('/', ProductsController.all)
router.post('/', auth, upload.single('productImage'), ProductsController.create)
router.get('/:id', ProductsController.find)
router.patch('/:id', auth, ProductsController.update)
router.delete('/:id', auth, ProductsController.delete)

module.exports = router