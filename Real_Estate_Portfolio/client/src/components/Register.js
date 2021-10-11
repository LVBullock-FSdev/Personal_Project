import React, { useState} from "react";
import axios from "axios";
import {navigate} from "@reach/router";

const Register = props => {
    const [confirmReg, setConfirmReg] = useState("");
    const [unsuccessfulReg, setunsuccessfulReg] = useState("");
    const [errs, setErrs] = useState({});

    //using a single state object to hold all data!
    const [user, setUser] = useState({
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    //using a single function to update the state object
    //we can use the input's name attribute as the key in to the object
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const register = e => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/users/register",
            user,  //the user state is already an object with the correct keys and values!
            {
                //this will force the sending of the credentials / cookies so they can be updated
                //XMLHttpREquest from a different domain cannot set cookie values for their own domain
                //unless withCredentials is set to true before making the request
                withCredentials: true,
            })

            .then(res => {
                console.log(res.data);
                //when we successfully created the account, reset state for registration form
                //We do this if we are NOT navigating automatically away from the page
                setUser({
                    userName: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                })
                setConfirmReg(`Thank you for registering, ${user.userName}.  You can now log in.`);
                setErrs({}); //remember to reset errors state if it was successful
            })
            .catch((err) =>{
                console.log(err);
                console.log(err.response.data.errors);
                console.log("Email and or User Name not available!");
                if(err.response.data.errors){
                    setunsuccessfulReg("Email not available!");
                    setErrs(err.response.data.errors);
                }
                navigate("/");
            });
    };

    return (
        <div>
            <h2>Register</h2>
            {
                unsuccessfulReg ?
                <h4 style={{backgroundColor: "yellow", color: "red", textAlign: "center"}}>{unsuccessfulReg}</h4>
                : null
            }
            {
                confirmReg ?
                    <h4 style={{backgroundColor: "mediumSpringGreen", color: "green", textAlign: "center"}}>{confirmReg}</h4>
                    : null
            }
            <form className="regLogForm" onSubmit={register}>
                <div>
                    <label>User Name</label>

                    {
                        errs.userName ?
                            <span className="error-text"> { errs.userName.message }</span>
                            : null
                    }
                    <input
                        type="text"
                        name="userName"
                        value={user.userName}
                        onChange={(e) => handleChange(e)}
                    />
                </div>



                <div>
                    <label>Email</label>
                    {
                        errs.email ?
                            <span className="error-text"> { errs.email.message }</span>
                            : null
                    }
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={ handleChange }
                    />
                </div>



                <div>
                    <label>Password</label>
                    {
                        errs.password ?
                            <span className="error-text"> { errs.password.message }</span>
                            : null
                    }
                    <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={ handleChange }
                    />
                </div>



                <div>
                    <label>Confirm Password</label>
                    {
                        errs.confirmPassword ?
                            <span className="error-text"> { errs.confirmPassword.message }</span>
                            : null
                    }
                    <input
                        type="password"
                        name="confirmPassword"
                        value={user.confirmPassword}
                        onChange={ handleChange }
                    />
                </div>



                <div className="center">
                    <button type="submit">Register</button>
                </div>

            </form>
        </div>
    )
}

export default Register;


//resource:  MERN-PT-AUG2021 W8D1:Log/Reg/Auth