const Property = require("../models/property.model");

module.exports = {

    //get all documents from the "properties" collection
    //and return an array of "property" documents (js objects)

    //get all documents from the "properties" collection and return an array of the "property" documents
    //GET
    findAllProperties: (req, res) => {
        console.log("Displaying all properties!");
        //use the model to conect to the collection and find/return all documents
        Property.find({})  //find all documents.  don't filter anythin out
        .then((allProperties) =>{
            res.json(allProperties);
        })
        .catch((err) => {
            console.log("Get all properties failed");
            res.status(400).json(err);
        })
    },

    //CRUD (Create, Read, Update, Destroy)
    //CREATE - POST  (using POST)
    createNewProperty:(req, res) => {
        console.log("New property successfully added.");
        Property.create(req.body)
        .then((newProperty) => res.json(newProperty))
        
        .catch((err) => {
            console.log("Create New Property failed");
            res.status(400).json(err)
        })
    },
    
    //READ - GET
    findOneProperty: (req, res) => {
        console.log("Displaying property.");

        //id will come to use from the param/url/route call   (using GET)         /api/properties/:id
        Property.findOne({ _id: req.params.id })      
        .then((oneProperty) =>res.json(oneProperty))
        .catch((err) => {
            console.log("Find One Property failed");
            res.status(400).json(err)            
        })
    },
    
    //UPDATE - PUT
    updateProperty: (req, res) => {

        console.log("Property successfully updated.");

        //id will come to use from the param/url/route call  (using PUT)          /api/properties/:id
        Property.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true, runValidators: true }
        )

            .then(updatedProperty => res.json({ updatedProperty }))
            .catch((err) => {
                console.log("Update Property failed");
                res.status(400).json(err)            
            });
    },
    
    //DESTROY - DELETE
    deleteProperty: (req, res) => {
        console.log("Property successfully deleted.");
        //id will come to use from the param/url/route call   (using DELETE)         /api/properties/:id  similar to findOne, but change to delete
        Property.deleteOne({ _id: req.params.id })      
        .then((deletedProperty) =>res.json(deletedProperty))
        .catch((err) => {
            console.log("Delete Property failed", err);
            res.status(400).json(err)            
        })
    }    
}