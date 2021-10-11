const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
//if you have an issue with bcrypt use this instead
//https://newbedev.com/error-installing-bcrypt-with-npm
//be sure to --> npm install --save bcryptjs && npm uninstall --save bcrypt <-- on the server, see the resource link above
//const bcrypt = require("bcrypjs");

const UserSchema = new mongoose.Schema({

    userName: {
        type: String,
        required: [true, "User Name is required"],
        minLength: [5, "User Name MUST be at least 5 characters"]
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        minLength: [5, "User Name MUST be at least 5 characters"]
    }, 

    password: {
        type: String,
        required: [true,"Password is required"],
        minLength: [8, "Password MUST be at least 8 characters"]
    },
}, {timestamps: true})

//timestamps automatically create "createdAt" and "updatedAt" date and time info for each document
//every time a document is updated, it will change the "updatedAt"


//Virtual Field to confirm the password
    //stores information from or request, but will not be saved to the collection/db
    // (need confirm password, but not storing it)
UserSchema.virtual("confirmPassword")
    .get(() => this._confirmPassword) //only need _ here (in this file)
    .set((value) => this._confirmPassword = value)


//Adding Middleware:  Middleware affects or aids in the middle of a process
UserSchema.pre("validate", function(next){ //checks to see if password = confirm password
    //no _ because of line 37, we named it
    //similar when we use id instead of _id in req.params
    console.log("inside of validate");

    if(this.password !== this.confirmPassword){
        this.invalidate("confirmPassword", "PASSWORDS MUST MATCH!")
        console.log("passwords did not match");
    }
    console.log(this.password, this.confirmPassword);
    next();
}) 

UserSchema.pre("save", function(next){
    console.log("inside of pre save");
    //encrypt the password BEFORE it is saved to the database
    //Remember, we know they match from the middleware above
    bcrypt.hash(this.password, 10) 
    //10 is the number of times the password will be salted for security (think of like shuffling a deck of cards).  Salting is adding some value to the password in addition to the hashing process ("Seasoning the password")
        .then((hashedPassword) => {
            //give our password the value of the returned hash
            console.log("inside of hash");
            this.password = hashedPassword;
            next();
        })
});


//Model is a combination of the collectionName and Schema
//Name will be collection name that is held in the db
//schema is going to be singular of what will show as plural in the db
const User = mongoose.model("User", UserSchema);
//This returns a product model with the collection name and that schema

// UserSchema.statics.emailExists = async function(email){ //don't know how to incorporate this

//     if(!email){
//        throw new Error('Invalid Email'); 
//     } 
//     try{
//     const user = await this.findOne({email})
//         if(user){
//             return false 
//         } 
//         else{
//             return true; 
//         }
//     }
//     catch (error) {
//         console.log('error inside emailExists method', error.message);
//         return false
//     }

// }

module.exports = User;


//see MERN-PT-AUG2021 W8D1: Log/Reg/Auth