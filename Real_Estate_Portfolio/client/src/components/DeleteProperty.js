import React, { useState } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';


const DeleteProperty = (props) =>{

    const [ errors, setErrors ] = useState({});

    const {id, propertyList, setPropertyList} = props;

    //filter method
    const deleteFilter = (id) => {
        let newList = propertyList.filter((property) => 
        property._id !== id);
        setPropertyList(newList);
    }

    const deleteHandler = (e) => {
        axios.delete(`http://localhost:8000/api/properties/${id}`,       
        {
            withCredentials: true
        })
        .then((res) =>{
            console.log(res.data); 
            //filter method
            if(propertyList){
                console.log("Setting delete state");
                deleteFilter(id);   
            }
            else{
                console.log("Failed to Filter");

                navigate('/');
            }
        })
        .catch((err) => {
            console.log(err);
            console.log(err.response.data.errors);
            if(err.response.status === 401){
                console.log("No user logged in.  Invalid Attempt to Delete")
                navigate("/");
            }
            if(err.response.data.errors){
                setErrors(err.response.data.errors);
            }
    })
}

    return(
        <div>
            <button className="deleteBtn" onClick={deleteHandler}>DELETE</button>
        </div>
    )
}

export default DeleteProperty;