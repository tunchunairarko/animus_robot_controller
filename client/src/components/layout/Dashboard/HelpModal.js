import React, { Fragment, useEffect, useState } from 'react'
import { Button, Row, Image, Col, OverlayTrigger, Tooltip } from 'react-bootstrap'
import "../../../components/assets/style.css"
import { IoMdBody } from "react-icons/io";
import { AiFillRobot } from "react-icons/ai";
import { FiPhoneCall } from "react-icons/fi";
import { RiFileHistoryFill } from "react-icons/ri";
import { GiStabbedNote,GiSettingsKnobs,GiAerialSignal } from "react-icons/gi";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
// const SearchModal = ({ show, handleClose, searchQuery, onProductChosen, marketplace }) => {
const HelpModal = ({ showHelp, setShowHelp }) => {

    const handleCloseHelp = () => {
        setShowHelp(() => false)
    }

    return (
        <Fragment>
            <Modal open={showHelp} onClose={handleCloseHelp} centered>
                {/* <Modal.Header >
                    <Modal.Title id="searchResTitle">How to use HWU Telecare</Modal.Title>

                </Modal.Header> */}
                <div className="container mt-3" >
                    <Row style={{ overflowY: "scroll", maxHeight: "550px" }}>
                        <Col sm="12">
                            <h5 className="helph5header">How to use HWU Telecare</h5>
                            <p>Here you will find all the details on how to use HWU Telecare to connect to the telepresence robot and use it. Use the quick links at the top of this popup to jump to a particular section.</p>
                        </Col>
                        <Col sm="12" id="helptelecall" className="mt-3">
                            <h5 className="helph5header">How to connect to the robot & join teleconference call</h5>
                            <p className="mt-3">
                                <strong>1.</strong> Click the "join" button on the screen. Once you click join you will establish a connection with the robot.
                            </p>
                            <Image fluid={true} src="https://res.cloudinary.com/decipher-tech/image/upload/v1623529738/HWU_Telecare/Instruction_screen-1_xcrpmq.jpg" />
                            <p className="mt-3">
                                <strong>2.</strong> Type your name and click "Send" to send a call request to the remote user with the robot. If the remote user accepts your call, you will be able to start your communication.
                            </p>
                            <Image fluid={true} src="https://res.cloudinary.com/decipher-tech/image/upload/v1623532490/HWU_Telecare/Instruction_screens-2_nowxsh.jpg" />
                        </Col>
                        <Col sm="12" id="helpbodycontrols" className="mt-3">

                            <h5 className="helph5header">How to move using the robot</h5>
                            <p className="mt-3">
                                <strong>Using keyboard: </strong> Follow the instructions on the image below to move around the remote location using the robot.
                            </p>
                            <Image fluid={true} src="https://res.cloudinary.com/decipher-tech/image/upload/v1623536435/HWU_Telecare/Instruction_screens-5_trv8ee.jpg" />
                            <p className="mt-3">
                                <strong>Using on-screen controls: </strong> Follow the instructions on the image below to move the robot on the remote location using on-screen control panel.
                            </p>
                            <Image fluid={true} src="https://res.cloudinary.com/decipher-tech/image/upload/v1623534969/HWU_Telecare/Instruction_screens-3_rz8uoa.jpg" />

                        </Col>
                        <Col sm="12" id="helpheadcontrols" className="mt-3">

                            <h5 className="helph5header">How to look around using the robot</h5>
                            <p className="mt-3">
                                <strong>Using keyboard: </strong> Follow the instructions on the image below to control the telecare robot's head.
                            </p>
                            <Image fluid={true} src="https://res.cloudinary.com/decipher-tech/image/upload/v1623537118/HWU_Telecare/Instruction_screens-6_fabeae.jpg" />
                            <p className="mt-3">
                                <strong>Using on-screen controls: </strong> Follow the instructions on the image below to control the telecare robot's head using on-screen control panel.
                            </p>
                            <Image fluid={true} src="https://res.cloudinary.com/decipher-tech/image/upload/v1623535355/HWU_Telecare/Instruction_screens-4_grqlha.jpg" />

                        </Col>
                        <Col sm="12" id="helpsettingreminder" className="mt-3">

                            <h5 className="helph5header">How to set up a reminder for the robot to remind</h5>
                            <Row>
                                <Col sm="6" className="center-content">
                                    <Image fluid={true} src="https://res.cloudinary.com/decipher-tech/image/upload/v1624529313/HWU_Telecare/reminder_button_jaqjjv.jpg" />
                                </Col>
                                <Col sm="6">
                                    <p>
                                        Click on the "Reminder" button
                                    </p>
                                </Col>
                                <Col sm="12" className="center-content">
                                    <Image fluid={true} src="https://res.cloudinary.com/decipher-tech/image/upload/v1624529313/HWU_Telecare/reminder_instructions_hn6jmm.jpg" />
                                </Col>
                            </Row>
                        </Col>
                        <Col sm="12" id="helpmeasuringpulse" className="mt-3">

                            <h5 className="helph5header">How to measure vital signs for routine checkups</h5>
                            <Row>
                                <Col sm="6" className="center-content mt-2 mb-2">
                                    <Image fluid={true} src="https://res.cloudinary.com/decipher-tech/image/upload/v1624529313/HWU_Telecare/measure_pulse_mzu8p4.jpg" />
                                </Col>
                                <Col sm="6" className="center-content mt-2 mb-2">
                                    <p>
                                        Click on the "Measure" button
                                    </p>
                                </Col>
                                <Col sm="6" className="center-content mt-2 mb-2">
                                    <Image fluid={true} src="https://res.cloudinary.com/decipher-tech/image/upload/v1624529313/HWU_Telecare/take_measurement_fadsw7.jpg" />
                                </Col>
                                <Col sm="6" className="center-content mt-2 mb-2">
                                    <p>
                                        The vital measurement toolbox will popup. Currently HWU Telecare supports 3 types of measurements: pulse, temperature and blood pressure, and they don't require physical contact with the patient. Just click one of the options, and then you would have to wait for 5-9 seconds (the robot will freeze once you start a measurement).
                                    </p>
                                </Col>
                                <Col sm="6" className="center-content mt-2 mb-2">
                                    <Image fluid={true} src="https://res.cloudinary.com/decipher-tech/image/upload/v1624529313/HWU_Telecare/result_appears_at_the_bottom_iayidg.jpg" />
                                </Col>
                                <Col sm="6" className="center-content mt-2 mb-2">
                                    <p>
                                        Once its done, the result will pop up at the bottom of the screen like this.
                                    </p>
                                </Col>
                            </Row>
                        </Col>
                        <Col sm="12" id="helputilitybuttons" className="mt-3">
                            <h5 className="helph5header">Some utility buttons</h5>
                            <Row>
                                <Col sm="6" className="center-content">
                                    <Image fluid={true} src="https://res.cloudinary.com/decipher-tech/image/upload/v1624529313/HWU_Telecare/refresh_button_brd66z.jpg" />
                                </Col>
                                <Col sm="6">
                                    <p>
                                        Use it to refresh your dashboard if things get stuck
                                    </p>
                                </Col>
                                <Col sm="6" className="center-content">
                                    <Image fluid={true} src="https://res.cloudinary.com/decipher-tech/image/upload/v1624529313/HWU_Telecare/face_track_button_tw6n9j.jpg" />
                                </Col>
                                <Col sm="6">
                                    <p>
                                        You can tell the robot to track user's face while having conversation. The robot will try to look for the person with him and direct its eyes towards his/her/their face.
                                    </p>
                                </Col>
                                <Col sm="6" className="center-content">
                                    <Image fluid={true} src="https://res.cloudinary.com/decipher-tech/image/upload/v1624529313/HWU_Telecare/logout-disconnect_button_kh0u1a.jpg" />
                                </Col>
                                <Col sm="6">
                                    <p>
                                        Disconnect your session and logout
                                    </p>
                                </Col>
                            </Row>

                        </Col>
                        <Col sm="12" id="helpmedicalrecords" className="mt-3">
                            <h5 className="helph5header">Check stored reminders and vital reading history</h5>
                            <p className="mt-3">
                                Scroll down to the bottom of your right hand screen to access history of reminders and vital readings.
                            </p>
                            <Col sm="12" className="center-content">
                                <Image fluid={true} src="https://res.cloudinary.com/decipher-tech/image/upload/v1624529313/HWU_Telecare/doctor_widgets_osqs6v.jpg" />
                            </Col>


                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col sm="12" className="center-content">
                            <OverlayTrigger placement="top" overlay={<Tooltip >How to make a teleconference call</Tooltip>}>
                                <a className="btn btn-outline-primary ml-1 mr-1" href="#helptelecall"><FiPhoneCall /></a>
                            </OverlayTrigger>
                            <OverlayTrigger placement="top" overlay={<Tooltip >How to move with the robot</Tooltip>}>
                                <a className="btn btn-outline-primary ml-1 mr-1" href="#helpbodycontrols"><IoMdBody /></a>
                            </OverlayTrigger>
                            <OverlayTrigger placement="top" overlay={<Tooltip >How to look around</Tooltip>}>
                                <a className="btn btn-outline-primary ml-1 mr-1" href="#helpheadcontrols"><AiFillRobot /></a>
                            </OverlayTrigger>

                            <OverlayTrigger placement="top" overlay={<Tooltip >How to set reminder for the robot to remind</Tooltip>}>
                                <a className="btn btn-outline-primary ml-1 mr-1" href="#helpsettingreminder"><GiStabbedNote /></a>
                            </OverlayTrigger>
                            <OverlayTrigger placement="top" overlay={<Tooltip >How to measure vitals</Tooltip>}>
                                <a className="btn btn-outline-primary ml-1 mr-1" href="#helpmeasuringpulse"><GiAerialSignal /></a>
                            </OverlayTrigger>
                            <OverlayTrigger placement="top" overlay={<Tooltip >How to use some utilities</Tooltip>}>
                                <a className="btn btn-outline-primary ml-1 mr-1" href="#helputilitybuttons"><GiSettingsKnobs /></a>
                            </OverlayTrigger>
                            <OverlayTrigger placement="top" overlay={<Tooltip >How to check remote user's records</Tooltip>}>
                                <a className="btn btn-outline-primary ml-1 mr-1" href="#helpmedicalrecords"><RiFileHistoryFill /></a>
                            </OverlayTrigger>
                        </Col>
                    </Row>
                </div>



            </Modal>
            {/* <Modal size="lg" show={showHelp}  backdrop="static" keyboard={false} centered>
                <Modal.Header >
                    <Modal.Title id="searchResTitle">How to use HWU Telecare</Modal.Title>

                </Modal.Header>
                <Modal.Body style={{ overflowY: "scroll", maxHeight: "550px" }}>
                    <Row>
                        <Col sm="12">
                            <p>Here you will find all the details on how to use HWU Telecare to connect to the telepresence robot and use it. Use the quick links at the top of this popup to jump to a particular section.</p>
                        </Col>
                        <Col sm="12" id="helptelecall" className="mt-3">
                            <h5 className="helph5header">How to connect to the robot & join teleconference call</h5>
                            <p className="mt-3">
                                <strong>1.</strong> Click the "join" button on the screen. Once you click join you will establish a connection with the robot.
                            </p>
                            <Image fluid={true} src="https://res.cloudinary.com/decipher-tech/image/upload/v1623529738/HWU_Telecare/Instruction_screen-1_xcrpmq.jpg" />
                            <p className="mt-3">
                                <strong>2.</strong> Type your name and click "Send" to send a call request to the remote user with the robot. If the remote user accepts your call, you will be able to start your communication.
                            </p>
                            <Image fluid={true} src="https://res.cloudinary.com/decipher-tech/image/upload/v1623532490/HWU_Telecare/Instruction_screens-2_nowxsh.jpg" />
                        </Col>
                        <Col sm="12" id="helpbodycontrols" className="mt-3">

                            <h5 className="helph5header">How to move using the robot</h5>
                            <p className="mt-3">
                                <strong>Using keyboard: </strong> Follow the instructions on the image below to move around the remote location using the robot.
                            </p>
                            <Image fluid={true} src="https://res.cloudinary.com/decipher-tech/image/upload/v1623536435/HWU_Telecare/Instruction_screens-5_trv8ee.jpg" />
                            <p className="mt-3">
                                <strong>Using on-screen controls: </strong> Follow the instructions on the image below to move the robot on the remote location using on-screen control panel.
                            </p>
                            <Image fluid={true} src="https://res.cloudinary.com/decipher-tech/image/upload/v1623534969/HWU_Telecare/Instruction_screens-3_rz8uoa.jpg" />

                        </Col>
                        <Col sm="12" id="helpheadcontrols" className="mt-3">

                            <h5 className="helph5header">How to look around using the robot</h5>
                            <p className="mt-3">
                                <strong>Using keyboard: </strong> Follow the instructions on the image below to control the telecare robot's head.
                            </p>
                            <Image fluid={true} src="https://res.cloudinary.com/decipher-tech/image/upload/v1623537118/HWU_Telecare/Instruction_screens-6_fabeae.jpg" />
                            <p className="mt-3">
                                <strong>Using on-screen controls: </strong> Follow the instructions on the image below to control the telecare robot's head using on-screen control panel.
                            </p>
                            <Image fluid={true} src="https://res.cloudinary.com/decipher-tech/image/upload/v1623535355/HWU_Telecare/Instruction_screens-4_grqlha.jpg" />

                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <OverlayTrigger placement="top" overlay={<Tooltip >How to make a teleconference call</Tooltip>}>
                        <a className="btn btn-outline-primary" href="#helptelecall"><FiPhoneCall /></a>
                    </OverlayTrigger>
                    <OverlayTrigger placement="top" overlay={<Tooltip >How to move with the robot</Tooltip>}>
                        <a className="btn btn-outline-primary" href="#helpbodycontrols"><IoMdBody /></a>
                    </OverlayTrigger>
                    <OverlayTrigger placement="top" overlay={<Tooltip >How to look around</Tooltip>}>
                        <a className="btn btn-outline-primary" href="#helpheadcontrols"><AiFillRobot /></a>
                    </OverlayTrigger>
                    
                    
                    <Button variant="primary" onClick={handleCloseHelp}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal> */}
        </Fragment>
    )
};


export default HelpModal