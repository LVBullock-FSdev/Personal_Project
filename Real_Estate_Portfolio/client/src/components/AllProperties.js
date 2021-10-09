import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, navigate } from '@reach/router';
import Header from './Header';
import DeleteProperty from './DeleteProperty';
import _ from 'lodash';

const AllProperties = (props) =>{
    const [ errors, setErrors ] = useState({});

    //set state for list of all properties
    const [ propertyList, setPropertyList] = useState([]);
    const [ property, setProperty ] = useState([]); 
    const [ isAscendingOrder, setIsAscendingOrder] = useState([propertyList]);
    // const propertyList.category = [propertyList.category];

    //useEffect renders when the page loads and when the state changes
    //all of this in useEffect is an asynchronous operation
    useEffect(() => {
        axios.get('http://localhost:8000/api/properties',
        AllProperties,
        {
            withCredentials: true
        })
            .then((res) =>{
                console.log(res);
                console.log(res.data);
                console.log(_.isEmpty(res.data));  //returns true or false
                setPropertyList(res.data);
            })
            .catch((err)=> {
                console.log(err);
                console.log(err.response.data.errors);
                if(err.response.status === 401){
                    console.log("No user logged in.  Invalid Attempt to Edit")
                    navigate("/");
                }
                if(err.response.data.errors){
                    setErrors(err.response.data.errors);
                }
            })

    }, [])

        //sorting with lodash.com
        // const orderByHandler = (e) => {
        //     let categories = [property.category];
        //     _.orderBy(categories, [property.category], ['asc'], ['desc']);
        // };

    const orderByHandler = (e) => {
        let orderBy = e.currentTarget.name;
        let orderList = propertyList;

        if(orderBy === "name"){
            if(!isAscendingOrder.name)
                orderList = _.orderBy(propertyList, ['category'], ['desc'])
            else
                orderList = _.orderBy(propertyList, ['category'], ['asc'])
            setIsAscendingOrder({...setIsAscendingOrder, name:!isAscendingOrder.name});
        }
        console.log(orderList);
        setPropertyList(orderList);
    };

    return(
        <body>

        <div className="body">
            <Header/>
            <h3>Inventory of Properties </h3>
            <table className="table-sortable" style={{borderCollapse: "collapse", width: "100%"}} >
                <thead>
                    <th className="transparentCell" scope="col" style={{border: "0px solid white"}}></th>
                    <th className="location" colSpan="4">Location</th>
                    <th className="transparentCell" style={{borderRight: "0px"}} scope="col"></th>
                    <th className="transparentCell" scope="col"></th>
                    <th className="transparentCell" scope="col"></th>
                    <th className="transparentCell" scope="col"></th>
                    <th className="transparentCell" scope="col"></th>
                    <th className="transparentCell" scope="col"></th>
                    <tr className="tableHeadRow2">
                        <th name={property.category}><button onclick={ orderByHandler } className="headerRowBtn">Category<small>&#9660;&#9650;</small> </button></th>
                        <th>Street Address</th>
                        <th>City</th>
                        <th name="state">State<small>&#9660;&#9650;</small></th>
                        <th name="zip">Zip<small>&#9660;&#9650;</small></th>
                        <th name="opportunityZone">Opportunity Zone <small>&#9660;&#9650;</small></th>
                        <th>Purchase<br/>Price</th>
                        <th>Rehab<br/>Cost</th>
                        <th>ARV</th>
                        <th name="netProfit">Net<small>&#9660;&#9650;</small><br/> Profit</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                    <tbody>
                    {
                        propertyList.map((property, index) => (
                            <tr key={index}>
                                <td style={{textAlign: "center"}}>{property.category}</td>
                                <td><Link to={`/property/${property._id}`}>{property.street}</Link></td>
                                <td>{property.city}</td>
                                <td style={{width: "10px", textAlign: "center"}}>{property.state}</td>
                                <td>{property.zip}</td>
                                <td style={{width: "10px", textAlign: "center"}}>
                                    {/* //this is a ternary operator */}
                                    {
                                        property.opportunityZone === true?
                                        <p style={{boxShadow: "2px 2px 3px"}}><strong>&#x2611;</strong></p>
                                        :<p style={{boxShadow: "2px 2px 3px"}}><strong>&#x2610;</strong></p>
                                    }
                                </td>
                                <td>${property.purchasePrice.toLocaleString()}</td>
                                <td>${property.rehabCost.toLocaleString()}</td>
                                <td>${property.arv.toLocaleString()}</td>
                                <td>${property.netProfit.toLocaleString()}</td>
                                <td style={{border: "0px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                    <Link to={`/property/edit/${property._id}`}><button>EDIT</button></Link>&nbsp;
                                    <DeleteProperty 
                                        id={property._id} 
                                        propertyList={propertyList} 
                                        setPropertyList={setPropertyList}
                                    />
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
            </table>
        </div>
    </body>
    )
}

export default AllProperties;