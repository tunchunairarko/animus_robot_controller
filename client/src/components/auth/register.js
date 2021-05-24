import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import UserContext from "../../context/UserContext";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";
// import '../assets/register-auth.css';
// import { useDidMount, useWillUnmount } from "react-hooks-lib";
import { DropdownList, DatePicker } from "react-widgets";
import { CountryDropdown } from 'react-country-region-selector';
import "react-widgets/styles.css";
import "../assets/style.css";

export default function Register() {
    // useDidMount(()=>{
    //     const bodyElt = document.querySelector("body");
    //     bodyElt.style.setProperty("background-image","url(back.png)")
    // })
    useEffect(() => {
        const bodyElt = document.querySelector("body");
        bodyElt.style.setProperty("background-image", "url(back.png)")

        return function cleanup() {
            const bodyElt = document.querySelector("body");
            bodyElt.style.setProperty("background-image", "none")
        };
    }, [])
    // useWillUnmount(()=>{
    //     const bodyElt = document.querySelector("body");
    //     bodyElt.style.setProperty("background-image","none")
    // })

    const affiliationList = [
        {"affiliation":"Doctor"},
        {"affiliation":"Nurse"},
        {"affiliation":"Caretaker"},
        {"affiliation":"Service holder"},
        {"affiliation":"Academician"},
        {"affiliation":"Therapist"},
        {"affiliation":"Logistic personnel"},
        {"affiliation":"IT support"},
        {"affiliation":"Others (relatives,friends etc)"}
    ]

    const [email, setEmail] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();
    const [displayName, setDisplayName] = useState();
    const [affiliation, setAffiliation] = useState("Doctor");
    const [institution, setInstitution] = useState();
    const [dateOfBirth, setDateOfBirth] = useState();
    const [country, setCountry] = useState();

    const [error, setError] = useState();

    const { setUserData } = useContext(UserContext);
    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();

        try {
            const newUser = { username, email, password, passwordCheck, displayName, affiliation,institution,country,dateOfBirth };
            const registerRes = await Axios.post(`/api/users/register`, newUser);
            //   console.log(registerRes);
            const loginRes = await Axios.post(`/api/users/login`, {
                username,
                password,
            });
            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user,
            });
            localStorage.setItem("auth-token", loginRes.data.token);
            history.push("/");
        } catch (err) {
            console.log(err.response.data.msg);
            err.response.data.msg && setError(err.response.data.msg);
        }
    };

    return (
        <div>
            {error && (
                <ErrorNotice message={error} clearError={() => setError(undefined)} />
            )}
            <Container className="p-3 register-form">
                <Jumbotron className="shadow-sm rounded">
                    <h1 as={Row} style={{ display: 'flex', justifyContent: 'center' }}>
                        Join Curi-O
                    </h1>
                    <Form onSubmit={submit}>
                        <Form.Row>
                            <Form.Group as={Col} controlId="register-username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter Username" onChange={(e) => setUsername(e.target.value)} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="register-email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="register-password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="register-password-check">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={(e) => setPasswordCheck(e.target.value)} />
                            </Form.Group>
                        </Form.Row>

                        <Form.Group controlId="register-full-name">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control placeholder="Enter the full name" onChange={(e) => setDisplayName(e.target.value)} />
                        </Form.Group>
                        <Form.Row>
                            <Form.Group as={Col} controlId="date-of-birth">
                                <Form.Label>Date of birth</Form.Label>
                                <DatePicker
                                    max={new Date()}
                                    placeholder="dd/mm/yyyy"
                                    value={dateOfBirth}
                                    onChange={value => setDateOfBirth(value)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="set-country">
                                <Form.Label>Country </Form.Label>
                                <CountryDropdown
                                    className="countrySelector"
                                    value={country}
                                    onChange={(val) => setCountry(val)} />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="set-affiliation">
                                <Form.Label>Affiliation/relation</Form.Label>
                                <DropdownList
                                    
                                    data={affiliationList}
                                    textField='affiliation'
                                    filter='contains'
                                    value={affiliation}
                                    onChange={value => setAffiliation(value)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="set-institution">
                                <Form.Label>Institution</Form.Label>
                                <Form.Control placeholder="" onChange={(e) => setInstitution(e.target.value)} />
                            </Form.Group>
                        </Form.Row>
                        <Button variant="primary" type="submit" size="lg" value="Register" block>
                            Submit
                        </Button>
                    </Form>
                </Jumbotron>
            </Container>
        </div>
    );
}
