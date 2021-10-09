//configure connection with mongo using mongoose
const mongoose = require("mongoose");
//database name
const dbName = "properties"; 

//need to install software, walkthrough on the platform.  Test the you're connected to mongo in terminal
mongoose.connect("mongodb://localhost/" + dbName, {
    //allows us to use the most updated way with Mongo (no depreciation)
    useNewUrlParser: true,
    //also allows us to use the latest
    useUnifiedTopology: true
})
    //add the promise
    .then(() => {
        //be sure to use back tick, not single or double quotes
        console.log(`You are connected to the ${dbName} database!`);
    })

    .catch((err) =>{
        //be sure to use back tick, not single or double quotes
        console.log(`There was an error connecting to the ${dbName} database!`);
        console.log(err);
    })

    //do not have to export this one