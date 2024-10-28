import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import About from "./../About/About";
import Contact from "./../Contact/Contact";
import Home from "./../Home/Home";
import "./HeaderStyle.scss";

function Header(){
    return(
        <BrowserRouter>
        <header>
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/about">About</Link>
            </li>
            <li>
                <Link to="/contact">Contact</Link>
            </li>
        </ul>
        </header>
        {/* Routes - é o container das rotas */}
        <Routes>
            {/* Para cada rota usamos um Route */}
            <Route path="/" element={<Home/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/contact" element={<Contact/>} />
        </Routes>
        </BrowserRouter>

    )
}
export default Header;