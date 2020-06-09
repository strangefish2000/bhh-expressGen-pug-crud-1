//* PROPERTIES CONTROLLER: propertiesController

// connect to Property model
const Property = require("../models/property");

//?........ ADD NEW PROPERTY ........
// load new property form
exports.addPropertyForm = function (req, res) {
    res.render("add_property", {
        title: "Add Property",
    });
};
//* no call to db so no async / await

// submit new property
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

// load delete form
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

// submit delete form
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
// load edit form
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

// submit edit form
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
// find all properties
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
// find single property
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