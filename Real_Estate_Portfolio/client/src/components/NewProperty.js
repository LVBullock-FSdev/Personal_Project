import React, { useState } from 'react';
import axios from 'axios';
import {navigate } from '@reach/router';
import Form from '../components/Form';
import Header from './Header';

const NewProperty = (props) =>{
    const [ errors, setErrors ] = useState({});
    const [ newProperty, setNewProperty] = useState ({

        //helps get rid of the uncontrolled input
        //allows us to set the type ahead of time to prevent bugs
        category: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        opportunityZone: true,
        description: "",
        purchasePrice: "",
        rehabCost: "",
        arv: "",
        netProfit: "",
        beforeImages: "",
        afterImages: ""

    })

    const newSubmitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/properties',
        //request body that the back-end is asking for in the controller
        newProperty,
        {
            withCredentials: true
        })
        .then((res) => {
            console.log(res);
            console.log(res.data);
            navigate('/property');
        })
        .catch((err) => {
            console.log(err);
            console.log(err.response.data.errors);
            if(err.response.status === 401){
                navigate("/");
            }
            if(err.response.data.errors){
                console.log("No user logged in.  Invalid Attempt to Add a new entry.")
                setErrors(err.response.data.errors);
            }
        })
    }

    return(
        <div>
        <Header />
            <h4>All fields below are required.  Please enter the specifications for the property.</h4>
            <Form 
            submitHandler = { newSubmitHandler }
            buttonText="SUBMIT"
            property = { newProperty }
            setProperty = { setNewProperty }
            errors = { errors }
            />
        </div>
    )
}

export default NewProperty;