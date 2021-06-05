import React, { Fragment, useState, useContext, useEffect } from 'react'
import Axios from "axios";
import { ResponsiveEmbed, Form, Card, Row, Col, Image, Button, Badge } from 'react-bootstrap'
import "../../../components/assets/style.css";
import { FaArrowAltCircleDown, FaArrowAltCircleRight, FaArrowCircleLeft, FaArrowCircleUp, FaCalendarAlt, FaCogs, FaCross, FaMinusCircle, FaPlusCircle, FaQuidditch, FaRedo, FaStopCircle, FaUndo } from 'react-icons/fa';
import { useCookies } from "react-cookie";
import socketIOClient from "socket.io-client";
import UserContext from "../../../context/UserContext";
import 'react-nipple/lib/styles.css';
import RangeSlider from 'react-bootstrap-range-slider';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import useKeyPress from "../../keyboard/useKeyPress";
import "react-widgets/styles.css";
import { useMediaQuery } from 'react-responsive'
import ControlPanel from "./ControlPanel"
import { useHistory } from "react-router-dom";
import DoctorWidget from "./DoctorWidget"
const socket = socketIOClient();

export default function Dashboard() {
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-device-width: 1224px)'
    })
    const history=useHistory()
    const [userRobots, setUserRobots] = useState()
    const [cookies] = useCookies(["user"]);
    const [validation, setValidator] = useState("");
    const [toggleState, setToggleState] = useState(false)
    // const [embedSource, setEmbedSource] = useState("https://robotapi.isensetune.com/video_feed");
    const [embedSource, setEmbedSource] = useState("http://127.0.0.1:12342/video_feed");
    const [startCall, setStartCall] = useState(true);
    const [speech, setSpeech] = useState("");
    const [prescribedTasks,setPrescribedTasks] = useState([])
    const [vitalHistory,setVitalHistory] = useState([])


    const upPress = useKeyPress("w");
    const leftPress = useKeyPress("a");
    const rightPress = useKeyPress("d");
    const leftRotatePress = useKeyPress("q");
    const rightRotatePress = useKeyPress("e");
    const headUpPress = useKeyPress("i");
    const headDownPress = useKeyPress("k");
    const headLeftPress = useKeyPress("j");
    const headRightPress = useKeyPress("l");

    const [upClick,setUpClick] = useState(false);
    const [leftClick,setLeftClick] = useState(false);
    const rightClick = useKeyPress("d");
    const leftRotateClick = useKeyPress("q");
    const rightRotateClick = useKeyPress("e");
    const headUpClick = useKeyPress("i");
    const headDownClick = useKeyPress("k");
    const headLeftClick = useKeyPress("j");
    const headRightClick = useKeyPress("l");
    const [keyboardNav, setKeyboardNav] = useState(false);

    useState(() => {
        setUserRobots(["Pepper"])
        setPrescribedTasks([
            {"dateAndTime":"10 May, 09:00 am","prescribedAction":"Next appointment"},
            {"dateAndTime":"10 May, 10:00 am","prescribedAction":"Take aspirin"},
            {"dateAndTime":"11 May, 04:00 pm","prescribedAction":"Do yoga"},
            {"dateAndTime":"11 May, 09:00 pm","prescribedAction":"Take Panadol"},
        ])
        setVitalHistory([
            {"dateAndTime":"10 May","temperature":"37.2","heartRate":"80","bloodPressure":"119/81"},
            {"dateAndTime":"10 May","temperature":"37.1","heartRate":"65","bloodPressure":"119/80"},
            {"dateAndTime":"11 May","temperature":"37.3","heartRate":"92","bloodPressure":"121/75"},
            {"dateAndTime":"12 May","temperature":"37.4","heartRate":"76","bloodPressure":"122/85"},
        ])
    }, [])

    
    useEffect(() => {
        if (!upPress) {
            socket.emit("frontenddata", "nullmotion")
        }
    }, [upPress])

    useEffect(() => {
        if (!leftPress) {
            socket.emit("frontenddata", "nullmotion")
        }
    }, [leftPress])

    useEffect(() => {
        if (!rightPress) {
            socket.emit("frontenddata", "nullmotion")
        }
    }, [rightPress])

    useEffect(() => {
        if (!leftRotatePress) {
            socket.emit("frontenddata", "nullmotion")
        }
    }, [leftRotatePress])

    useEffect(() => {
        if (!rightRotatePress) {
            socket.emit("frontenddata", "nullmotion")
        }
    }, [rightRotatePress])

    ///////////////////////
    //////////////////////
    useEffect(() => {
        if (!headUpPress) {
            socket.emit("frontenddata", "nullmotion")
        }
    }, [headUpPress])

    useEffect(() => {
        if (!headDownPress) {
            socket.emit("frontenddata", "nullmotion")
        }
    }, [headDownPress])

    useEffect(() => {
        if (!headLeftPress) {
            socket.emit("frontenddata", "nullmotion")
        }
    }, [headLeftPress])

    useEffect(() => {
        if (!headRightPress) {
            socket.emit("frontenddata", "nullmotion")
        }
    }, [headRightPress])


    useEffect(() => {
        const checkValidation = async (e) => {
            let token = localStorage.getItem("auth-token");
            if (token == null) {
                localStorage.setItem("auth-token", "");
                token = "";
            }
            else {
                const tokenResponse = await Axios.post(
                    "/api/users/tokenIsValid",
                    null,
                    { headers: { "x-auth-token": token } }
                );
                // console.log(searchQuery)

                if (tokenResponse.data) {
                    setValidator(token);
                }
            }
        }
        checkValidation();
    }, [validation]);


    useEffect(() => {
        const getData = async (e) => {
            if (toggleState == true) {
                let token = localStorage.getItem("auth-token");
                if (token == null) {
                    localStorage.setItem("auth-token", "");
                    token = "";
                }
                else {
                    const tokenResponse = await Axios.post(
                        "/api/users/tokenIsValid",
                        null,
                        { headers: { "x-auth-token": token } }
                    );
                    // console.log(searchQuery)

                    if (tokenResponse.data) {
                        const body = { toggleState }
                        try {
                            const robotRes = await Axios.get(
                                "/api/feed/robotdata",
                                { headers: { "x-auth-token": token } }
                            )

                        } catch (error) {
                            console.log(error)

                        }
                    }
                }
            }

        }
        getData();
    }, [toggleState]);

    const handleHeadMovement = (data) => {
        try {
            const direction = data['direction']['angle'];
            socket.emit("frontenddata", "head_" + direction)
        } catch (err) {
            console.log(err)
        }
    }

    const handleMovement = (data) => {
        socket.emit("frontenddata", data)
    }

    const handleSwitch = (elem, state) => {
        console.log('handleSwitch. elem:', elem);
        console.log('name:', elem.props.name);
        console.log('new state:', state);
    }

    const setBaseToolTip = () => {
        return "Control the speed of the robot's base"
    }

    const sendSpeechSignal = () => {
        socket.emit("frontendspeechdata", speech)
    }
    const sendSpeechSignalPredefined = (words) => {
        socket.emit("frontendspeechdata", words)
    }

    return (
        <Fragment>
            {userRobots ? <Fragment>
                {upPress && handleMovement("forward")}
                {leftPress && handleMovement("left")}
                {rightPress && handleMovement("right")}
                {leftRotatePress && handleMovement("rotate_left")}
                {rightRotatePress && handleMovement("rotate_right")}

                {headUpPress && handleMovement("head_up")}
                {headDownPress && handleMovement("head_down")}
                {headLeftPress && handleMovement("head_left")}
                {headRightPress && handleMovement("head_right")}

                {upClick && handleMovement("forward")}

                {isDesktopOrLaptop?(
                    <Row>
                    <Col md="8" className="pr-1" >
                        <div >
                            <ResponsiveEmbed aspectRatio="16by9" >
                                <iframe src="https://hwu-telepresence-room.herokuapp.com/" allow="geolocation; microphone; camera"/>
                                {/* <embed type="image/svg+xml" src={embedSource} /> */}
                            </ResponsiveEmbed>
                        </div>
                        {/* <Card className="dashboard-box-design mt-4" >
                            <Card.Header className="dashboard-box-design-card-header">Heartbeat monitor</Card.Header>
                            {/* <Card.Body style={{ margin: 'auto' }}> 
                            <Card.Body style={{ margin: '2px' }}>
                                <Button className="mr-2 ml-2"><FaQuidditch /> Create instant task</Button>
                                <Button className="mr-2 ml-2"><FaCalendarAlt /> Schedule task</Button>
                                <Button className="mr-2 ml-2"><FaCogs /> Manage task schedule</Button>


                            </Card.Body>

                        </Card> */}
                    </Col>
                    <Col md="4" className="pl-1">
                        
                        <ControlPanel keyboardNav={keyboardNav} setKeyboardNav={setKeyboardNav} history={history}/>
                        <DoctorWidget prescribedTasks={prescribedTasks} vitalHistory={vitalHistory}/>
                    </Col>
                </Row>
                ):(
                    <div class="no-robot-container">
                        <div style={{ color: '#c0c0c0', fontSize: '4rem', textTransform: 'uppercase', fontWeight: '900' }}>
                            Device not supported
                        </div>
                        <div style={{ color: '#c0c0c0', fontSize: '2rem', textTransform: 'uppercase', fontWeight: '900' }}>
                            Please use a laptop/desktop to run this application
                        </div>
                        
                    </div>
                )}

                
            </Fragment>
                :
                <Fragment>
                    <div class="no-robot-container">
                        <div style={{ color: '#c0c0c0', fontSize: '4rem', textTransform: 'uppercase', fontWeight: '900' }}>
                            No robots found
                        </div>
                        <div style={{ color: '#c0c0c0', fontSize: '2rem', textTransform: 'uppercase', fontWeight: '900' }}>
                            Add robot
                        </div>
                        <Button className="mr-2 ml-2 mt-3"><FaPlusCircle /> Add a robot</Button>
                    </div>
                </Fragment>
            }
        </Fragment>
    )
}
