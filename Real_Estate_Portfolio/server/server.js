//SET UP SERVER IN THIS ORDER,  ORDER MATTERS.

require("dotenv").config() // for login & registration

// const express = require("express", "express-fileUpload");
const express = require('express');
const cors = require('cors'); //if not here, will have a lot of errors
const cookieParser = require("cookie-parser");
const app = express(); //ensure that the express method is running

// const fs = require('fs');
// const path = require('path');
// const formidable = require('formidable');

// const fileUpload = require("express-fileupload");
// const bodyParser = require('body-parser');

app.use(express.json());
// app.use(fileUpload());
//allows express to pass json easily from the frontend to the backend
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    //connected to user information enables us to validate who is logging in, posting, etc.
    credentials: true,
     //allow from this origin, which is the frontend
    origin: "http://localhost:3000" 
})) 

app.use(cookieParser());

app.post("/api/upload", (req, res) => {
    if(req.images === null) {
        return res.status(400).json({msg: "No file uploaded"});
    }

    const images = req.files.images;

    images.mv(`${__dirname}, /Real_Estate_Portfolio/client/public/uploads/${images.name}`, err => {
        if(err){
            console.log.error(err);
            return res.status(500).send(err);
        }

        res.json({ fileName: images.name, filePath: `/Real_Estate_Portfolio/client/public/uploads/${images.name}`});
    });
});

// //allow mongoose.config to run
//comment out these 2 lines until needed
//--after we have set up the mongoose.config.js file
require('./config/mongoose.config');
//--after setting this in the portfolio.routes.js file
require('./routes/property.routes')(app);
//--after setting this in the portfolio.routes.js file
require('./routes/user.routes')(app);

//allows express to listen at 8000 port
app.listen(process.env.MY_PORT, () => //process.env.MY_PORT comes from .env file
//successful connection will show this message in the terminal
console.log(`You have successfully connected to port ${process.env.MY_PORT}`));