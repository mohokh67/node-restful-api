import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    email: { type: String, equired: true, unique: true },
    password: { type: String, equired: true }
})

module.exports = mongoose.model('User', userSchema)
