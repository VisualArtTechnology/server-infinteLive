const express = require("express");
const ControllerFixed = require("../controllers/controllerFixed");
const ControllerRent = require("../controllers/controllerRent")
const ControllerBlogsTools = require('../controllers/controllerBlog&Tools')
const ContorlllerProject = require('../controllers/controllerproject')
const ControllerAdmin = require('../controllers/controllerAdmin');
const authentication = require("../middleware/authentication");
const router = express.Router();



router.get('/rents', ControllerRent.getClientRent)
router.get('/rents/:id',ControllerRent.getRentDetail)
router.get('/SubCategory',ControllerRent.getSubCategory)
router.get('/CategoryRent',ControllerRent.getCategoryRent)

router.get('/fixeds',ControllerFixed.getClientFixed)
router.get('/fixeds/:id',ControllerFixed.getFixedById)
router.get('/brandFixed',ControllerFixed.getBrand)
router.get('/CategoryFixed',ControllerFixed.getCategoryFixed)


router.get('/blog',ControllerBlogsTools.getClientBlogs)
router.get('/Blogss',ControllerBlogsTools.getblogs)
router.get('/blog/:id',ControllerBlogsTools.getBlogsId)
router.get('/Toolss',ControllerBlogsTools.getClientTools)
router.get('/categoriesTools',ControllerBlogsTools.getCategoryTools)

router.get('/rentsProject',ContorlllerProject.getClientRentProject)
router.get('/rentsProject/:id',ContorlllerProject.getProjectRentById)
router.get('/rentsProject',ContorlllerProject.getProjectRentById)
router.get('/rentsProjectCategory',ContorlllerProject.getCategoryProjectRent)

router.get('/fixedProject',ContorlllerProject.getClientFixedProject)
router.get('/fixedProject/:id',ContorlllerProject.getProjectFixedById)
router.get('/fixedProjectCategory',ContorlllerProject.getCategoryProjectFixed)
module.exports = router