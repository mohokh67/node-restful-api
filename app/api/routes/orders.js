import config from './../../../config/config'
import express from 'express'
const router = express.Router()
import auth from './../middlewares/auth'

import OrdersController from './../controllers/orders'

router.get('/', auth, OrdersController.all)

router.post('/', auth, OrdersController.create)

router.get('/:id', auth, OrdersController.find)

router.delete('/:id', auth, OrdersController.delete)

module.exports = router