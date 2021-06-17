import React, { Fragment, useEffect, useState } from 'react'
import { Card, Col, Button, Row, Badge, ToggleButton, ButtonGroup, OverlayTrigger, Tooltip, Popover, Form, ProgressBar, Image } from 'react-bootstrap'
import { FaArrowAltCircleDown, FaArrowAltCircleRight, FaArrowCircleLeft, FaArrowCircleUp, FaMinusCircle, FaRedo, FaStopCircle, FaUndo, FaHeartbeat, FaTemperatureHigh } from 'react-icons/fa';
import { MdRefresh, MdSend, MdFace } from "react-icons/md";
import { AiFillInfoCircle} from "react-icons/ai";
import RobotHead from "../../assets/pepper_head.png"
import { GiHeartOrgan, GiStabbedNote, GiAerialSignal } from "react-icons/gi";
import { DropdownList, DatePicker } from "react-widgets";

export default function ControlPanel({ setKeyboardNav, setPrescriptionMsg, setPrescriptionType, prescriptionType, prescriptionSchedule, setPrescriptionSchedule, handleNewPrescription, setClickVal, barProgress, onPressureMeasurementClicked, onTempMeasurementClicked, onPulseMeasurementClicked, faceTrack, setFaceTrack,prescriptionPriority,setPrescriptionPriority, setShowHelp, disableNavButtons,sonarData,paddingLeft,paddingRight,paddingTop,paddingBottom}) {

    const [prescriptionData, setPrescriptionData] = useState(
        [
            { "item": "Medication" },
            { "item": "Diet" },
            { "item": "Therapy" },
            { "item": "General advice" }
        ]
    )
    const [robotSensorImg,setRobotSensorImg]=useState(0)
    
    const [urgencyData,setUrgencyData] = useState(
        [
            { "item": "High" },
            { "item": "Medium" },
            { "item": "Low" }
        ]
    )
    // const radios = [
    //     { name: 'Low', value: '1' },
    //     { name: 'Medium', value: '2' },
    //     { name: 'High', value: '3' },
    //   ];
    const onRefreshClicked = () => {
        // history.push("/dashboard")
        document.location.reload()
    }
    

    const handleReminderCreate = (value) =>{
        let newOption = {item:value}
        setPrescriptionType(value)
        setPrescriptionData(data=>[newOption, ...data])
    }
    useEffect(()=>{
        const retActiveSensors = () =>{
            if(sonarData.front>0.5 && sonarData.back>0.5){
                setRobotSensorImg(0) 
            }
            else if(sonarData.front<=0.5 && sonarData.back>0.5){
                setRobotSensorImg(1)
            }
            else if(sonarData.front>0.5 && sonarData.back<=0.5){
                setRobotSensorImg(2)
            }
            else{
                setRobotSensorImg(3)
            }
        }
        retActiveSensors()
    },[sonarData])
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
                            <Button className="ml-1 mr-1" variant="outline-primary" size="md" disabled={disableNavButtons} onMouseDown={() => setClickVal("left")} onMouseUp={() => setClickVal(0)}><FaArrowCircleLeft /></Button>
                            <Button className="ml-1 mr-1" variant="outline-primary" size="md" disabled={disableNavButtons} onMouseDown={() => setClickVal("forward")} onMouseUp={() => setClickVal(0)}><FaArrowCircleUp /></Button>
                            <Button className="ml-1 mr-1" variant="outline-primary" size="md" disabled={disableNavButtons} onMouseDown={() => setClickVal("right")} onMouseUp={() => setClickVal(0)}><FaArrowAltCircleRight /></Button>
                        </Col>
                        <Col sm="6" className="center-content mt-2">
                            <Button className="ml-1 mr-1" variant="outline-light" size="md"  disabled><FaMinusCircle /></Button>
                            <Button className="ml-1 mr-1" variant="outline-primary" size="md" disabled={disableNavButtons} onMouseDown={() => setClickVal("head_up")} onMouseUp={() => setClickVal(0)}><FaArrowCircleUp /></Button>
                            <Button className="ml-1 mr-1" variant="outline-light" size="md" disabled><FaMinusCircle /></Button>
                        </Col>
                        <Col sm="6" className="center-content  mt-2">
                            <Button className="ml-1 mr-1" variant="outline-primary" size="md" disabled={disableNavButtons} onMouseDown={() => setClickVal("rotate_left")} onMouseUp={() => setClickVal(0)}><FaUndo /></Button>
                            <Button className="ml-1 mr-1" variant="outline-danger" size="md" disabled={disableNavButtons} onMouseDown={() => setClickVal("nullmotion")} onMouseUp={() => setClickVal(0)}><FaStopCircle /></Button>
                            <Button className="ml-1 mr-1" variant="outline-primary" size="md" disabled={disableNavButtons} onMouseDown={() => setClickVal("rotate_right")} onMouseUp={() => setClickVal(0)}><FaRedo /></Button>
                        </Col>

                        <Col sm="6" className="center-content mt-2">
                            <Button className="ml-1 mr-1" variant="outline-primary" size="md" disabled={disableNavButtons} onMouseDown={() => setClickVal("head_left")} onMouseUp={() => setClickVal(0)}><FaArrowCircleLeft /></Button>
                            <Button className="ml-1 mr-1" variant="outline-light" size="md" disabled><FaMinusCircle /></Button>
                            <Button className="ml-1 mr-1" variant="outline-primary" size="md" disabled={disableNavButtons} onMouseDown={() => setClickVal("head_right")} onMouseUp={() => setClickVal(0)}><FaArrowAltCircleRight /></Button>
                        </Col>
                        <Col sm="6" className="center-content mt-2">
                            <Button className="ml-1 mr-1" variant="outline-light" size="md" disabled><FaMinusCircle /></Button>
                            <Button className="ml-1 mr-1" variant="outline-primary" size="md" disabled={disableNavButtons} onMouseDown={() => setClickVal("back")} onMouseUp={() => setClickVal(0)}><FaArrowAltCircleDown /></Button>
                            <Button className="ml-1 mr-1" variant="outline-light" size="md" disabled><FaMinusCircle /></Button>
                        </Col>
                        <Col sm="6" className="center-content mt-2">
                            <Button className="ml-1 mr-1" variant="outline-light" size="md" disabled><FaMinusCircle /></Button>
                            <Button className="ml-1 mr-1" variant="outline-primary" size="md" disabled={disableNavButtons} onMouseDown={() => setClickVal("head_down")} onMouseUp={() => setClickVal(0)}><FaArrowAltCircleDown /></Button>
                            <Button className="ml-1 mr-1" variant="outline-light" size="md" disabled><FaMinusCircle /></Button>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col sm="6" className="p-1 center-content">
                            {
                                robotSensorImg==0? (
                                    <Image className="robot-sensor" fluid={true} src="https://res.cloudinary.com/decipher-tech/image/upload/v1623665344/HWU_Telecare/robot-sensor_woxudn.png" />
                                ):(<div></div>)
                            }
                            {
                                robotSensorImg==1? (
                                    <Image className="robot-sensor" fluid={true} src="https://res.cloudinary.com/decipher-tech/image/upload/v1623665344/HWU_Telecare/robot-sensor-front_g0kq6u.png" />
                                ):(<div></div>)
                            }
                            {
                                robotSensorImg==2? (
                                    <Image className="robot-sensor" fluid={true} src="https://res.cloudinary.com/decipher-tech/image/upload/v1623665345/HWU_Telecare/robot-sensor-back_crcjwg.png" />
                                ):(<div></div>)
                            }
                            {
                                robotSensorImg==3? (
                                    <Image className="robot-sensor" fluid={true} src="https://res.cloudinary.com/decipher-tech/image/upload/v1623666163/HWU_Telecare/robot-sensor-both_kqvfts.png" />
                                ):(<div></div>)
                            }
                        </Col>
                        <Col sm="6" className="p-1  center-content">
                            <Col sm="12" className="robot-head-div center-content" style={{paddingTop:paddingTop+"%",paddingRight:paddingRight+"%",paddingBottom:paddingBottom+"%"}}>
                                <Image src={RobotHead} fluid={true} />
                            </Col>
                        </Col>
                    </Row>
                </Card.Body>
            </Card >
            <Card className="dashboard-box-design mb-3" >

                <Card.Body>
                    <Row >
                        <Col sm="12" className="center-content">
                            {/* <OverlayTrigger placement="top" overlay={<Tooltip >Connect </Tooltip>}>
                                <Button variant="success" className="ml-1 mr-1" onClick={()=>handleConnect()}><AiFillApi /></Button>
                            </OverlayTrigger>
                            <OverlayTrigger placement="top" overlay={<Tooltip >Disconnect</Tooltip>}>
                                <Button variant="danger" className="ml-1 mr-1" onClick={()=>handleDisconnect()}><AiOutlineDisconnect /></Button>
                            </OverlayTrigger> */}

                            {/* <OverlayTrigger placement="top" overlay={<Tooltip >Activate/disactivate keyboard navigation</Tooltip>}>
                                <ButtonGroup toggle >
                                    <ToggleButton checked={keyboardNav} value="1" onChange={(e) => setKeyboardNav(e.currentTarget.checked)} type="checkbox" className="ml-1 mr-1" variant="outline-info" size="md"><MdGames /></ToggleButton>
                                </ButtonGroup>
                            </OverlayTrigger>
                            <OverlayTrigger placement="top" overlay={<Tooltip >Allow obstacle avoidance (default is on). Robot will stop before collision</Tooltip>}>
                                <ButtonGroup toggle >
                                    <ToggleButton checked={obstacleAv} value="2" onChange={(e) => setObstacleAv(e.currentTarget.checked)} type="checkbox" className="ml-1 mr-1" variant="outline-info" size="md"><RiSensorFill /></ToggleButton>
                                </ButtonGroup>
                            </OverlayTrigger> */}
                            
                        </Col>

                        <Col sm="12" className="center-content mt-2">
                            <OverlayTrigger placement="top" overlay={<Tooltip >Refresh stream</Tooltip>}>
                                <Button variant="outline-info" className="ml-1 mr-1" onClick={onRefreshClicked}><MdRefresh />Refresh</Button>
                            </OverlayTrigger>
                            <OverlayTrigger placement="top" overlay={<Tooltip >Help</Tooltip>}>
                                <Button variant="outline-info" className="ml-1 mr-1" onClick={()=>setShowHelp(true)}><AiFillInfoCircle /> Help</Button>
                            </OverlayTrigger>
                            <OverlayTrigger placement="top" overlay={<Tooltip >Activate/disactivate head movement while tracking face</Tooltip>}>
                                <ButtonGroup toggle >
                                    <ToggleButton checked={faceTrack} value="1" onChange={(e) => setFaceTrack(e.currentTarget.checked)} type="checkbox" className="ml-1 mr-1" variant="outline-info" size="md"><MdFace />Face track</ToggleButton>
                                </ButtonGroup>
                            </OverlayTrigger>
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
                                                    <Button variant="outline-info" className="mt-1 mr-1 ml-1 mb-1" disabled={disableNavButtons} onClick={onPulseMeasurementClicked}><FaHeartbeat /> </Button>
                                                </OverlayTrigger>
                                                <OverlayTrigger placement="top" overlay={<Tooltip >Measure temperature</Tooltip>}>
                                                    <Button variant="outline-info" className="mt-1 mr-1 ml-1 mb-1" disabled={disableNavButtons} onClick={onTempMeasurementClicked}><FaTemperatureHigh /> </Button>
                                                </OverlayTrigger>
                                                <OverlayTrigger placement="top" overlay={<Tooltip >Measure blood pressure</Tooltip>}>
                                                    <Button variant="outline-info" className="mt-1 mr-1 ml-1 mb-1" disabled={disableNavButtons} onClick={onPressureMeasurementClicked}><GiHeartOrgan /> </Button>
                                                </OverlayTrigger>
                                            </Col>
                                            <Col sm="12" className="mt-2">
                                                <ProgressBar animated now={barProgress} min={0} max={100} />
                                            </Col>
                                            {/* <Col sm="12" className="mt-2 center-content">
                                                <p>{vitalData}</p>
                                            </Col> */}

                                        </Popover.Content>
                                    </Popover>
                                }>
                                <Button variant="outline-info" className="ml-1 mr-1" ><GiAerialSignal /> Measure</Button>
                            </OverlayTrigger>
                            <OverlayTrigger
                                placement="top"
                                trigger="click"
                                key="prescribe"
                                overlay={
                                    <Popover id="prescribe" onEnter={(e) => setKeyboardNav(false)} onExit={(e) => setKeyboardNav(true)}>
                                        <Popover.Title as="h3">Send reminders to the robot</Popover.Title>
                                        <Popover.Content >
                                            <Col sm="12" className="mt-2">
                                                <DropdownList
                                                    
                                                    placeholder="Choose/create reminder type"
                                                    allowCreate="onFilter"
                                                    data={prescriptionData}
                                                    textField='item'
                                                    value={prescriptionType}
                                                    onChange={(value) => setPrescriptionType(value.item)}
                                                    onCreate={handleReminderCreate}
                                                />
                                            </Col>
                                            <Col sm="12" className="mt-2">
                                                <DatePicker
                                                    value={prescriptionSchedule}
                                                    onChange={(value) => setPrescriptionSchedule(value)}
                                                    defaultValue={prescriptionSchedule}
                                                    includeTime
                                                />
                                            </Col>
                                            <Col sm="12" className="mt-2">
                                                <DropdownList
                                                    
                                                    placeholder="Set priority level"
                                                    data={urgencyData}
                                                    textField='item'
                                                    value={prescriptionPriority}
                                                    onChange={(value) => setPrescriptionPriority(value.item)}
                                                />
                                            </Col>
                                            <Col sm="12" className="mt-2">
                                                <Form.Group controlId="prescriptionDetails">
                                                    <Form.Control
                                                        placeholder="Enter prescription details"
                                                        as="textarea"
                                                        rows={3}
                                                        onChange={(e) => setPrescriptionMsg(e.target.value)} />
                                                </Form.Group>
                                            </Col>
                                            <Col sm="12" className="mt-2">
                                                <Button variant="outline-info" block onClick={ handleNewPrescription}><MdSend /> Send to the robot </Button>
                                            </Col>
                                        </Popover.Content>
                                    </Popover>
                                }>
                                <Button variant="outline-info" className="ml-1 mr-1"><GiStabbedNote /> Reminder </Button>
                            </OverlayTrigger>


                        </Col>

                    </Row>

                </Card.Body>
            </Card >
            
        </Fragment>
    )
}