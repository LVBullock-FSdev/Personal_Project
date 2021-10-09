const PropertyController = require("../controllers/property.controller");

//We are exporting an arrow function with a parameter of app that contains 5 statements.
//We import in server.js like this:  require("./routes/property.routes")(app);

module.exports = (app) => {
    app.get('/api/properties', PropertyController.findAllProperties);
    app.post('/api/properties', PropertyController.createNewProperty);
    app.get('/api/properties/:id', PropertyController.findOneProperty);
    app.put('/api/properties/:id', PropertyController.updateProperty);
    app.delete('/api/properties/:id', PropertyController.deleteProperty);
}