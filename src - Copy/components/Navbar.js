import React from 'react'
import { Link , useLocation  } from "react-router-dom";



const Navbar = () => {
    let location = useLocation();
    React.useEffect(() => {
        //console.log(location);
        console.log(location.pathname);
      }, [location]);


    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to="#">Navbar</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className={`nav-link ${location.pathname ==="/"? "active" :""}`} to="/">Home </Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link ${location.pathname ==="/about"? "active" :""}`} to="/about">About</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link ${location.pathname ==="/consultants"? "active" :""}`} to="/consultants">Consultants</Link>
                    </li>

                    <li className="nav-item">
                        <Link className={`nav-link ${location.pathname ==="/clients"? "active" :""}`} to="/clients">Clients</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link ${location.pathname ==="/products/products"? "active" :""}`} to="/products">Products</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link ${location.pathname ==="/inspectors"? "active" :""}`} to="/inspectors">Inspectors</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link ${location.pathname ==="/inspections"? "active" :""}`} to="/inspections">Inspections</Link>
                    </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
        </nav>
    )
}

export default Navbar
