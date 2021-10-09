const mongoose = require ("mongoose");

//set up schema
const PropertySchema = new mongoose.Schema({
    category: { 
        type: String,
        required: [true, "Category is required."],
        enum: [
            "Fix & Flip",
            "Buy & Hold",
            "Wholesale"
        ]
    },

    street: {
        type: String,
        required: [true, "Street is required."],
        minLength:[3, "Must be at least 3 characters long!"]
    },

    city: {
        type: String,
        required: [true, "City is required."],
        minLength:[3, "Must be at least 3 characters long!"]
    },

    state: {
        type: String,
        required: [true, "State is required."],
        enum: [    
            "AL",
            "AK",
            "AZ",
            "AR",
            "CA",
            "CO",
            "CT",
            "DE",
            "DC",
            "FL",
            "GA",
            "HI",
            "ID",
            "IL",
            "IN",
            "IA",
            "KS",
            "KY",
            "LA",
            "ME",
            "MD",
            "MA",
            "MI",
            "MN",
            "MS",
            "MO",
            "MT",
            "NE",
            "NV",
            "NH",
            "NJ",
            "NM",
            "NY",
            "NC",
            "ND",
            "OH",
            "OK",
            "OR",
            "PA",
            "PR",
            "RI",
            "SC",
            "SD",
            "TN",
            "TX",
            "UT",
            "VT",
            "VI",
            "VA",
            "WA",
            "WV",
            "WI",
            "WY"
        ]
    },

    zip: {
        type: Number,
        required: [true, "Zip Code is required."],
        min: [5]
    },

    opportunityZone: {
        type: Boolean,
    },

    description: {
        type: String,
        required: [true, "Description is required."],
        minLength:[3, "Description must be at least 3 characters long!"]
    },

    purchasePrice: {
        type: Number,
        required: [true, "Purchase Price is required."],
        min: [1]
        },

    rehabCost: {
        type: Number,
        required: [true, "Rehab Cost is required."],
        min:[3]
    },

    arv: {
        type: Number,
        required: [true, "ARV is required."],
        min:[3]
    },
    
    netProfit: {
        type: Number,
        required: [true, "Net Profit is required."],
        min:[3]
    },

    beforeImages:{
        type: String,
    },

    afterImages:{
        type: String,
    }


//timestamps automatically create "createdAt" and "updatedAt" date and time info for each document
//every time a document is updated, it will change the "updatedAt"
}, { timestamps: true });

//Model is a combination of the collectionName and Schema
//Name will be collection name that is held in the db
//schema is going to be singular of what will show as plural in the db
const Property = mongoose.model("Property", PropertySchema);
//This returns a product model with the collection name and that schema

module.exports = Property;