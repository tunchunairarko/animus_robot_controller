import React, {useState, useEffect, Fragment} from 'react'
import ModuleHeader from "../ModuleHeader/ModuleHeader";
import {  Form,  Row, Col, Button,  Card, ButtonGroup, Dropdown } from 'react-bootstrap';
import { FaBroom, FaDumpsterFire, FaUpload } from 'react-icons/fa';
import "../../../components/assets/style.css";
import { useCookies } from "react-cookie";

export default function RobotSettings() {
    const [cookies] = useCookies(["user"]);
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    

    return (
        <Fragment>
            <ModuleHeader moduleName={"Robot Settings"}/>
            <Card className="box-design mt-3">
                <Row className="ml-3 pr-3 mt-3">
                    
                    <Col xs={12} sm={12}>
                        <Form>
                            <Form.Group as={Row} controlId="titleText">
                                <Form.Label column sm="2">
                                    Animus Email
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control type="email" placeholder="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="upcText">
                                <Form.Label column sm="2">
                                    Animus Password
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                                </Col>
                            </Form.Group>

                            
                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                <Col sm="6" className="mt-2">
                                    <Button variant="info" block ><FaUpload /> Save credentials </Button>
                                </Col>
                                <Col sm="6" className="mt-2">
                                    <Button variant="secondary" block ><FaBroom /> Clear All </Button>
                                </Col>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Card>
        </Fragment>
    )
}
