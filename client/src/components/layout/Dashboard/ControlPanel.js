import React, { Fragment, useState } from 'react'
import { Card, Col, Button, Row, Badge, ToggleButton, ButtonGroup, OverlayTrigger, Tooltip, Popover, Form, ProgressBar } from 'react-bootstrap'
import { FaArrowAltCircleDown, FaArrowAltCircleRight, FaArrowCircleLeft, FaArrowCircleUp, FaMinusCircle, FaRedo, FaStopCircle, FaUndo, FaHeartbeat, FaTemperatureHigh } from 'react-icons/fa';
import { MdGames, MdRefresh, MdSend } from "react-icons/md";
import { AiFillApi, AiOutlineDisconnect, AiFillInfoCircle } from "react-icons/ai";
import { RiSensorFill } from "react-icons/ri";
import { GiHeartOrgan, GiStabbedNote, GiAerialSignal } from "react-icons/gi";
import { DropdownList, DatePicker } from "react-widgets";

export default function ControlPanel({ keyboardNav, setKeyboardNav, history,setPrescriptionMsg, setPrescriptionType,prescriptionType, prescriptionSchedule, setPrescriptionSchedule,handleNewPrescription,obstacleAv,setObstacleAv,setClickVal,handleDisconnect,handleConnect,barProgress,vitalData,onPressureMeasurementClicked,onTempMeasurementClicked,onPulseMeasurementClicked }) {
    
    const [dummyRoomData, setDummyRoomData] = useState(
        [
            { "item": "Medication" },
            { "item": "Diet" },
            { "item": "Therapy" },
            { "item": "General advice" }
        ]
    )
    
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
            
        </Fragment>
    )
}
