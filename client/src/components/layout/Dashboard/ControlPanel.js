import React, { Fragment } from 'react'
import { Card, Col, Button, Row, Badge, ToggleButton, ButtonGroup, OverlayTrigger, Tooltip, Popover } from 'react-bootstrap'
import { FaArrowAltCircleDown, FaArrowAltCircleRight, FaArrowCircleLeft, FaArrowCircleUp, FaMinusCircle, FaRedo, FaStopCircle, FaUndo, FaHeartbeat, FaTemperatureHigh } from 'react-icons/fa';
import { MdGames, MdRefresh } from "react-icons/md";
import { AiFillApi, AiOutlineDisconnect, AiFillInfoCircle } from "react-icons/ai";
import { RiSensorFill } from "react-icons/ri";
import { GiHeartOrgan } from "react-icons/gi";

export default function ControlPanel({ keyboardNav, setKeyboardNav, history }) {

    const onRefreshClicked = () => {
        console.log("hi")
        history.push("/dashboard")
    }
    return (
        <Fragment>
            <Card className="dashboard-box-design mb-3" >
                <Card.Header className="dashboard-box-design-card-header">Control panel</Card.Header>
                <Card.Body>
                    <Row >
                        <Col sm="6" className="center-content">
                            <Badge variant="primary">
                                Body
                        </Badge>
                        </Col>
                        <Col sm="6" className="center-content">
                            <Badge variant="primary">
                                Head
                        </Badge>
                        </Col>
                        <Col sm="6" className="center-content mt-2">

                            <Button className="ml-1 mr-1" variant="outline-primary" size="md"><FaArrowCircleLeft /></Button>
                            <Button className="ml-1 mr-1" variant="outline-primary" size="md"><FaArrowCircleUp /></Button>
                            <Button className="ml-1 mr-1" variant="outline-primary" size="md"><FaArrowAltCircleRight /></Button>
                        </Col>
                        <Col sm="6" className="center-content mt-2">
                            <Button className="ml-1 mr-1" variant="outline-light" size="md" disabled><FaMinusCircle /></Button>
                            <Button className="ml-1 mr-1" variant="outline-primary" size="md"><FaArrowCircleUp /></Button>
                            <Button className="ml-1 mr-1" variant="outline-light" size="md" disabled><FaMinusCircle /></Button>
                        </Col>
                        <Col sm="6" className="center-content  mt-2">
                            <Button className="ml-1 mr-1" variant="outline-primary" size="md"><FaUndo /></Button>
                            <Button className="ml-1 mr-1" variant="outline-danger" size="md"><FaStopCircle /></Button>
                            <Button className="ml-1 mr-1" variant="outline-primary" size="md"><FaRedo /></Button>
                        </Col>

                        <Col sm="6" className="center-content mt-2">
                            <Button className="ml-1 mr-1" variant="outline-primary" size="md"><FaArrowCircleLeft /></Button>
                            <Button className="ml-1 mr-1" variant="outline-danger" size="md"><FaStopCircle /></Button>
                            <Button className="ml-1 mr-1" variant="outline-primary" size="md"><FaArrowAltCircleRight /></Button>
                        </Col>
                        <Col sm="6" className="center-content mt-2">

                        </Col>
                        <Col sm="6" className="center-content mt-2">
                            <Button className="ml-1 mr-1" variant="outline-light" size="md" disabled><FaMinusCircle /></Button>
                            <Button className="ml-1 mr-1" variant="outline-primary" size="md"><FaArrowAltCircleDown /></Button>
                            <Button className="ml-1 mr-1" variant="outline-light" size="md" disabled><FaMinusCircle /></Button>
                        </Col>
                    </Row>

                </Card.Body>
            </Card >
            <Card className="dashboard-box-design mb-3" >

                <Card.Body>
                    <Row >
                        <Col sm="12" className="center-content">
                            <OverlayTrigger placement="top" overlay={<Tooltip >Connect </Tooltip>}>
                                <Button variant="success" className="ml-1 mr-1"><AiFillApi /></Button>
                            </OverlayTrigger>
                            <OverlayTrigger placement="top" overlay={<Tooltip >Disconnect</Tooltip>}>
                                <Button variant="danger" className="ml-1 mr-1"><AiOutlineDisconnect /></Button>
                            </OverlayTrigger>
                            <OverlayTrigger placement="top" overlay={<Tooltip >Refresh stream</Tooltip>}>
                                <Button variant="outline-info" className="ml-1 mr-1" onClick={onRefreshClicked}><MdRefresh /></Button>
                            </OverlayTrigger>
                            <OverlayTrigger placement="top" overlay={<Tooltip >Activate/disactivate keyboard navigation</Tooltip>}>
                                <ButtonGroup toggle >
                                    <ToggleButton checked={keyboardNav} value="1" onChange={(e) => setKeyboardNav(e.currentTarget.checked)} type="checkbox" className="ml-1 mr-1" variant="outline-info" size="md"><MdGames /></ToggleButton>
                                </ButtonGroup>
                            </OverlayTrigger>
                            <OverlayTrigger placement="top" overlay={<Tooltip >Allow obstacle avoidance (default is on). Robot will stop before collision</Tooltip>}>
                                <ButtonGroup toggle >
                                    <ToggleButton checked={keyboardNav} value="1" onChange={(e) => setKeyboardNav(e.currentTarget.checked)} type="checkbox" className="ml-1 mr-1" variant="outline-info" size="md"><RiSensorFill /></ToggleButton>
                                </ButtonGroup>
                            </OverlayTrigger>
                            <OverlayTrigger placement="top" overlay={<Tooltip >Help</Tooltip>}>
                                <Button variant="outline-info" className="ml-1 mr-1" onClick={onRefreshClicked}><AiFillInfoCircle /></Button>
                            </OverlayTrigger>
                        </Col>

                        <Col sm="12" className="center-content mt-2">
                            <OverlayTrigger
                                placement="top"
                                trigger="click"
                                key="takeMeasurement"
                                overlay={
                                    <Popover id="takeMeasurement" >
                                        <Popover.Title as="h3">Take Vital Measurement</Popover.Title>
                                        <Popover.Content >
                                            <Col sm="12">
                                                <OverlayTrigger placement="top" overlay={<Tooltip >Measure pulse rate</Tooltip>}>
                                                    <Button variant="outline-info" className="mt-1 mr-1 ml-1 mb-1" ><FaHeartbeat /> </Button>
                                                </OverlayTrigger>
                                                <OverlayTrigger placement="top" overlay={<Tooltip >Measure temperature</Tooltip>}>
                                                    <Button variant="outline-info" className="mt-1 mr-1 ml-1 mb-1"><FaTemperatureHigh /> </Button>
                                                </OverlayTrigger>
                                                <OverlayTrigger placement="top" overlay={<Tooltip >Measure blood pressure</Tooltip>}>
                                                    <Button variant="outline-info" className="mt-1 mr-1 ml-1 mb-1" ><GiHeartOrgan /> </Button>
                                                </OverlayTrigger>



                                            </Col>

                                        </Popover.Content>
                                    </Popover>
                                }>
                                <Button variant="outline-info" className="ml-1 mr-1" onClick={onRefreshClicked}><AiFillInfoCircle /> Measure vitals</Button>
                            </OverlayTrigger>
                            <OverlayTrigger
                                placement="top"
                                trigger="click"
                                key="prescribe"
                                overlay={
                                    <Popover id="prescribe" >
                                        <Popover.Title as="h3">Prescribe medicine or guidelines</Popover.Title>
                                        <Popover.Content >
                                            <Col sm="12">
                                                <Button variant="outline-info" className="mt-1 " onClick={onRefreshClicked}><AiFillInfoCircle /> Measure blood pressure</Button>
                                            </Col>
                                            <Col sm="12">
                                                <Button variant="outline-info" className="mt-1 " onClick={onRefreshClicked}><AiFillInfoCircle /> Measure heart rate</Button>
                                            </Col>
                                            <Col sm="12">
                                                <Button variant="outline-info" className="mt-1 " onClick={onRefreshClicked}><AiFillInfoCircle /> Measure temperature</Button>
                                            </Col>
                                        </Popover.Content>
                                    </Popover>
                                }>
                                <Button variant="outline-info" className="ml-1 mr-1" onClick={onRefreshClicked}><AiFillInfoCircle /> Prescribe </Button>
                            </OverlayTrigger>


                        </Col>

                    </Row>

                </Card.Body>
            </Card >
        </Fragment>
    )
}
