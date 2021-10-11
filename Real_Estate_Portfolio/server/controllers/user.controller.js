const User = require('../models/user.model');
const bcrypt = require('bcrypt');
//if you have an issue with bcrypt use this instead
//https://newbedev.com/error-installing-bcrypt-with-npm
//be sure to --> npm install --save bcryptjs && npm uninstall --save bcrypt <-- on the server, see the resource link above
//const bcrypt = require("bcrypjs");
const jwt = require('jsonwebtoken');


module.exports = {
    
    register: (req, res) => {
        console.log("inside of register");
        console.log(req.body);

        //use the request data and the User model constructor to create a user object
        const user = new User(req.body);
        //information is already in the instance of THIS object. no need to pass anything in.
        //save is an instance method.  Does not require anything passed in.
        //create is static and takes the object as the parameter.

        user.save()
            .then((newUser) => {
                console.log(newUser);
                console.log(newUser.userName + " Has successfully registered");
                res.json({
                    successMessage: "Thank you for registering!",
                    user: newUser
                })
            })
            .catch((err) => {
                console.log("UNSUCCESSFUL registration!");
                res.status(400).json(err);
                res.json({
                    unsuccessfulMessage: "Email not available!"
                })
                console.log(err);
            })
    },

    login: (req, res) => {
        //check to see if user is inside of the database
        User.findOne({email: req.body.email})
            .then((userRecord) => {
                //check if the returned object is null
                if(userRecord === null){ //email not found
                    res.status(400).json({message:  "Invalid Login Attempt"})
                }
                else{
                    //email is found
                    //compare req.body.email to fields in the collection
                    bcrypt.compare(req.body.password, userRecord.password) //salt both 10x .. return promise BOOLEAN
                    .then((isPasswordValid) => {
                        if(isPasswordValid){
                            console.log("Password is valid");

                            //using the cookie
                            res.cookie("userToken", 
                                jwt.sign({
                                    //payload is the data the we want to save
                                    user_id: userRecord._id,
                                    email: userRecord.email
                                },
                                //we need a key to sign and hash cookie's data = JWT_SECRET from .env file
                                process.env.JWT_SECRET),
                                //need configuration values specifically for the cookie
                                {//configuration settings for this cookie (option)
                                    httpOnly: true,
                                    expires: new Date(Date.now() + 90000000)
                                }
                            )
                            .json({
                                message: "Successfully Logged In",
                                userLoggedIn: userRecord.userName  
                            })
                        }
                        else {
                            res.status(400).json({message: "Invalid Email and/or Password"})//do not specify for security
                            console.log("Invalid password or email")
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        res.status(400).json({message: "Invalid Login Attempt"});
                    })
                }
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json({message: "Invalid Login Attempt"});
            })         
    },

    logout: (req, res) => {
        console.log("User has logged out");
        res.clearCookie("userToken");
        res.json({
            message: "User successfully logged out!"
        })
    }
}