import React, { Fragment, useState, useContext, useEffect, useRef } from 'react'
import Axios from "axios";
import { ResponsiveEmbed, Row, Col, Button, Image } from 'react-bootstrap'
import "../../../components/assets/style.css";
import { FaPlusCircle } from 'react-icons/fa';
import { useCookies } from "react-cookie";
import io from "socket.io-client";
import UserContext from "../../../context/UserContext";
import 'react-nipple/lib/styles.css';
import { useAlert } from 'react-alert';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import useKeyPress from "../../keyboard/useKeyPress";
import "react-widgets/styles.css";
import { useMediaQuery } from 'react-responsive'
import ControlPanel from "./ControlPanel"
import { useHistory } from "react-router-dom";
import DoctorWidget from "./DoctorWidget"
import HelpModal from './HelpModal';

const socket = io();


export default function Dashboard() {
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-device-width: 1224px)'
    })
    const { userData } = useContext(UserContext);
    const history = useHistory()
    const [userRobots, setUserRobots] = useState()
    const [cookies] = useCookies(["user"]);
    // const [embedSource, setEmbedSource] = useState("https://robotapi.isensetune.com/video_feed");

    const [prescribedTasks, setPrescribedTasks] = useState([])
    const [vitalHistory, setVitalHistory] = useState([])


    const upPress = useKeyPress("w");
    const leftPress = useKeyPress("a");
    const downPress = useKeyPress("s");
    const rightPress = useKeyPress("d");
    const leftRotatePress = useKeyPress("q");
    const rightRotatePress = useKeyPress("e");
    const headUpPress = useKeyPress("i");
    const headDownPress = useKeyPress("k");
    const headLeftPress = useKeyPress("j");
    const headRightPress = useKeyPress("l");


    const [clickVal, setClickVal] = useState(0)
    // const rightClick = useKeyPress("d");
    // const leftRotateClick = useKeyPress("q");
    // const rightRotateClick = useKeyPress("e");
    // const headUpClick = useKeyPress("i");
    // const headDownClick = useKeyPress("k");
    // const headLeftClick = useKeyPress("j");
    // const headRightClick = useKeyPress("l");
    const [keyboardNav, setKeyboardNav] = useState(true);
    const [obstacleAv, setObstacleAv] = useState(true);
    const [faceTrack, setFaceTrack] = useState(false)

    const [prescriptionMsg, setPrescriptionMsg] = useState("");
    const [prescriptionType, setPrescriptionType] = useState("")
    const [prescriptionPriority, setPrescriptionPriority] = useState("")
    const [prescriptionSchedule, setPrescriptionSchedule] = useState(new Date())

    const [barProgress, setBarProgress] = useState(0)
    const [vitalData, setVitalData] = useState("")
    const [disableNavButtons,setDisableNavButtons] = useState(false)

    const alert = useAlert()
    const [errorNotice, setErrorNotice] = useState()
    const [successNotice, setSuccessNotice] = useState()
    const [sonarData, setSonarData] = useState({ "front": 500, "back": 500 })
    
    const [showHelp, setShowHelp] = useState(false);

    const iframeContainer = useRef(null)
    // const [paddingLeft,setPaddingLeft]=useState(25);
    // const [paddingRight,setPaddingRight]=useState(25);
    // const [paddingTop,setPaddingTop]=useState(25);
    // const [paddingBottom,setPaddingBottom]=useState(25);

    // socket.on("recHeadMovement",data=>{
    //     if(data=="up"){
    //         setPaddingTop(paddingTop-0.125)
    //         setPaddingBottom(paddingBottom+0.125)
    //     }
    //     else if(data=="down"){
    //         setPaddingTop(paddingTop+0.125)
    //         setPaddingBottom(paddingBottom-0.125)
    //     }
    //     else if(data=="left"){
    //         setPaddingLeft(paddingLeft-0.125)
    //         setPaddingRight(paddingRight+0.125)
    //     }
    //     else if(data=="right"){
    //         setPaddingLeft(paddingLeft+0.125)
    //         setPaddingRight(paddingRight-0.125)
    //     }
    //     else if(data=="reset"){
    //         setPaddingLeft(25)
    //         setPaddingRight(25)
    //         setPaddingTop(25)
    //         setPaddingBottom(25)
    //     }
    // })

    socket.on("TOSONARDATA", data => {
        //console.log(data)
        setSonarData(() => data);
    });
    socket.on("TOFACETRACKDATA", data => {
        //console.log(data)
        // setFaceTrackStatus(() => data)
        if(data==0){
            setFaceTrack(false)
        }
        else{
            setFaceTrack(true)
        }

    })
    socket.on("FPSDATA",data=>{
        console.log(data)
    })

    useEffect(() => {
        if (faceTrack === false) {
            socket.emit("SENDFACETRACKSTATUS", 0)
        }
        else {
            socket.emit("SENDFACETRACKSTATUS", 1)
        }
    }, [faceTrack])

    useEffect(() => {
        const sendKeySignal = () => {
            if (clickVal != 0 && localStorage.getItem("roomsize") > 0) {
                if(clickVal==="forward"){
                    if(sonarData.front>=0.50){
                        socket.emit("frontenddata", clickVal)
                    }
                }
                else if(clickVal==="back"){
                    if(sonarData.back>0.50){
                        socket.emit("frontenddata", clickVal)
                    }
                }
                else {
                    socket.emit("frontenddata", clickVal)
                }
            }
        }
        sendKeySignal()
    })

    useEffect(() => {
        if (clickVal === 0) {
            socket.emit("frontenddata", "nullmotion")
        }
    }, [clickVal])

    useEffect(() => {
        if (successNotice) {
            alert.success(<div style={{ 'fontSize': '0.70em' }}>{successNotice}</div>)
            setSuccessNotice(() => undefined)
        }
    }, [successNotice])

    useEffect(() => {
        if (errorNotice) {
            alert.error(<div style={{ 'fontSize': '0.70em' }}>{errorNotice}</div>)
            setErrorNotice(() => undefined)
        }
    }, [errorNotice])

    useState(() => {
        const compMount = async () => {
            setShowHelp(()=>false)
            setUserRobots(() => ["Pepper"])

            let token = localStorage.getItem("auth-token");
            try {
                const res = await Axios.get(
                    "/api/telecare/prescription",
                    { headers: { "x-auth-token": token } }
                )
                var tempTasks = []
                for (var i = 0; i < res.data.length; i++) {
                    tempTasks.push(res.data[i])
                }
                setPrescribedTasks(() => tempTasks)


            } catch (error) {
                //console.log(error)
            }
            try {
                const res = await Axios.get(
                    "/api/telecare/measurement",
                    { headers: { "x-auth-token": token } }
                )
                var tempMeasurement = []
                for (var i = 0; i < res.data.length; i++) {
                    var item=res.data[i]
                    item.id=i+1
                    tempMeasurement.push(item)
                }
                setVitalHistory(() => tempMeasurement)


            } catch (error) {
                //console.log(error)
            }
            // if (token == null) {
            //     localStorage.setItem("auth-token", "");
            //     token = "";
            // }
            // else {
            //     const tokenResponse = await Axios.post(
            //         "/api/users/tokenIsValid",
            //         null,
            //         { headers: { "x-auth-token": token } }
            //     );
            //     // //console.log(searchQuery)

            //     if (tokenResponse.data) {
            //         try {
            //             const res = await Axios.get(
            //                 "/api/telecare/prescription",
            //                 { headers: { "x-auth-token": token } }
            //             )
            //             var tempTasks = []
            //             for (var i = 0; i < res.data.length; i++) {
            //                 tempTasks.push(res.data[i])
            //             }
            //             setPrescribedTasks(() => tempTasks)


            //         } catch (error) {
            //             //console.log(error)
            //         }
            //     }
            // }
            
            // if (localStorage.getItem("roomsize") === 0) {
            //     var iframeItem = iframeContainer.current.contentWindow;
            //     // const roomsize=iframeItem.localStorage.getItem("roomsize")
            //     // //console.log(roomsize)
            //     iframeItem.postMessage("DONTSTARTCALL", "*")
            // }

        }
        const handler = async (e) => {
            try {
                const tempRoomdt = JSON.parse(e.data)
                localStorage.setItem("roomsize", tempRoomdt.roomsize)
            }
            catch (err) {
                void (0)
            }
            // localStorage.setItem("roomsize",JSON.parse(e.data))
        }
        // const loadPrescriptions = async (data) => {
        //     var tempTasks = []
        //     for (var i = 0; i < data.length; i++) {
        //         tempTasks.push(data.data[i])
        //     }
        //     setPrescribedTasks(() => tempTasks)
        // }
        compMount()
        window.addEventListener("message", handler)
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
        if (vitalData !== "") {
            setSuccessNotice(() => vitalData)
            setVitalData("")
        }
    }, [vitalData])

    const validateToken = async (e) => {
        let token = localStorage.getItem("auth-token");
        if (token == null) {
            localStorage.setItem("auth-token", "");
            token = "";
            return 0
        }
        else {
            const tokenResponse = await Axios.post(
                "/api/users/tokenIsValid",
                null,
                { headers: { "x-auth-token": token } }
            );
            // //console.log(searchQuery)

            if (tokenResponse.data) {
                return (token)
            }
            else {
                return 0
            }
        }
    }


    const handleMovement = (data) => {
        if (keyboardNav && localStorage.getItem("roomsize") > 0) {
            if(data=="forward"){
                if(sonarData.front>0.50){
                    socket.emit("frontenddata", data)
                }                
            }
            else if(data=="back"){
                if(sonarData.back>0.50){
                    socket.emit("frontenddata", data)
                }                
            }
            else{
                socket.emit("frontenddata", data)
            }
            // socket.emit("frontenddata", data)
        }
    }

    const handlePrescribedTasks = async (data) => {
        var tempTasks = []
        for (var i = 0; i < data.length; i++) {
           
            tempTasks.push(data[i])
        }
        setPrescribedTasks(tempTasks)
    }
    const handleNewPrescription = async () => {
        if (prescriptionMsg !== "") {
            try {
                let token = await validateToken();
                if (token !== 0) {
                    //console.log(userData.user.username)
                    const body = { username: userData.user.username, patientname: "maurodragone", prescriptionMsg: prescriptionMsg, prescriptionSchedule: prescriptionSchedule.toLocaleString(), prescriptionType: prescriptionType, prescriptionPriority: prescriptionPriority }
                    const res = await Axios.post("/api/telecare/prescription/new",
                        body,
                        { headers: { "x-auth-token": token } }
                    )
                    handlePrescribedTasks(res.data)
                    setSuccessNotice("Task to the robot assigned successfully")
                }
            } catch (err) {
                setErrorNotice("Could not assign task to the robot")
            }
        }
        else {
            setErrorNotice("Prescription details was not specified")
        }
    }
    const handlePrescribedMeasurements = async (data) => {
        var tempMeasurements = []
        for (var i = 0; i < data.length; i++) {
            var item=data[i]
            item.id=i+1
            tempMeasurements.push(item)
        }
        setVitalHistory(tempMeasurements)
    }
    const handleNewMeasurement = async (type,data) => {
        try {
            let token = await validateToken();
            if (token !== 0) {
                const body = { username: userData.user.username, patientname: "maurodragone", measurementDate:new Date().toLocaleDateString("en-GB"),measurementType:type,measurementData:data }
                const res = await Axios.post("/api/telecare/measurement/new",
                    body,
                    { headers: { "x-auth-token": token } }
                )
                handlePrescribedMeasurements(res.data)
                // setSuccessNotice("Task to the robot assigned successfully")
            }
        } catch (err) {
            //console.log(err)
            setErrorNotice("Could not update to the database")
        }
    }
    const handleDisconnect = async () => {
        var iframeItem = iframeContainer.current.contentWindow;
        iframeItem.postMessage("STOPCALL", "*")
    }

    const handleConnect = async () => {
        if (localStorage.getItem("roomsize") > 0) {
            var iframeItem = iframeContainer.current.contentWindow;
            // const roomsize=iframeItem.localStorage.getItem("roomsize")
            // //console.log(roomsize)
            iframeItem.postMessage("STARTCALL", "*")
        }
    }
    const onPressureMeasurementClicked = async () => {
        setDisableNavButtons(true)
        setBarProgress(0)
        setVitalData("")
        // var completionTime = 7 + Math.random() * (4 - 1)
        var completionTime = 9
        setTimeout(() => {
            // //console.log(t);
            setBarProgress(20);
        }, 1000 * (1))
        setTimeout(() => {
            // //console.log(t);
            setBarProgress(40);
        }, 1000 * (3))
        setTimeout(() => {
            // //console.log(t);
            setBarProgress(60);
        }, 1000 * (5))
        setTimeout(() => {
            // //console.log(t);
            setBarProgress(80);
        }, 1000 * (6))
        setTimeout(() => {
            // //console.log(t);
            setBarProgress(100);
        }, 1000 * (9))
        
        setTimeout(() => {
            setBarProgress(0)
            var randTopPressureVal = Math.floor(115 + Math.random() * (125 - 115));
            var randBottomPressureVal = Math.floor(75 + Math.random() * (85 - 75));
            setVitalData(randTopPressureVal.toString() + "/" + randBottomPressureVal+" mmHg");
            setDisableNavButtons(false)
            handleNewMeasurement("bp",{"top":randTopPressureVal,"bottom":randBottomPressureVal})

        }, (completionTime + 2) * 1000)

    }
    const onPulseMeasurementClicked = async () => {
        setDisableNavButtons(true)
        setBarProgress(0)
        setVitalData("")
        // var completionTime = 7 + Math.random() * (4 - 1)
        var completionTime = 9
        setTimeout(() => {
            // //console.log(t);
            setBarProgress(20);
        }, 1000 * (1))
        setTimeout(() => {
            // //console.log(t);
            setBarProgress(40);
        }, 1000 * (3))
        setTimeout(() => {
            // //console.log(t);
            setBarProgress(60);
        }, 1000 * (5))
        setTimeout(() => {
            // //console.log(t);
            setBarProgress(80);
        }, 1000 * (6))
        setTimeout(() => {
            // //console.log(t);
            setBarProgress(100);
        }, 1000 * (9))
        
        setTimeout(() => {
            setBarProgress(0)
            var randTopPressureVal = Math.floor(75 + Math.random() * (85 - 75));
            setVitalData(randTopPressureVal.toString() + "BPM");            
            handleNewMeasurement("pulse",{"top":randTopPressureVal})
            setDisableNavButtons(false)
        }, (completionTime + 2) * 1000)

    }
    const onTempMeasurementClicked = async () => {
        setDisableNavButtons(true)
        setBarProgress(0)
        setVitalData("")
        // var completionTime = 7 + Math.random() * (4 - 1)
        var completionTime = 9
        setTimeout(() => {
            // //console.log(t);
            setBarProgress(20);
        }, 1000 * (1))
        setTimeout(() => {
            // //console.log(t);
            setBarProgress(40);
        }, 1000 * (3))
        setTimeout(() => {
            // //console.log(t);
            setBarProgress(60);
        }, 1000 * (5))
        setTimeout(() => {
            // //console.log(t);
            setBarProgress(80);
        }, 1000 * (6))
        setTimeout(() => {
            // //console.log(t);
            setBarProgress(100);
        }, 1000 * (9))
        
        setTimeout(() => {
            var randTopPressureVal = Math.floor(37 + Math.random() * (25 - 15),);
            setVitalData(randTopPressureVal.toString() + " °C");
            setBarProgress(0)
            setDisableNavButtons(false)
            handleNewMeasurement("temperature",{"top":randTopPressureVal})
        }, (completionTime + 2) * 1000)
    }
    
    return (
        <Fragment>
            {userRobots ? <Fragment>
                {upPress && handleMovement("forward")}
                {leftPress && handleMovement("left")}
                {downPress && handleMovement("back")}
                {rightPress && handleMovement("right")}
                {leftRotatePress && handleMovement("rotate_left")}
                {rightRotatePress && handleMovement("rotate_right")}

                {headUpPress && handleMovement("head_up")}
                {headDownPress && handleMovement("head_down")}
                {headLeftPress && handleMovement("head_left")}
                {headRightPress && handleMovement("head_right")}


                {isDesktopOrLaptop ? (
                    <Fragment>
                        <Row>
                            <Col md="8" className="pr-1" >
                                <div >
                                    <ResponsiveEmbed aspectRatio="16by9" >
                                        {/* {
                                        localStorage.getItem("roomsize")>0? (
                                            <iframe title="kal" id="iframeTelecallContainer" ref={iframeContainer} src="https://hwu-telepresence-room.herokuapp.com/" allow="geolocation; microphone; camera" />
                                        ):(
                                            <Image src={Offline} />
                                        )
                                    }                                     */}
                                        <iframe title="kal" id="iframeTelecallContainer" ref={iframeContainer} src="https://hwu-telepresence-room.herokuapp.com/" allow="geolocation; microphone; camera" />
                                    </ResponsiveEmbed>
                                </div>

                            </Col>
                            <Col md="4" className="pl-1 scroll-column">

                                <ControlPanel keyboardNav={keyboardNav} setKeyboardNav={setKeyboardNav} history={history} setPrescriptionMsg={setPrescriptionMsg} setPrescriptionType={setPrescriptionType} prescriptionType={prescriptionType} setPrescriptionSchedule={setPrescriptionSchedule} prescriptionSchedule={prescriptionSchedule} handleNewPrescription={handleNewPrescription} obstacleAv={obstacleAv} setObstacleAv={setObstacleAv} setClickVal={setClickVal} handleDisconnect={handleDisconnect} handleConnect={handleConnect} barProgress={barProgress} onPressureMeasurementClicked={onPressureMeasurementClicked} onTempMeasurementClicked={onTempMeasurementClicked} onPulseMeasurementClicked={onPulseMeasurementClicked} setFaceTrack={setFaceTrack} faceTrack={faceTrack} setPrescriptionPriority={setPrescriptionPriority} prescriptionPriority={prescriptionPriority} setShowHelp={setShowHelp} disableNavButtons={disableNavButtons} sonarData={sonarData} />
                                {/* paddingBottom={paddingBottom} paddingTop={paddingTop} paddingRight={paddingRight} paddingLeft={paddingLeft} */}

                                <DoctorWidget prescribedTasks={prescribedTasks} vitalHistory={vitalHistory} />
                            </Col>

                        </Row>
                        <HelpModal showHelp={showHelp} setShowHelp={setShowHelp}/>
                    </Fragment>

                ) : (
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
