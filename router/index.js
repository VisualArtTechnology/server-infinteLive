const express = require('express')
const router = express.Router()
const routerAdmin = require('./routerAdmin')
const routerClient = require('./routerClient')
router.use('/',routerAdmin)
router.use('/',routerClient)

module.exports = router

