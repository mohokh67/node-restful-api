import config from './../../../config/config'
import express from 'express'
const router = express.Router()
import bcrypt from 'bcrypt'


// DB model
import User from '../models/user'

router.post('/signup', (req,res, next) =>{
    let email = req.body.email
    User.find({ 'email': email})
        .exec()
        .then(user => {
            if(user.length >= 1){
                res.status(409).json({
                    message: 'Email has already exist',
                })
            } else {
                bcrypt.hash(req.body.password, 10, (error, hashedPassword) => {
                    if(error){
                        res.status(500).json({
                            message: 'error',
                            error: error
                        })
                    } else {
                        let user = new User({
                            email: email,
                            password: hashedPassword
                        })

                        user.save()
                            .then(result =>{
                                res.status(201).json({
                                    message: 'success',
                                    createdUser: {
                                        _id: result._id,
                                        email: result.email
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
            }
        })
        .catch()
})

router.post('/login', (req,res, next) =>{

})

module.exports = router