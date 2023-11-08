const express = require('express')
const router = express.Router()
const routerAdmin = require('./routerAdmin')

router.use('/',routerAdmin)

module.exports = router

