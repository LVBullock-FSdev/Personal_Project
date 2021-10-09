const UserController = require("../controllers/user.controller");

//We are exporting an arrow function with a parameter of app that contains 5 statements.
//We import in server.js like this:  require("./routes/User.routes")(app);

module.exports = (app) => {
    app.post('/api/users/register', UserController.register);
    app.post('/api/users/login', UserController.login);
    app.post('/api/users/logout', UserController.logout);
}