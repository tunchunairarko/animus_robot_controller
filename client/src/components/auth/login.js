
import React, { useState, useContext,useEffect,Fragment } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "../assets/Dashboard.scss";
import { useCookies } from "react-cookie";
import Header from "../layout/Header/header";

export default function Login() {
    const [cookies, setCookie] = useCookies(["user"]);
    const { userData,setUserData } = useContext(UserContext);
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();


    const history = useHistory();
    useEffect(() => {
        
        const bodyElt = document.querySelector("body");
        bodyElt.style.setProperty("background-image", "url(back.png)")

        return function cleanup() {
            const bodyElt = document.querySelector("body");
            bodyElt.style.setProperty("background-image", "none")
        };
    }, [])
    
    

    const submit = async (e) => {
        e.preventDefault();
        try {
            const loginUser = { username, password };
            const loginRes = await Axios.post(
                `/api/users/login`,
                loginUser
            );
            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user,
            });
            setCookie("username", loginRes.data.user.username, {
                path: "/"
            });

            setCookie("email", loginRes.data.user.email, {
                path: "/"
            });
            setCookie("displayName", loginRes.data.user.displayName, {
                path: "/"
            });
            localStorage.setItem("auth-token", loginRes.data.token);
            history.push("/");
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    };
    return (
        <Fragment>
            <Header/>
            <Container className="p-3 login-form" >
                <Jumbotron>
                    {error && (
                        <ErrorNotice message={error} clearError={() => setError(undefined)} />
                    )}
                    <h1>
                        HWU Telepresence LOGIN
                    </h1>
                    <Form onSubmit={submit}>
                        <Form.Group controlId="formUserName">
                            <Form.Label>User name</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)}/>

                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                        </Form.Group>
                        <Form.Text className="text-muted">
                            Your access credentials are secured.
                        </Form.Text>
                        <Button variant="primary" type="submit" size="lg" block>
                            Login
                        </Button>
                    </Form>
                </Jumbotron>
            </Container>
        </Fragment>
    );
}
