//* PROPERTIES CONTROLLER: propertiesController

// connect to Property model
const Property = require("../models/property");

//?........ ADD NEW PROPERTY ........
// load
exports.addPropertyForm = function (req, res) {
    res.render("add_property", {
        title: "Add Property",
    });
};
//* no call to db so no async / await

// submit
exports.addPropertySubmit = async function (req, res) {
    try {
        let property = await new Property();
        property.name = req.body.name;
        property.imgSrc = req.body.imgSrc;
        property.textBrief = req.body.textBrief;
        property.save();
        res.redirect("/");
        console.log(`New property "${property.name}" created`);
    } catch (err) {
        return next(err);
    }
};

// //?.... DELETE SINGLE PROPERTY ........
// load
exports.deletePropertyForm = async (req, res) => {
    try {
        let property = await Property.findById(req.params.id);
        res.render("delete_property", {
            title: "Delete Property",
            property: property,
        });
    } catch (err) {
        return next(err);
    }
};

// submit
exports.deletePropertySubmit = async (req, res) => {
    try {
        let property = await Property.findByIdAndDelete(req.params.id);
        res.redirect("/");
        console.log(`Deleted property "${property.name}"`);
    } catch (err) {
        return next(err);
    }
};

//?......... EDIT PROPERTY ..........
// load
exports.editPropertyForm = async (req, res) => {
    try {
        let property = await Property.findById(req.params.id);
        res.render("edit_property", {
            title: "Edit Property",
            property: property,
        });
    } catch (err) {
        return next(err);
    }
};

// submit
exports.editPropertySubmit = async (req, res) => {
    try {
        let property = await Property.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        console.log(property);
        res.redirect("/");
        console.log(`Updated property "${property.name}"`);
    } catch (err) {
        return next(err);
    }
};


//?..... FIND ALL PROPERTIES ........
exports.allProperties = async (req, res) => {
    try {
        const properties = await Property.find({});
        res.render("index", {
            properties: properties,
        });
    } catch (err) {
        return next(err);
    }
};

//?.... FIND SINGLE PROPERTY ........
exports.singleProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        res.render("property", {
            property: property,
        });
        console.log(`Found property "${property.name}"`);
    } catch (err) {
        return next(err);
    }
};