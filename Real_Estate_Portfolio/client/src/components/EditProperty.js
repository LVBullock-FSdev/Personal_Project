import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
import Form from '../components/Form';
import Header from './Header';

const EditProperty = (props) =>{
    const [ errors, setErrors ] = useState({});

    const [ editedProperty, setEditedProperty ] = useState ({

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

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/properties/${props.id}`)
        .then((res)=>{
            console.log(res.data);
            setEditedProperty(res.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    }, [])

    const editPropertyHandler = (e)=>{
        e.preventDefault();
        axios.put(`http://localhost:8000/api/properties/${props.id}`,
        editedProperty
        )
        .then((res)=>{
            console.log(res);
            console.log(res.data);
            navigate('/property');
        })
        .catch((err)=>{
            console.log(err);
            console.log(err.response.data.errors);
            setErrors(err.response.data.errors);
        })  
    }

    return(
        <div>
            <Header/>

                <div>
                <h3>Editing: {editedProperty.street}, {editedProperty.city}, {editedProperty.state}  {editedProperty.zip}</h3>
                    <Form 
                    submitHandler = { editPropertyHandler } 
                    buttonText="UPDATE"
                    property = { editedProperty }
                    setProperty = { setEditedProperty }
                    errors = { errors }
                    />

                </div>
                
        </div>
    )
}

export default EditProperty;