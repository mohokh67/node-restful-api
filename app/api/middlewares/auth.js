import config from './../../../config/config'
import jwt from 'jsonwebtoken'

module.exports = (req, res, next) => {
    try{
        // Token should be sent in header - NOT part of body
        let token = req.headers.authorization.split(" ")[1]
        //console.log(token)
        let decodeToken = jwt.verify(token, config.JWT_KEY)
        req.userData = decodeToken // For other usage, accessible from request in the current route
        next()
    } catch(error){
        return res.status(401).json({
            message: 'Auth failed',
            //error: error.message
        })
    }
}