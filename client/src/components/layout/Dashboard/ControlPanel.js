import React, { Fragment, useState } from 'react'
import { Card, Col, Button, Row, Badge, ToggleButton, ButtonGroup, OverlayTrigger, Tooltip, Popover, Form, ProgressBar } from 'react-bootstrap'
import { FaArrowAltCircleDown, FaArrowAltCircleRight, FaArrowCircleLeft, FaArrowCircleUp, FaMinusCircle, FaRedo, FaStopCircle, FaUndo, FaHeartbeat, FaTemperatureHigh } from 'react-icons/fa';
import { MdGames, MdRefresh, MdSend } from "react-icons/md";
import { AiFillApi, AiOutlineDisconnect, AiFillInfoCircle } from "react-icons/ai";
import { RiSensorFill } from "react-icons/ri";
import { GiHeartOrgan, GiStabbedNote, GiAerialSignal } from "react-icons/gi";
import { DropdownList, DatePicker } from "react-widgets";

export default function ControlPanel({ keyboardNav, setKeyboardNav, history,setPrescriptionMsg, setPrescriptionType,prescriptionType, prescriptionSchedule, setPrescriptionSchedule,handleNewPrescription,obstacleAv,setObstacleAv,setClickVal,handleDisconnect,handleConnect }) {
    
    const [dummyRoomData, setDummyRoomData] = useState(
        [
            { "item": "Medication" },
            { "item": "Diet" },
            { "item": "Therapy" },
            { "item": "General advice" }
        ]
    )
    const [vitalData,setVitalData] = useState()
    const onRefreshClicked = () => {
        // history.push("/dashboard")
        document.location.reload()
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
                            <Button className="ml-1 mr-1" variant="outline-primary" size="md" onMouseDown={()=>setClickVal("left")}  onMouseUp={()=>setClickVal(0)}><FaArrowCircleLeft /></Button>
                            <Button className="ml-1 mr-1" variant="outline-primary" size="md" onMouseDown={()=>setClickVal("forward")}  onMouseUp={()=>setClickVal(0)}><FaArrowCircleUp /></Button>
                            <Button className="ml-1 mr-1" variant="outline-primary" size="md" onMouseDown={()=>setClickVal("right")}  onMouseUp={()=>setClickVal(0)}><FaArrowAltCircleRight /></Button>
                        </Col>
                        <Col sm="6" className="center-content mt-2">
                            <Button className="ml-1 mr-1" variant="outline-light" size="md" disabled><FaMinusCircle /></Button>
                            <Button className="ml-1 mr-1" variant="outline-primary" size="md" onMouseDown={()=>setClickVal("head_up")}  onMouseUp={()=>setClickVal(0)}><FaArrowCircleUp /></Button>
                            <Button className="ml-1 mr-1" variant="outline-light" size="md" disabled><FaMinusCircle /></Button>
                        </Col>
                        <Col sm="6" className="center-content  mt-2">
                            <Button className="ml-1 mr-1" variant="outline-primary" size="md" onMouseDown={()=>setClickVal("rotate_left")}  onMouseUp={()=>setClickVal(0)}><FaUndo /></Button>
                            <Button className="ml-1 mr-1" variant="outline-danger" size="md" onMouseDown={()=>setClickVal("nullmotion")}  onMouseUp={()=>setClickVal(0)}><FaStopCircle /></Button>
                            <Button className="ml-1 mr-1" variant="outline-primary" size="md" onMouseDown={()=>setClickVal("rotate_right")}  onMouseUp={()=>setClickVal(0)}><FaRedo /></Button>
                        </Col>

                        <Col sm="6" className="center-content mt-2">
                            <Button className="ml-1 mr-1" variant="outline-primary" size="md" onMouseDown={()=>setClickVal("head_left")}  onMouseUp={()=>setClickVal(0)}><FaArrowCircleLeft /></Button>
                            <Button className="ml-1 mr-1" variant="outline-light" size="md" disabled><FaMinusCircle /></Button>
                            <Button className="ml-1 mr-1" variant="outline-primary" size="md" onMouseDown={()=>setClickVal("head_right")}  onMouseUp={()=>setClickVal(0)}><FaArrowAltCircleRight /></Button>
                        </Col>
                        <Col sm="6" className="center-content mt-2">

                        </Col>
                        <Col sm="6" className="center-content mt-2">
                            <Button className="ml-1 mr-1" variant="outline-light" size="md" disabled><FaMinusCircle /></Button>
                            <Button className="ml-1 mr-1" variant="outline-primary" size="md" onMouseDown={()=>setClickVal("head_down")}  onMouseUp={()=>setClickVal(0)}><FaArrowAltCircleDown /></Button>
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
                                <Button variant="success" className="ml-1 mr-1" onClick={()=>handleConnect()}><AiFillApi /></Button>
                            </OverlayTrigger>
                            <OverlayTrigger placement="top" overlay={<Tooltip >Disconnect</Tooltip>}>
                                <Button variant="danger" className="ml-1 mr-1" onClick={()=>handleDisconnect()}><AiOutlineDisconnect /></Button>
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
                                    <ToggleButton checked={obstacleAv} value="2" onChange={(e) => setObstacleAv(e.currentTarget.checked)} type="checkbox" className="ml-1 mr-1" variant="outline-info" size="md"><RiSensorFill /></ToggleButton>
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
                                            <Col sm="12" className="mt-2">
                                                <ProgressBar animated now={45} />
                                            </Col>
                                            <Col sm="12" className="mt-2 center-content">
                                                <p>{vitalData}</p>
                                            </Col>

                                        </Popover.Content>
                                    </Popover>
                                }>
                                <Button variant="outline-info" className="ml-1 mr-1" onClick={onRefreshClicked}><GiAerialSignal /> Measure vitals</Button>
                            </OverlayTrigger>
                            <OverlayTrigger
                                placement="top"
                                trigger="click"
                                key="prescribe"
                                overlay={
                                    <Popover id="prescribe" >
                                        <Popover.Title as="h3">Prescribe medicine or guidelines</Popover.Title>
                                        <Popover.Content >
                                            <Col sm="12" className="mt-2">
                                                <DropdownList
                                                    defaultValue="Medication"
                                                    data={dummyRoomData}
                                                    textField='item'
                                                    value={prescriptionType}
                                                    onChange={(value)=>setPrescriptionType(value.item)}
                                                />
                                            </Col>
                                            <Col sm="12" className="mt-2">
                                                <DatePicker
                                                value={prescriptionSchedule}
                                                onChange={value => setPrescriptionSchedule(value)} 
                                                defaultValue={prescriptionSchedule} 
                                                includeTime 
                                                />
                                            </Col>
                                            <Col sm="12" className="mt-2">
                                                <Form.Group controlId="prescriptionDetails">
                                                    <Form.Control
                                                    placeholder="Enter prescription details" 
                                                    as="textarea" 
                                                    rows={3} 
                                                    onChange={(e)=>setPrescriptionMsg(e.target.value)}/>
                                                </Form.Group>
                                            </Col>
                                            <Col sm="12" className="mt-2">
                                                <Button variant="outline-info" block onClick={()=>handleNewPrescription()}><MdSend /> Send to the robot </Button>
                                            </Col>
                                        </Popover.Content>
                                    </Popover>
                                }>
                                <Button variant="outline-info" className="ml-1 mr-1"><GiStabbedNote /> Prescribe </Button>
                            </OverlayTrigger>


                        </Col>

                    </Row>

                </Card.Body>
            </Card >
        </Fragment>
    )
}
