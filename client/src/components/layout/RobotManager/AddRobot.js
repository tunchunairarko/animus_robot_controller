import React, { useState, useEffect, Fragment } from 'react'
import { Form, Row, Col, Button, Card } from 'react-bootstrap';
import { FaBroom, FaUpload, FaClock, FaInfoCircle } from 'react-icons/fa';
import "../../../components/assets/style.css";
import { useCookies } from "react-cookie";
import Multiselect from "react-widgets/Multiselect";
import "react-widgets/styles.css";
import DashCard from "./DashCard"
import SocketioLogo from "../../assets/Socket-io.png"
import AnimusSocketioLogo from "../../assets/animus-socketio.png"
import AnimusRobotModal from "./AnimusRobotModal"


export default function AddRobot() {
    const allModalities = [
        "emotion",
        "motor",
        "speech",
        "voice",
        "tactile",
        "homeostasis",
        "proprioception",
        "audition",
        "vision",
        "reminder",
        "teleconference"
    ]
    const [show, setShow] = useState(false);
    const [cookies] = useCookies(["user"]);
    const [connectionType, setConnectionType] = useState()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [robotName, setRobotName] = useState("");
    const [robotId, setRobotId] = useState("");
    const [robotLocation, setRobotLocation] = useState("");
    const [inputChannels, setInputChannels] = useState([]);
    const [outputChannels, setOutputChannels] = useState([]);
    const [additionalOperations, setAdditionalOperations] = useState(['teleconference', 'homeostatis', 'proprioception', 'reminder']);

    const handleClose = (currentRobotData,loaderVisible) => {
        currentRobotData.robotlist=undefined;
        loaderVisible=true;
        if(loaderVisible===true){
            setShow(false);
        }
    };
    const handleShow = () => {setShow(true)};

    const setUserChosenRobotData = (robot) =>{
        setRobotName(robot.robot_name)
        setRobotLocation(robot.location)
        setRobotId(robot.robot_id)
        setInputChannels(robot.input_channels)
        setOutputChannels(robot.output_channels)        
    }
    const handleConnection = (email,password) => {
        setEmail(email)
        setPassword(password)
        if(email && password){
            handleShow();
        }        
    };
    return (
        <Fragment>
            <div class="robot-container">
                <Card className="dashboard-box-design mt-3">
                    <Card.Header className="dashboard-box-design-card-header">Step 1: Choose connection type</Card.Header>

                    <Row style={{ marginLeft: '0.5%', marginRight: '1%', marginTop: '1%', marginBottom: '1%' }}>
                        <Col md="6">
                            <Card className="robot-card-stats" onClick={() => setConnectionType('Animus')}>
                                <Card.Body align="right">
                                    <Row>
                                        <Col className="col-5">
                                            <Card.Img
                                                align="left"
                                                src={AnimusSocketioLogo}
                                                className="dashboard-card-img"
                                                alt="Card image cap"
                                            />
                                        </Col>
                                        <Col className="col-7">
                                            <div className="numbers">
                                                <Card.Title className="dashboard-card-title">Animus+Socketio</Card.Title>
                                                <Card.Subtitle className="dashboard-card-subtitle">Shared operation channels</Card.Subtitle>
                                                <small className="text-muted"><FaInfoCircle /> This connection will share operations between an Animus channel and a Socketio channel. The socketio codes need to be installed in the host robot </small>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card.Body>
                                {/* <Card.Footer className="dashboard-card-footer">
                                <small className="text-muted"><FaClock /> Active </small>
                            </Card.Footer> */}

                            </Card>
                        </Col>


                        <Col md="6">
                            <Card disabled className="robot-card-stats-inactive ">
                                <Card.Body align="right">
                                    <Row>
                                        <Col className="col-5">
                                            <Card.Img
                                                align="left"
                                                src={SocketioLogo}
                                                className="dashboard-card-img"
                                                alt="Card image cap"
                                            />
                                        </Col>
                                        <Col className="col-7">
                                            <div className="numbers">
                                                <Card.Title className="dashboard-card-title">Socketio</Card.Title>
                                                <Card.Subtitle className="dashboard-card-subtitle">Dedicated operation channels</Card.Subtitle>
                                                <small className="text-muted"><FaClock /> Coming soon. </small>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card.Body>
                                {/* <Card.Footer className="dashboard-card-footer">
                                <small className="text-muted"><FaClock /> Coming soon. </small>
                            </Card.Footer> */}

                            </Card>

                        </Col>
                    </Row>

                </Card>
                {connectionType === "Animus" ?
                    <Fragment>
                        <Card className="dashboard-box-design mt-3">
                            <Card.Header className="dashboard-box-design-card-header">Step 2: Enter animus credentials</Card.Header>
                            <Card.Body>
                                <Form>
                                    <Form.Group as={Row} controlId="titleText">
                                        <Form.Label column sm="2">
                                            Animus Email
                                </Form.Label>
                                        <Col sm="10">
                                            <Form.Control type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="upcText">
                                        <Form.Label column sm="2">
                                            Animus Password
                                        </Form.Label>
                                        <Col sm="10">
                                            <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                        </Col>
                                    </Form.Group>


                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Col sm="6" className="mt-2">
                                            <Button variant="primary" block onClick={() => handleConnection(email,password)}><FaUpload /> Connect </Button>
                                        </Col>
                                        <Col sm="6" className="mt-2">
                                            <Button variant="secondary" block ><FaBroom /> Clear All </Button>
                                        </Col>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Card>
                        <Card className="dashboard-box-design mt-3">
                            <Card.Header className="dashboard-box-design-card-header">Step 3: Robot details (generated automatically)</Card.Header>
                            <Card.Body>
                                <Form>
                                    <Form.Group as={Row} controlId="titleText">
                                        <Form.Label column sm="2">
                                            Robot name
                                        </Form.Label>
                                        <Col sm="4">
                                            <Form.Control value={robotName} onChange={(e) => setRobotName(e.target.value)} />
                                        </Col>
                                        <Form.Label column sm="2">
                                            Robot ID
                                        </Form.Label>
                                        <Col sm="4">
                                            <Form.Control value={robotId} onChange={(e) => setRobotId(e.target.value)} />
                                        </Col>
                                        <Form.Label column sm="2" className="mt-2">
                                            Location
                                        </Form.Label>
                                        <Col sm="4" className="mt-2">
                                            <Form.Control value={robotLocation} onChange={(e) => setRobotLocation(e.target.value)} />
                                        </Col>
                                        <Form.Label column sm="2" className="mt-2">
                                            Input channels
                                        </Form.Label>
                                        <Col sm="4" className="mt-2">
                                            {/* <Form.Control value={inputChannels} onChange={(e) => setInputChannels(e.target.value)} /> */}
                                            <Multiselect
                                                readOnly
                                                data={allModalities}
                                                value={inputChannels}
                                                // allowCreate="onFilter"
                                                // onCreate={handleInputCreate}
                                                onChange={setInputChannels}
                                            />
                                        </Col>
                                        <Form.Label column sm="2" className="mt-2">
                                            Output channels
                                        </Form.Label>
                                        <Col sm="4" className="mt-2">
                                            <Multiselect
                                                readOnly
                                                data={allModalities}
                                                value={outputChannels}
                                                // allowCreate="onFilter"
                                                // onCreate={handleInputCreate}
                                                onChange={setOutputChannels}
                                            />
                                        </Col>
                                        <Form.Label column sm="2" className="mt-2">
                                            Additional operations
                                        </Form.Label>
                                        <Col sm="4" className="mt-2">
                                            {/* <Form.Control placeholder="Set additional operations which will run internally (separate by comma)" value={additionalOperations} onChange={(e) => setAdditionalOperations(e.target.value)} /> */}
                                            <Multiselect
                                                readOnly
                                                data={allModalities}
                                                value={additionalOperations}
                                                // allowCreate="onFilter"
                                                // onCreate={handleInputCreate}
                                                onChange={setAdditionalOperations}
                                            />
                                        </Col>
                                        <Col sm="6" className="mt-2">
                                            <Button variant="primary" block ><FaUpload /> Register robot </Button>
                                        </Col>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Card>
                        <AnimusRobotModal email={email} password={password} show={show} handleClose={handleClose} onRobotChosen={setUserChosenRobotData} />
                    </Fragment>
                    :
                    <Fragment></Fragment>
                }
            </div>
        </Fragment>
    )
}
