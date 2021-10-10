import React, { useState } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
// const fs = require('fs');
// const path = require('path');
// const multer = require('multer');

// const imgModel = require('./model'); //where does this go????


const Form = (props) =>{

    const [ images, setImages ] = useState("");
    const [ filename, setFilename ] = useState("");
    const [ uploadedFile, setUploadedFile ] = useState({});
    const [ propertyList, setPropertyList] = useState([]);


    // submit handler will either = editPropertyHandler ORRR newSubmitHandler
    // based upon which value it was given when it was passed as a prop. 
    const {submitHandler, buttonText, property, setProperty, errors} = props;


    
  const fileSelectedHandler = (e) => {
    setImages(e.target.files[0]);
    // setFilename(e.target.files[0].name); //this is showing the uploaded file name before the "choose file button"
  };


    //THIS IS NOT WORKING FOR IMAGE UPLOAD.  How do I get the image.model??
    // const storage = multer.diskStorage({
    //     destination: (req, file, cb) => {
    //         cb(null, 'uploads')
    //     },
    //     filename: (req, file, cb) => {
    //         cb(null, file.fieldname + '-' + Date.now())
    //     }
    // });
  
    // const upload = multer({ storage: storage });

    // axios.get('/', (req, res) => {
    //     imgModel.find({}, (err, items) => {
    //         if (err) {
    //             console.log(err);
    //             res.status(500).send('An error occurred', err);
    //         }
    //         else {
    //             res.render('imagesPage', { items: items });
    //         }
    //     });
    // })
    
    // axios.post('/', upload.single('image'), (req, res, next) => {
      
    //     const obj = {
    //         name: req.body.name,
    //         desc: req.body.desc,
    //         img: {
    //             data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
    //             contentType: 'image/png/jpeg'
    //         }
    //     }
    //     imgModel.create(obj, (err, item) => {
    //         if (err) {
    //             console.log(err);
    //         }
    //         else {
    //             // item.save();
    //             res.redirect('/');
    //         }
    //     });
    // });    

   //ABLE TO GET THE SELECT IMAGE BUT NOT UPLOADING
  const uploadHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("images", images);

    try {
      const res = await axios.post("/upload", formData, {
          headers: {
              "Content-Type": "multipart/form-data"
          }
      });

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });
      console.log(`${ uploadedFile }, File uploaded successfully!`);
    }
    catch(err){
        if(err.response.status === 500) {
            console.log("There was a problem with the server!");
        }
        
        else{
            console.log("UPLOAD FAILED!");
            console.log(err);
            console.log(err.response.data);
        }
    }
}
    
    // keeps us from needing to repeat
    const newChangeHandler = (e)=>{
        //how will this account for both of it's parents?
        let newStateObject = {...property};
        //REMEMBER: different input types (text, checkbox, radio, etc) require use of different attributes
        // (e.g. "checked, value, valueAsNumber, etc").
        // If we tried to use e.target.value for the checkbox, it would not return our boolean.
        // TEST THIS and mess around with this with console logs of e, e.target and e.target.value. 
        // Search through these logs and use the right attribute for the right situation!
        if(e.target.type === "checkbox"){
            console.log(e.target.name, e.target.checked);
            newStateObject[e.target.name] = e.target.checked;
        }
        else{
            console.log(e.target.name, e.target.value);
            newStateObject[e.target.name] = e.target.value;
        }
        console.log(e.target);
        setProperty(newStateObject);
    }

    return(
        //will equal editPropertyHandler ORRR newSubmitHandler
        //depending on which component is rendering and sending it down
    <form onSubmit={submitHandler}>
    <div className="container">
    <div>
        <div className="blankLine">
            <label className="formLeftAlign" htmlFor="type"><strong><u>Category</u>:  </strong></label>
                <select style={{fontSize: "18px"}} onChange={newChangeHandler} name="category" value={property.category} >
                    <option value="none" defaultValue hidden>Select Category</option>
                    <option value="Fix & Flip">Fix & Flip</option>
                    <option value="Buy & Hold">Buy & Hold</option>
                    <option value="Wholesale">Wholesale</option>
                </select>
                {
                    errors.category ?
                    //change to className error-text
                    <span style={{backgroundColor: "yellow", color: "red"}}>{errors.category.message}
                    </span>
                    : null
                }
        </div>
    </div>

    <div className="formLeft">
        <div className="blankLine">
            <label htmlFor="opportunityZone"><strong><u>Opportunity Zone</u>: </strong></label>
            <input style={{width: "20px", height: "20px"}} onChange={newChangeHandler} name="opportunityZone" type="checkbox" checked={property.opportunityZone} />
            {
                errors.opportunityZone ?
                //change to className error-text
                <span style={{backgroundColor: "yellow", color: "red"}}>{errors.opportunityZone.message}</span>
                : null
            }
        </div>
    </div>

        <div>
            <div className="blankLine">
                <label htmlFor="location"><strong><u>Location</u>:  </strong></label>
            </div>
        </div>

        <div className="horizontalAlignment">
            <label htmlFor="street"><strong>Street  </strong></label>
            <input onChange={newChangeHandler} name="street" placeholder="Enter Street Address." type="text" value={property.street} />
            {
                errors.street ?
                //change to className error-text
                <span style={{backgroundColor: "yellow", color: "red"}}>{errors.street.message}
                </span>
                : null
            }
        </div>

        <div className="horizontalAlignment">
            <label htmlFor="city"><strong>City  </strong></label>
            <input onChange={newChangeHandler} name="city" placeholder="Enter City." type="text" value={property.city} />
            {
                errors.city ?
                //change to className error-text
                <span style={{backgroundColor: "yellow", color: "red"}}>{errors.city.message}
                </span>
                : null
            }
        </div>

        <div  className="horizontalAlignment">
            <label htmlFor="type"><strong>State  </strong></label>
            <select style={{fontSize: "18px"}} onChange={newChangeHandler} name="state" value={property.state} >
                <option value="none" defaultValue hidden>Select State</option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District Of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
            </select>
            {
                errors.state ?
                //change to className error-text
                <span style={{backgroundColor: "yellow", color: "red"}}>{errors.state.message}
                </span>
                : null
            }
        </div>

        <div className="horizontalAlignment">
            <label htmlFor="zip"><strong>Zip  </strong></label>
            <input style={{width: "100px"}} onChange={newChangeHandler} name="zip" placeholder="Enter Zip" type="number" value={property.zip} />
            {
                errors.zip ?
                //change to className error-text
                <span style={{backgroundColor: "yellow", color: "red"}}>{errors.zip.message}
                </span>
                : null
            }
        </div>

        <div>
            <div className="blankLine" style={{marginTop: "20px"}}>
                <label htmlFor="description"><strong><u>Property Description</u>:  </strong></label>
            </div>
        </div>

        <div className="blankLine">
            <textarea onChange={newChangeHandler} style={{fontSize: "18px", marginLeft: "40px"}} name="description" placeholder="Please enter a thorough description of this property." cols="80" rows="5" value={property.description} />
            {
                errors.description ?
                //change to className error-text
                <span style={{backgroundColor: "yellow", color: "red"}}>{errors.description.message}
                </span>
                : null
            }
        </div>

        <div className="horizontalAlignment2">
            <label htmlFor="purchasePrice"><strong><u>Purchase Price</u>:  </strong></label>

            <input onChange={newChangeHandler} name="purchasePrice" placeholder="$0,000,000" type="number" pattern="$^\$\d{1,3}(,\d{3})?$" value={property.purchasePrice} data-type="currency"/>
            {
                errors.purchasePrice ?
                //change to className error-text
                <span style={{backgroundColor: "yellow", color: "red"}}>{errors.purchasePrice.message}
                </span>
                : null
            }
        </div>


        <div className="horizontalAlignment2">
            <label htmlFor="rehabCost"><strong><u>Rehab Cost</u>:  </strong></label>
            <input onChange={newChangeHandler} name="rehabCost" placeholder="$0,000,000" type="number" pattern="^\$\d{1,3}(,\d{3})?$" value={property.rehabCost} data-type="currency"/>
            {
                errors.rehabCost ?
                //change to className error-text
                <span style={{backgroundColor: "yellow", color: "red"}}>{errors.rehabCost.message}
                </span>
                : null
            }
        </div>


        <div className="horizontalAlignment2">
            <label htmlFor="arv"><strong><u>ARV</u>:  </strong></label>
            <input className="currency" onChange={newChangeHandler} name="arv" placeholder="$0,000,000" type="number" pattern="^\$\d{1,3}(,\d{3})?$" value={property.arv} data-type="currency"/>
            {
                errors.arv ?
                //change to className error-text
                <span style={{backgroundColor: "yellow", color: "red"}}>{errors.arv.message}
                </span>
                : null
            }
        </div>


        <div className="horizontalAlignment2">
            <label htmlFor="netProfit"><strong><u>Net Profit</u>:  </strong></label>
            <input className="currency" onChange={newChangeHandler} name="netProfit" placeholder="$0,000,000" type="number" pattern="^\$\d{1,3}(,\d{3})?$" value={property.netProfit} data-type="currency"/>
            {
                errors.netProfit ?
                //change to className error-text
                <span style={{backgroundColor: "yellow", color: "red"}}>{errors.netProfit.message}
                </span>
                : null
            }
        </div>
        <div className="blankLine">
        </div>      

        <div className="horizontalAlignmentImages">
                <label htmlFor="beforeImages"><strong><u>Before Images</u>:  </strong>
                    { filename }</label>
                <input style={{ border: "none", backgroundColor: "lightgray", marginRight: "30px"}} onChange={ fileSelectedHandler } type="file" name={images}/>
                {
                    errors.beforeImages ?
                    //change to className error-text
                    <span style={{backgroundColor: "yellow", color: "red"}}>{errors.beforeImages.message}
                    </span>
                    : null
                }
            </div>

            <div className="horizontalAlignmentImages">
                <label htmlFor="afterImages"><strong><u>After Images</u>:  </strong>
                    { filename }</label>
                <input style={{ border: "none", backgroundColor: "lightgray"}} onChange={ fileSelectedHandler } type="file" name={images}/>
                

                <button className="uploadBtn" onClick={uploadHandler} style={{height: "30px", backgroundColor: "black", color: "white"}}>Upload</button>
                {
                    errors.afterImages ?
                    //change to className error-text
                    <span style={{backgroundColor: "yellow", color: "red"}}>{errors.afterImages.message}
                    </span>
                    : null
                }
            </div>


            {/* <div className="horizontalAlignmentImages">
                <label htmlFor="beforeImages"><strong><u>Before Images (select file)</u>:  </strong></label>
                <input onChange={newChangeHandler} name="beforeImages" type="file" value={property.beforeImages}/>
                {
                    errors.beforeImages ?
                    //change to className error-text
                    <span style={{backgroundColor: "yellow", color: "red"}}>{errors.beforeImages.message}
                    </span>
                    : null
                }
            </div>  */}

            {/*<div className="horizontalAlignmentImages">
                <label htmlFor="beforeImages"><strong><u>After Images (select file)</u>:  </strong></label>
                <input onChange={newChangeHandler} name="afterImages" type="file" value={property.afterImages}/>
                {
                    errors.afterImages ?
                    //change to className error-text
                    <span style={{backgroundColor: "yellow", color: "red"}}>{errors.afterImages.message}
                    </span>
                    : null
                }
            </div> */}




        <div className="blankLine">
        <button className="submitBtn" >{buttonText}</button>
        </div>

</div>

    </form>



    )

}

export default Form;