import React from 'react';
import { Link } from 'react-router-dom';
import useToken from '../useToken.js';
import SearchBarComponent from "./SearchBar.Component";


const Navbar = ()=>{
    const { token } = useToken();



    return(
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
            <h1 className="navbar-brand" style={{"fontSize": "500%"}}>FemtoGram</h1>
            <div className="collapse navbar-collapse">
                {
                    token?(<ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/" className="nav-link">HomePage</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/profile" className="nav-link">Profile</Link>
                        </li>
                        <li className={"navbar-item"}>
                            <Link to={"/logout"} className={"nav-link"}> Log out </Link>
                        </li>
                        <li>
                            <SearchBarComponent token={token}/>
                        </li>
                    </ul>):""
                }
            </div>

        </nav>
    )
}
export default Navbar;