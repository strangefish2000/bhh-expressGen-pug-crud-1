//* ROUTER:
// error handling using default express error handler.

const express = require("express");
const router = express.Router();

// Require propertiesController
const propertiesController = require('../controllers/propertiesController')

//?........ ADD NEW PROPERTY ........
// load new property form
router.get("/add", propertiesController.addPropertyForm);

// submit new property
router.post("/add", propertiesController.addPropertySubmit);

//?.... DELETE SINGLE PROPERTY ........

// load delete form
router.get("/properties/delete/:id", propertiesController.deletePropertyForm);

// submit delete form
router.post("/properties/delete/:id", propertiesController.deletePropertySubmit);

//?......... EDIT PROPERTY ..........
// load edit form
router.get("/properties/edit/:id", propertiesController.editPropertyForm);

// submit edit form
router.post("/properties/edit/:id", propertiesController.editPropertySubmit);

//?..... FIND ALL PROPERTIES ........
// find all properties
router.get("/", propertiesController.allProperties);

//?.... FIND SINGLE PROPERTY ........
// find single property
router.get("/properties/:id", propertiesController.singleProperty);

module.exports = router;
