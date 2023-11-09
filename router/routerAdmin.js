const express = require("express");
const ControllerFixed = require("../controllers/controllerFixed");
const ControllerRent = require("../controllers/controllerRent")
const ControllerBlogsTools = require('../controllers/controllerBlog&Tools')
const ContorlllerProject = require('../controllers/controllerproject')
const ControllerAdmin = require('../controllers/controllerAdmin');
const authentication = require("../middleware/authentication");
const router = express.Router();
// const multer = require('multer');

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './Fixed/'); // Menentukan direktori tempat file akan disimpan
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname); // Menentukan nama file
//   }
// });

// const upload = multer({ storage: storage });

// const storageRent = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './Rent/'); // Menentukan direktori tempat file akan disimpan
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname); // Menentukan nama file
//   }
// });

// const uploadRent = multer({ storage: storageRent });

//Admin
router.post('/register',ControllerAdmin.registerAdmin)
router.post('/login',ControllerAdmin.Login)

// router.use(authentication)
//fixed
router.get('/fixed',ControllerFixed.getFixed)
router.post('/fixed',ControllerFixed.postFixed)
router.get('/fixed/:id',ControllerFixed.getFixedById)
router.put('/fixed/:id',ControllerFixed.updateFixed)
router.post('/brand',ControllerFixed.postBrand)
router.post('/categoryFixed',ControllerFixed.postCategoryFixed)
router.get('/brand',ControllerFixed.getBrand)
router.get('/categoryFixed',ControllerFixed.getCategoryFixed)
router.delete('/fixed/:id' ,ControllerFixed.deleteFixed)
//rent
router.get('/rent',ControllerRent.getRent)
router.get('/rent/:id' , ControllerRent.getRentDetail)
router.post('/rent',ControllerRent.postRent)
router.put('/rent/:id',ControllerRent.updateRent)
router.post('/categoryRent',ControllerRent.postCategoryRent)
router.get('/categoryRent',ControllerRent.getCategoryRent)
router.get('/subCategoryRent',ControllerRent.getSubCategory)
router.post('/subCategoryRent',ControllerRent.postSubCategoryRent)
router.delete('/rent/:id',ControllerRent.deleteRent)
router.delete('/subCategoryRent/:id', ControllerRent.deleteSubCategoryRent)

// blogs
router.get('/blogs',ControllerBlogsTools.getblogs)
router.get('/blogs/:id',ControllerBlogsTools.getBlogsId)
router.post('/blogs',ControllerBlogsTools.postBlogs)
router.put('/blogs/:id',ControllerBlogsTools.updateBlogs)
router.delete('/blogs/:id',ControllerBlogsTools.deleteBlogs)


//Tools
router.get('/tools',ControllerBlogsTools.getTools)
router.get('/tools/:id',ControllerBlogsTools.getToolsId)
router.post('/tools',ControllerBlogsTools.postTools)
router.put('/tools/:id',ControllerBlogsTools.updateTools)
router.delete('/tools/:id',ControllerBlogsTools.deleteTools)
router.post('/categoryTools',ControllerBlogsTools.postCategoryTools)
router.get('/categoryTools',ControllerBlogsTools.getCategoryTools)


//project
router.get('/project',ContorlllerProject.getProjectRent)
router.get('/project/:id',ContorlllerProject.getProjectRentById)
router.post('/project',ContorlllerProject.postProjectRent)
router.put('/project/:id',ContorlllerProject.updateProjectRent)
router.delete('/project/:id',ContorlllerProject.deletedProjectRent)
router.get('/categoryRentProject',ContorlllerProject.getCategoryProjectRent)
router.post('/categoryRentProject',ContorlllerProject.postCategoryProjectRent)
router.delete('/categoryRentProject/:id',ContorlllerProject.deletedCategoryProjectRent)

router.get('/projectFixed',ContorlllerProject.getProjectFixed)
router.get('/projectFixed/:id',ContorlllerProject.getProjectFixedById)
router.post('/projectFixed',ContorlllerProject.postProjectFixed)
router.post('/categoryFixedProject',ContorlllerProject.postCategoryProjectFixed)
router.get('/categoryFixedProject',ContorlllerProject.getCategoryProjectFixed)
router.delete('/categoryFixedProject/:id',ContorlllerProject.deletedCategoryProjectFixed)

module.exports = router
