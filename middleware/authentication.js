const {Admin} = require('../models')
const {sign,verify} = require('../helper/jwt')

const authentication = async (req,res,next) =>{
  try {
    const {access_token} = req.headers
    // console.log(req.headers,'<<<,');
    if(!access_token) {
        throw {name: 'invalidToken'}
    }

    const data = verify(access_token)
    // console.log(data);
    const user = await Admin.findByPk(data.id)
    // console.log(user,'dari auth');
    if(!user) {
        throw {status : 401, name : 'invalidToken'}
    }
    req.user = user
    next()
  } catch (error) {
    console.log(error);
    if(error.name === 'invalidToken') {
        res.status(401).json({
             message : 'Invalid Token'
        })
    }
  }
}

module.exports = authentication