import config from './../../../config/config'
import express from 'express'
const router = express.Router()
import bcrypt from 'bcrypt'



// DB model
import User from '../models/user'

router.post('/signup', (req, res, next) =>{
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

router.post('/login', (req, res, next) =>{
    let email = req.body.email
    let password = req.body.password
    User.find({ email: email })
        .exec()
        .then(user => {
            if(user.length < 1){
                return res.status(401).json({
                    message: 'Auth failed'
                })
            }
            bcrypt.compare(password, user[0].password, (error, result) => {
                if(error || ! result) {
                    return res.status(401).json({
                        message: 'Auth failed',
                    })
                }
                if(result) {
                    return res.status(200).json({
                        message: 'Auth successful'
                    })
                }
            })
        })
        .catch(error => {
            res.status(500).json({
                message: 'error',
                error: error
            })
        })
})

router.delete('/:userId', (req, res, next)=>{
    let userId = req.params.userId
    User.find({ _id: userId })
        .exec()
        .then(foundUser => {
            if(foundUser.length > 0) {
                // Let's delete the user
                User.remove({ _id: userId })
                    .exec()
                    .then(result => {
                        //console.log(result)
                        res.status(200).json({
                            message: 'success'
                        })
                    })
            } else {
                res.status(404).json({
                    message: 'User not found'
                })
            }
        })
        .catch(error => {
            res.status(500).json({
                message: 'error',
                error: error
            })
        })
        /*
    User.remove({ _id: userId })
        .exec()
        .then(result => {
            console.log(result)
            res.status(200).json({
                message: 'success'
            })
        })
        .catch(error => {
            res.status(500).json({
                message: 'error',
                error: error
            })
        })
        */
})

module.exports = router