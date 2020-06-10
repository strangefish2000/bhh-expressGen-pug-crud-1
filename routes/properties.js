//* ROUTER:

const express = require("express");
const router = express.Router();

// Require propertiesController
const propertiesController = require('../controllers/propertiesController')

//?........ ADD NEW PROPERTY ........
// load
router.get("/add", propertiesController.addPropertyForm);

// submit
router.post("/add", propertiesController.addPropertySubmit);

//?.... DELETE SINGLE PROPERTY ........

// load
router.get("/properties/delete/:id", propertiesController.deletePropertyForm);

// submit 
router.post("/properties/delete/:id", propertiesController.deletePropertySubmit);

//?......... EDIT PROPERTY ..........
// load 
router.get("/properties/edit/:id", propertiesController.editPropertyForm);

// submit e
router.post("/properties/edit/:id", propertiesController.editPropertySubmit);

//?..... FIND ALL PROPERTIES ........
router.get("/", propertiesController.allProperties);

//?.... FIND SINGLE PROPERTY ........
router.get("/properties/:id", propertiesController.singleProperty);

module.exports = router;
