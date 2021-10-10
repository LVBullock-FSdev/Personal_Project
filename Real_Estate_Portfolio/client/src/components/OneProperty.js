import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from '@reach/router';
import DeleteProperty from './DeleteProperty';
import Header from './Header';

const OneProperty = (props) =>{
    const [ errors, setErrors ] = useState({});
    const [ filename, setFilename ] = useState("");
    const [ uploadedFile, setUploadedFile ] = useState({});
    const [oneProperty, setOneProperty] = useState({});

    useEffect(() =>{
        axios.get(`http://localhost:8000/api/properties/${props.id}`)
        .then((res) =>{
            console.log(res);
            console.log(res.data);
            setOneProperty(res.data);
        })
        // .catch((err) => console.log(err))
        .catch((err)=> console.log(err));
 
    }, [props.id]) //if I do not add props.id, will throw a warning.


return(
    <div>
        <Header/>

        <div className="onePropertyTableDiv">
            <table className="onePropertyTable">
                <tr></tr>
                    <td className="columnWidth" style={{width: "250px"}}><strong><u>Specifications for</u>:</strong></td>
                    <td className="columnWidth2"><strong>{oneProperty.street} <br/>{oneProperty.city}, {oneProperty.state}  {oneProperty.zip}</strong></td>
                <tr className="rowHeight"></tr> 
                    <td className="columnWidth" style={{width: "250px"}}><strong><u>Category</u>:</strong></td>
                    <td>{oneProperty.category}</td>
                <tr className="rowHeight"></tr>
                    <td className="columnWidth" style={{width: "250px"}}><strong><u>Description</u>:</strong></td>
                    <td className="columnWidth2">{oneProperty.description}</td>              
                <tr className="rowHeight"></tr>
                    <td className="columnWidth" style={{width: "250px"}}><strong><u>Opportunity Zone</u>:</strong></td>
                        {/* //this is a ternary operator */}
                        {
                            oneProperty.opportunityZone === true?
                            <td className="columnWidth" style={{width: "250px"}}>Yes</td>
                            :<td className="columnWidth" style={{width: "250px"}}>No</td>
                        }
                <tr className="rowHeight"></tr>
                    <td className="columnWidth" style={{width: "250px"}}><strong><u>Purchase Price</u>:</strong></td>
                    <td>${oneProperty && oneProperty.purchasePrice?.toLocaleString()}</td> 
                <tr className="rowHeight"></tr>
                    <td className="columnWidth" style={{width: "250px"}}><strong><u>Rehab Cost</u>:</strong></td>
                    <td>${oneProperty && oneProperty.rehabCost?.toLocaleString()}</td>
                <tr className="rowHeight"></tr>
                    <td className="columnWidth" style={{width: "250px"}}><strong><u>ARV</u>:</strong></td>
                    <td>${oneProperty && oneProperty.arv?.toLocaleString()}</td>
                <tr className="rowHeight"></tr>
                    <td className="columnWidth" style={{width: "250px"}}><strong><u>Net Profit</u>:</strong></td>
                    <td>${oneProperty && oneProperty.netProfit?.toLocaleString()}</td> 
                <tr className="rowHeight"></tr>
                    <td style={{marginLeft:"0px",display: "flex"}}>
                <Link to={`/property/edit/${oneProperty._id}`} style={{ marginRight: "5px"}}><button>EDIT</button></Link>
                <DeleteProperty id={oneProperty._id}/>
                </td>
            </table>

        </div>
 

        <div style={{borderRight: "5px solid darkgray", borderRadius: "2px", marginTop: "60px", marginLeft: "100px", padding: "0px", height: "600px", display: "inline-block", verticalAlign: "middle"}}></div>

        <div className="onePropertyImages">
            <h3>Before Restoration</h3>
            <p>Uploaded image here -- NOT happening, WHYYYYYYYY????</p>

            {uploadedFile ? (
                <h3>{ uploadedFile.fileName }</h3>,
                <img src={ uploadedFile.filePath} alt="" />
            ) : null
            }


            <h3>After Restoration</h3>
            <p>Uploaded image here -- NOT happening, WHYYYYYYYY????</p>

            {uploadedFile ? (
                <h3>{ uploadedFile.fileName }</h3>,
                <img src={ uploadedFile.filePath} alt="" />
            ) : null
            }
        </div>
    </div>
    )
}

export default OneProperty;