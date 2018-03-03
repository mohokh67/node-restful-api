import config from './../../../config/config'
import express from 'express'
const router = express.Router()
import bcrypt from 'bcrypt'


// DB model
import User from '../models/user'

router.post('/signup', (req,res, next) =>{
    bcrypt.hash(req.body.password, 10, (error, hashedPassword) => {
        if(error){
            res.status(500).json({
                message: 'error',
                error: error
            })
        } else {
            let user = new User({
                email: req.body.email,
                password: hashedPassword
            })

            user.save()
                .then(result =>{
                    res.status(201).json({
                        message: 'success',
                        createdUser: {
                            _id: result._id,
                            email: result.email,
                            password: result.password
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
        }
    })





})

router.post('/login', (req,res, next) =>{

})

module.exports = router