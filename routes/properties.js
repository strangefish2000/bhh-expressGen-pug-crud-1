//* ROUTER:

const express = require("express");
const router = express.Router();

// Require propertiesController
const propertiesController = require('../controllers/propertiesController')

//?........ ADD NEW PROPERTY ........
// load
router.get("/add", propertiesController.addPropertyForm);

// submit
router.post("/properties/add", propertiesController.addPropertySubmit);

//?.... DELETE SINGLE PROPERTY ........
// load
router.get("/delete/:id", propertiesController.deletePropertyForm);

// submit 
router.post("/delete/:id", propertiesController.deletePropertySubmit);

//?......... EDIT PROPERTY ..........
// load 
router.get("/edit/:id", propertiesController.editPropertyForm);

// submit
router.post("/edit/:id", propertiesController.editPropertySubmit);

//?..... FIND ALL PROPERTIES ........
router.get("/", propertiesController.allProperties);

//?.... FIND SINGLE PROPERTY ........
router.get("/:id", propertiesController.singleProperty);

module.exports = router;
