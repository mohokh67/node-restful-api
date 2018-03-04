import express from 'express'
const router = express.Router()
import UserController from './../controllers/user'
import auth from './../middlewares/auth'

router.post('/signup', UserController.create)
router.post('/login', UserController.login)
router.delete('/:userId', auth, UserController.delete)

module.exports = router