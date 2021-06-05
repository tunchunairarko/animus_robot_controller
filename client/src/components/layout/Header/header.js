import React, { Fragment, useContext } from 'react'
import AuthOptions from "../../auth/AuthOptions";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
// import UserContext from "../../../context/UserContext";
import Logo from '../../assets/logo.png';
import '../../assets/style.css';

export default function Header() {

    return (
        <Fragment>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="/login"><Image src={Logo} className="logo" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">

                    </Nav>
                    <Nav>
                        <AuthOptions></AuthOptions>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

        </Fragment>

    )
}
