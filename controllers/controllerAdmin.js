const {Admin} = require('../models/index') 
const {compare} = require('../helper/bcrypt')
const {sign} = require('../helper/jwt')

class Controller {
    static async registerAdmin(req,res) {
        try {
            const {email,fullName,password,noHp} = req.body
            const data = await Admin.create({
                email,
                fullName,
                password,
                noHp
            })

            res.status(201).json(data)
        } catch (error) {
            console.log(error);
            if (error.name === 'SequelizeValidationError') {
                // Tangkap dan tangani kesalahan validasi
                const validationErrors = error.errors.map(err => err.message);
                console.error('Kesalahan validasi:', validationErrors);
                res.status(400).json(validationErrors );
              } else {
                // Tangkap dan tangani kesalahan lainnya
                console.error('Gagal membuat admin:', error.message);
                res.status(500).json({ error: 'Gagal membuat admin' });
              }
    }
}
static async Login (req,res) {
    try {
        const {email,password} = req.body
        console.log(req.body);
        const user = await Admin.findOne({
            where :{
                email
            }
        })
        if(!user) {
            throw {
                name : 'invalid login'
            }
        }else {
            let comparePassowrd = compare(password,user.password)
            if(!comparePassowrd) {
                throw {
                    name: 'invalid login'
                }
            } else {
                const {id,email} = user
                let token = sign({
                    id,
                    email
                })
                res.status(201).json({
                    access_token : token,
                    user
                })
            }
        }
    } catch (error) {
       console.log(error);
    }
}
}

module.exports = Controller