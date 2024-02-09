import { Link } from "react-router-dom";
import React from "react";

export default function Navbar(){
    return(
        // Match the route to the link 
        <>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
        </>
    );
}