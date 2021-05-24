import React, { Fragment, useState, useContext, useEffect } from 'react'
import Axios from "axios";
import { ResponsiveEmbed, Form, Card, Row, Col, Image, OverlayTrigger, Tooltip, Button } from 'react-bootstrap'
import "../../../components/assets/style.css";
import { FaArrowCircleRight, FaCalendarAlt, FaCogs, FaPhoneAlt, FaPlusCircle, FaPowerOff, FaQuidditch } from 'react-icons/fa';
import { useCookies } from "react-cookie";
import socketIOClient from "socket.io-client";
import UserContext from "../../../context/UserContext";
import ReactNipple from 'react-nipple';
import 'react-nipple/lib/styles.css';
import RangeSlider from 'react-bootstrap-range-slider';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import useKeyPress from "../../keyboard/useKeyPress";
import DropdownList from "react-widgets/DropdownList";
import "react-widgets/styles.css";
import ReactApexChart from 'react-apexcharts'

// import ZoomCall from "./ZoomCall"
const socket = socketIOClient();


export default function Dashboard() {


    const series = [
        {
            name: "High - 2013",
            data: [28, 29, 33, 36, 32, 32, 33]
        },
        // {
        //   name: "Low - 2013",
        //   data: [12, 11, 14, 18, 17, 13, 13]
        // }
    ]
    const series2 = [
        {
            name: "High - 2013",
            data: [76, 19, 33, 56, 92, 92, 54]
        },
        // {
        //   name: "Low - 2013",
        //   data: [12, 11, 14, 18, 17, 13, 13]
        // }
    ]
    const options = {
        chart: {
            height: 350,
            type: 'line',
            dropShadow: {
                enabled: true,
                color: '#000',
                top: 18,
                left: 7,
                blur: 10,
                opacity: 0.2
            },
            toolbar: {
                show: false
            }
        },
        colors: ['#77B6EA', '#545454'],
        dataLabels: {
            enabled: true,
        },
        stroke: {
            curve: 'smooth'
        },
        // title: {
        //   text: 'Average High & Low hearbeat',
        //   align: 'left'
        // },
        grid: {
            borderColor: '#e7e7e7',
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            },
        },
        markers: {
            size: 1
        },
        xaxis: {
            categories: ['0800', '0900', '1000', '1100', '1200', '1300', '1400'],
            title: {
                text: 'Hours'
            }
        },
        yaxis: {
            title: {
                text: 'Pulses'
            },
            min: 5,
            max: 40
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            floating: true,
            offsetY: -25,
            offsetX: -5
        }
    }

    const options2 = {
        chart: {
            height: 350,
            type: 'line',
            dropShadow: {
                enabled: true,
                color: '#000',
                top: 18,
                left: 7,
                blur: 10,
                opacity: 0.2
            },
            toolbar: {
                show: false
            }
        },
        colors: ['#77B6EA', '#545454'],
        dataLabels: {
            enabled: true,
        },
        stroke: {
            curve: 'smooth'
        },
        // title: {
        //   text: 'Average High & Low hearbeat',
        //   align: 'left'
        // },
        grid: {
            borderColor: '#e7e7e7',
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            },
        },
        markers: {
            size: 1
        },
        xaxis: {
            categories: ['0800', '0900', '1000', '1100', '1200', '1300', '1400'],
            title: {
                text: 'Hours'
            }
        },
        yaxis: {
            title: {
                text: 'BPM'
            },
            min: 10,
            max: 100
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            floating: true,
            offsetY: -25,
            offsetX: -5
        }
    }
    
    const [dummyRoomData, setDummyRoomData] = useState(
        [
            { "room": "living room", "point": "table" },
            { "room": "living room", "point": "tv" },
            { "room": "living room", "point": "sofa" },
            { "room": "living room", "point": "bar" },
            { "room": "bed room 1", "point": "table" },
            { "room": "bed room 1", "point": "bed right" },
            { "room": "bed room 1", "point": "bed left table" },
            { "room": "bed room 1", "point": "wardrobe" },
            { "room": "kitchen", "point": "counter" },
            { "room": "kitchen", "point": "entrance" },
            { "room": "corridor", "point": "west end" },
            { "room": "corridor", "point": "east end" }
        ]
    )




    const [userRobots, setUserRobots] = useState(["Pepper"])
    const { tempEmail, tempPassword } = useContext(UserContext)
    const [cookies] = useCookies(["user"]);
    const [validation, setValidator] = useState("");
    const [toggleState, setToggleState] = useState(false)
    const [embedSource, setEmbedSource] = useState("http://127.0.0.1:12342/video_feed");
    const [baseSpeed, setBaseSpeed] = useState(50);
    const [headSpeed, setHeadSpeed] = useState(50);
    const [startCall, setStartCall] = useState(true);
    const [speech, setSpeech] = useState("");


    const upPress = useKeyPress("w");
    const leftPress = useKeyPress("a");
    const rightPress = useKeyPress("d");
    const leftRotatePress = useKeyPress("q");
    const rightRotatePress = useKeyPress("e");
    const headUpPress = useKeyPress("i");
    const headDownPress = useKeyPress("k");
    const headLeftPress = useKeyPress("j");
    const headRightPress = useKeyPress("l");

    // socket.on("FROMREMOTEROBOT", data => {
    //     setResponse(data);
    //   });

    useState(() => {
        setStartCall(true)
    }, [])
    // useState(()=>{
    //     ZoomCall.getSignature()
    // },[startCall])


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

                            // if (robotRes.data) {
                            //     console.log(robotRes.data)
                            // }

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

    const handleBodyMovement = (data) => {
        try {
            const direction = data['direction']['angle'];
            if (direction == "up") {
                socket.emit("frontenddata", "forward")
            }
            else if (direction == "down") {
                socket.emit("frontenddata", "down")
            }

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


                <Row>
                    <Col md="3">
                        <Card className="dashboard-box-design mb-3" >
                            <Card.Header className="dashboard-box-design-card-header">Manual control</Card.Header>
                            <Card.Body>

                                <p>
                                    w: forward, a:left, d:right <br></br>
                                q: rotate left, e: rotate right <br></br>
                                i,j,k,l: head movement
                            </p>
                                <Form>
                                    <Form.Group as={Row}>
                                        <Col md="12">
                                            <Form.Label>
                                                Base speed
                                        </Form.Label>
                                        </Col>

                                        <Col md="8">
                                            <RangeSlider
                                                min={0}
                                                max={100}
                                                value={baseSpeed}
                                                tooltip='auto'
                                                tooltipPlacement='top'
                                                tooltipLabel={currentValue => `${currentValue}%`}
                                                onChange={e => setBaseSpeed(e.target.value)}
                                            />
                                        </Col>
                                        <Col md="4">
                                            <Form.Control value={baseSpeed} />
                                        </Col>
                                        <Col md="12">
                                            <Form.Label>
                                                Head speed
                                        </Form.Label>
                                        </Col>

                                        <Col md="8">
                                            <RangeSlider
                                                min={0}
                                                max={100}
                                                value={headSpeed}
                                                tooltip='auto'
                                                tooltipPlacement='top'
                                                tooltipLabel={currentValue => `${currentValue}%`}
                                                onChange={e => setHeadSpeed(e.target.value)}
                                            />
                                        </Col>
                                        <Col md="4">
                                            <Form.Control value={headSpeed} />
                                        </Col>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Card>
                        <Card className="dashboard-box-design mt-3" >
                            <Card.Header className="dashboard-box-design-card-header">Robot services</Card.Header>
                            <Card.Body>
                                <Form>
                                    <Form.Check
                                        type="switch"
                                        id="speech-service"
                                        label="Speech service"
                                        defaultChecked={true}
                                    />
                                    <Form.Check
                                        type="switch"
                                        label="Audio service"
                                        id="audio-service"
                                        defaultChecked={true}
                                    // id="disabled-custom-switch"

                                    />
                                    <Form.Check
                                        type="switch"
                                        label="User interaction"
                                        id="user-interaction"
                                        defaultChecked={true}
                                    />
                                    <Form.Check
                                        type="switch"
                                        label="Global search"
                                        id="global-search"
                                        defaultChecked={true}
                                    />
                                </Form>
                                {/* <Form.Group className="mt-3" as={Row} controlId="upcText">
                                    <Form.Label column sm="2">
                                        Say
                                        </Form.Label>
                                    <Col sm="8">
                                        <Form.Control type="text" value={speech} onChange={(e) => setSpeech(e.target.value)} />
                                    </Col>
                                    <Col sm="2">
                                        <Button variant="primary" className="mr-2 ml-2" onClick={() => sendSpeechSignal()}><FaArrowCircleRight /></Button>
                                    </Col>
                                </Form.Group>
                                <Button variant="primary" className="mr-2 ml-2" onClick={() => sendSpeechSignalPredefined("Oh, I forgot, its time to measure Mauro's pulses!")}><FaArrowCircleRight /> 1</Button>
                                <Button variant="primary" className="mr-2 ml-2" onClick={() => sendSpeechSignalPredefined("Hi Maauro, can you spare 15 seconds so that I can take your pulse reading?")}><FaArrowCircleRight /> 2</Button>
                                <Button variant="primary" className="mr-2 ml-2" onClick={() => sendSpeechSignalPredefined("Thank you. Please try not to move.")}><FaArrowCircleRight /> 3</Button>
                                <Button variant="primary" className="mr-2 ml-2" onClick={() => sendSpeechSignalPredefined("Thank you for your patience. It seems that you have a bit high pulse rate today. Perhaps you should take some rest. Doctor Walt will consult with you tomorrow.")}><FaArrowCircleRight />4 </Button> */}
                            </Card.Body>
                        </Card>
                        <Card className="dashboard-box-design mt-3" >
                            <Card.Header className="dashboard-box-design-card-header">Robot schedule</Card.Header>
                            <Card.Body>
                                <div>April 5, 11:30pm: Remind medicine</div>
                                <div>April 6, 10:00am: Doctor White's appointment</div>
                                <div>April 6, 03:50pm: Radio exercise</div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md="6" >

                        {/* <div style={{ border: 'solid 3px #bbb', borderRadius: '5px' }}>  */}
                        <div >

                            <ResponsiveEmbed aspectRatio="16by9">
                                {/* <iframe class="embed-responsive-item" src="https://animus-robot.herokuapp.com/" allow="camera;microphone"></iframe> */}
                                <Image src={embedSource} />
                                {/* <embed type="image/svg+xml" src={embedSource} /> */}
                            </ResponsiveEmbed>
                        </div>
                        <Card className="dashboard-box-design mt-4" >
                            <Card.Header className="dashboard-box-design-card-header">Heartbeat monitor</Card.Header>
                            {/* <Card.Body style={{ margin: 'auto' }}> */}
                            <Card.Body style={{ margin: '2px' }}>
                                {/* <Button className="mr-2 ml-2"><FaQuidditch /> Create instant task</Button>
                                <Button className="mr-2 ml-2"><FaCalendarAlt /> Schedule task</Button>
                                <Button className="mr-2 ml-2"><FaCogs /> Manage task schedule</Button> */}

                                <ReactApexChart options={options} series={series} type="line" height={250} />
                            </Card.Body>

                        </Card>
                    </Col>
                    <Col md="3">
                        <Card className="dashboard-box-design" >
                            <Card.Header className="dashboard-box-design-card-header">Respiration monitor</Card.Header>
                            <Card.Body>
                                <ResponsiveEmbed aspectRatio="16by9">
                                    {/* <video controls muted>
                                <source src={embedSource} type="application/x-mpegURL"></source>
                            </video> */}
                                    {/* <Image src={embedSource} /> */}
                                    {/* <embed type="image/svg+xml" src={embedSource} /> */}
                                    <ReactApexChart options={options2} series={series2} type="bar" height={250} />
                                </ResponsiveEmbed>
                            </Card.Body>

                        </Card>
                        <Card className="dashboard-box-design mt-3" >
                            <Card.Header className="dashboard-box-design-card-header">Send robot to a location</Card.Header>
                            <Card.Body>
                                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Click on a location on the map to transmit your robot</Tooltip>}>
                                    <Card.Img variant="bottom" src="http://www.geduino.org/site/wp-content/uploads/2015/04/map-gmapping.png" />
                                </OverlayTrigger>
                                <div className="mt-2">Quick Access</div>
                                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Choose one of the quick access locations to navigate there</Tooltip>}>

                                    <DropdownList
                                        style={{ marginTop: '5px' }}
                                        data={dummyRoomData}
                                        textField='point'
                                        groupBy='room'
                                    />
                                </OverlayTrigger>
                            </Card.Body>

                        </Card>

                    </Col>

                </Row>
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
