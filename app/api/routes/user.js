import express from 'express'
const router = express.Router()
import UserController from './../controllers/user'

router.post('/signup', UserController.create)
router.post('/login', UserController.login)
router.delete('/:userId', UserController.delete)

module.exports = router