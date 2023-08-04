import React, { useContext, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";



const Navbar = () => {
    let location = useLocation();
    React.useEffect(() => {
        //console.log(location);
        console.log(location.pathname);
    }, [location]);
    const loggedIn = localStorage.getItem('token');

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            {/*<div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    Dropdown button
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><Link className="dropdown-item" href="#">Action</Link></li>
                    <li><Link className="dropdown-item" href="#">Another action</Link></li>
                    <li><Link className="dropdown-item" href="#">Something else here</Link></li>
                </ul>
    </div>
            <Link className="navbar-brand" to="#">Navbar</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
*/}
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    {loggedIn == null && ( 
                        <li className="nav-item active">
                            <Link className={`nav-link ${location.pathname === "/owners/login" ? "active" : ""}`} to="/owners/login" >Login </Link>
                        </li>
                    )}
                    {loggedIn !== null && ( 
                    <li className="nav-item active">
                        <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/" onClick={ () => localStorage.removeItem('token')}>Log Out </Link>
                    </li>
                    )}
                    {loggedIn !== null && ( 
                    <li className="nav-item active">
                        <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/">Home </Link>
                    </li>
                    )}
                    <li className="nav-item">
                        <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                    </li>
                    {loggedIn !== null && ( 
                    <li className="nav-item dropdown">
                        <Link className={`nav-link ${location.pathname === "/consultants" ? "active" : ""}`} to="/consultants">Consultants</Link>
                        <ul class="dropdown-menu">
                            <li> <Link className="dropdown-item " to="/consultants/addconsultant">Add Consultants </Link></li>                           
                            <li> <Link className="dropdown-item" to="/consultants"> List Consultants </Link></li>
                            <li> <Link className="dropdown-item" to="#"> Export </Link></li>
                            <li> <Link className="dropdown-item" to="#"> Import &raquo;</Link></li>
                        </ul>
                    
                    </li>
                    )}
                    {loggedIn !== null && ( 
                    <li className="nav-item dropdown">
                        <Link className={`nav-link ${location.pathname === "/clients/clients" ? "active" : ""}`} to="/clients/clients">Clients</Link>
                        <ul class="dropdown-menu">
                            <li> <Link className="dropdown-item " to="/clients/addclient">Add Clients </Link></li>                           
                            <li> <Link className="dropdown-item" to="/clients"> List Clients </Link></li>
                            <li> <Link className="dropdown-item" to="#"> Export </Link></li>
                            <li> <Link className="dropdown-item" to="#"> Import &raquo;</Link></li>
                        </ul>

                    </li>
                    )}
                   
                  {loggedIn !== null && ( 
                    <li className="nav-item  dropdown">
                        <Link className={`nav-link dropdown-toggle ${location.pathname === "/products/addproduct" ? "active" : ""}`} to="#">Products</Link>

                        <ul class="dropdown-menu">
                            <li> <Link className="dropdown-item " to="/products/addproduct">Add Products </Link></li>                           
                            <li> <Link className="dropdown-item" to="/products/products"> List Products </Link></li>
                            <li> <Link className="dropdown-item" to="#"> Export </Link></li>
                            <li> <Link className="dropdown-item" to="#"> Import &raquo;</Link></li>
                        </ul>

                    </li>
                    )}
                    {loggedIn !== null && ( 
                    <li className="nav-item dropdown">
                        <Link className={`nav-link ${location.pathname === "/inspectors/inspectors" ? "active" : ""}`} to="/inspectors/inspectors">Inspectors</Link>
                        <ul class="dropdown-menu">
                            <li> <Link className="dropdown-item " to="/inspectors/addinspector">Add Inspectors </Link></li>                           
                            <li> <Link className="dropdown-item" to="/inspectors/"> List Products </Link></li>
                            <li> <Link className="dropdown-item" to="#"> Export </Link></li>
                            <li> <Link className="dropdown-item" to="#"> Import &raquo;</Link></li>
                        </ul>
                    
                    </li>
                    )}
                    {loggedIn !== null && ( 
                    <li className="nav-item dropdown">
                        <Link className={`nav-link ${location.pathname === "/inspections" ? "active" : ""}`} to="/inspections">Inspections</Link>
                        <ul class="dropdown-menu">
                            <li> <Link className="dropdown-item " to="/inspections/addinspection">Add Inspection </Link></li>                           
                            <li> <Link className="dropdown-item" to="/inspections/"> List Inspections </Link></li>
                            <li> <Link className="dropdown-item" to="#"> Export </Link></li>
                            <li> <Link className="dropdown-item" to="#"> Import &raquo;</Link></li>
                        </ul>
                    </li>
                    )}



{loggedIn !== null && ( 
                    <li className="nav-item dropdown">
                        <Link className={`nav-link ${location.pathname === "/users/users" ? "active" : ""}`} to="/users/users">Users</Link>
                        <ul class="dropdown-menu">
                            <li> <Link className="dropdown-item " to="/users/adduser">Add Users </Link></li>                           
                            <li> <Link className="dropdown-item" to="/users"> List Users </Link></li>
                            <li> <Link className="dropdown-item" to="#"> Export </Link></li>
                            <li> <Link className="dropdown-item" to="#"> Import &raquo;</Link></li>
                        </ul>

                    </li>
                    )}

{loggedIn !== null && ( 
                    <li className="nav-item dropdown">
                        <Link className={`nav-link ${location.pathname === "/usertype/usertype" ? "active" : ""}`} to="/usertype/usertype">UserTypes</Link>
                        <ul class="dropdown-menu">
                            <li> <Link className="dropdown-item " to="/usertype/addusertypeform">Add User Type </Link></li>                           
                          
                            <li> <Link className="dropdown-item" to="/usertype"> List User Types </Link></li>
                            <li> <Link className="dropdown-item" to="#"> Export </Link></li>
                            <li> <Link className="dropdown-item" to="#"> Import &raquo;</Link></li>
                        </ul>

                    </li>
                    )}







{loggedIn !== null && ( 
                    <li className="nav-item">
                        <Link className={`nav-link ${location.pathname === "/owners/myprofile" ? "active" : ""}`} to="/owners/myprofile">My Profile</Link>
                    </li>
                    )}
                </ul>
           {/*     <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form> */}
            </div>
            {/*<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="#">Navbar</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
      <ul className="navbar-nav">
        <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" to="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </Link>
          <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
            <li><Link className="dropdown-item" to="#">Action</Link></li>
            <li><Link className="dropdown-item" to="#">Another action</Link></li>
            <li><Link className="dropdown-item" to="#">Something else here</Link></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>*/}
        </nav>




    )
}

export default Navbar
