import React, {useContext} from 'react'
//import { Link } from "react-router-dom"
import AuthOptions from "../../auth/AuthOptions";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
//import NavDropdown from 'react-bootstrap/NavDropdown';
import UserContext from "../../../context/UserContext";
import Logo from '../../assets/logo.png';
import '../../assets/style.css';

export default function Header() {
    const { userData } = useContext(UserContext);
    return (
        
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            {userData.user ? (
                <Navbar.Brand href="/"><Image src={Logo} className="logo"/></Navbar.Brand>
            ):(
                <Navbar.Brand href="/login"><Image src={Logo} className="logo"/></Navbar.Brand>
            )}
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    
                </Nav>
                <Nav>
                    <AuthOptions></AuthOptions>
                    {/* <Nav.Link href="#deets">More deets</Nav.Link>
                    <Nav.Link eventKey={2} href="#memes">
                        Dank memes
                    </Nav.Link> */}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
