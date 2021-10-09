import React from 'react';
import axios from 'axios';
import { Link, navigate } from '@reach/router';

const Header = (props) =>{

    const logout = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/users/logout",{
            //no body required for this request
        }, {
            withCredentials: true,
        })
        .then((res) => {
            console.log(res.data);
            console.log("User has logged out.");
            navigate("/");
        })
        .catch(err => {
            console.log(err);
        });
    };

    return(
        <header>
            <ul>
                <button className="headerBtn"><Link to="/properties"><li>Properties List</li></Link></button>
                <button className="headerBtn"><Link to="/property/new"><li>New Property</li></Link></button>
                <button className="headerLogoutBtn" onClick={logout}><li>Logout</li></button>
            </ul>
            <h1>Real Estate Portfolio</h1>

        </header>
    )
}

export default Header;