import React, { Fragment, useState, useContext, useEffect, useRef } from 'react'
import Axios from "axios";
import { ResponsiveEmbed, Row, Col, Button,Image } from 'react-bootstrap'
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
import delay from "delay";
import Offline from "../../assets/offline-background.gif";

const socket = io();


export default function Dashboard() {
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-device-width: 1224px)'
    })
    const { userData } = useContext(UserContext);
    const history = useHistory()
    const [userRobots, setUserRobots] = useState()
    const [cookies] = useCookies(["user"]);

    const [toggleState, setToggleState] = useState(false)
    // const [embedSource, setEmbedSource] = useState("https://robotapi.isensetune.com/video_feed");

    const [prescribedTasks, setPrescribedTasks] = useState([])
    const [vitalHistory, setVitalHistory] = useState([])


    const upPress = useKeyPress("w");
    const leftPress = useKeyPress("a");
    const rightPress = useKeyPress("d");
    const leftRotatePress = useKeyPress("q");
    const rightRotatePress = useKeyPress("e");
    const headUpPress = useKeyPress("i");
    const headDownPress = useKeyPress("k");
    const headLeftPress = useKeyPress("j");
    const headRightPress = useKeyPress("l");

    const [upClick, setUpClick] = useState(false);
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
    const [faceTrack,setFaceTrack] = useState(true)

    const [prescriptionMsg, setPrescriptionMsg] = useState("");
    const [prescriptionType, setPrescriptionType] = useState("")
    const [urgencyLevel,setUrgencyLevel] = useState("")
    const [prescriptionSchedule, setPrescriptionSchedule] = useState(new Date())

    const [barProgress,setBarProgress]=useState(0)
    const [vitalData,setVitalData] = useState("")

    const alert = useAlert()
    const [errorNotice, setErrorNotice] = useState()
    const [successNotice, setSuccessNotice] = useState()
    const [sonarData,setSonarData] = useState({"front":500,"back":500})
    // const [faceTrackStatus,setFaceTrackStatus]=useState(0)

    const iframeContainer = useRef(null)

    socket.on("TOSONARDATA", data => {
        console.log(data)
        setSonarData(data);
    });
    socket.on("TOFACETRACKDATA",data=>{
        console.log(data)
        setFaceTrack(data)
    })

    useEffect(()=>{
        const sendKeySignal = async() =>{
            if(clickVal!==0 && localStorage.getItem("roomsize")>0){
                console.log(clickVal)
                socket.emit("frontenddata",clickVal)
            }
        }
        sendKeySignal()
    })
    useEffect(()=>{
        if(clickVal===0){
            socket.emit("frontenddata","nullmotion")
        }
    },[clickVal])

    useEffect(() => {
        if (successNotice) {
            alert.success(<div style={{ 'fontSize': '0.70em' }}>{successNotice}</div>)
            setSuccessNotice(undefined)
        }
    }, [successNotice])

    useEffect(() => {
        if (errorNotice) {
            alert.error(<div style={{ 'fontSize': '0.70em' }}>{errorNotice}</div>)
            setErrorNotice(undefined)
        }
    }, [errorNotice])
    useState(() => {
        const compMount = async () => {
            setUserRobots(["Pepper"])
            
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
                    try {
                        const res = await Axios.get(
                            "/api/telecare/prescription",
                            { headers: { "x-auth-token": token } }
                        )

                        handlePrescribedTasks(res.data)
                    } catch (error) {
                        console.log(error)

                    }
                }
            }
            setVitalHistory([
                { "dateAndTime": "10 May", "temperature": "37.2", "heartRate": "80", "bloodPressure": "119/81" },
                { "dateAndTime": "10 May", "temperature": "37.1", "heartRate": "65", "bloodPressure": "119/80" },
                { "dateAndTime": "11 May", "temperature": "37.3", "heartRate": "92", "bloodPressure": "121/75" },
                { "dateAndTime": "12 May", "temperature": "37.4", "heartRate": "76", "bloodPressure": "122/85" },
            ])
            if(localStorage.getItem("roomsize")===0){
                var iframeItem = iframeContainer.current.contentWindow;
                // const roomsize=iframeItem.localStorage.getItem("roomsize")
                // console.log(roomsize)
                iframeItem.postMessage("DONTSTARTCALL","*")
            }
            
        }
        const handler = async(e) => {
            try{
                const tempRoomdt = JSON.parse(e.data)
                localStorage.setItem("roomsize",tempRoomdt.roomsize)
            }
            catch(err){
                void(0)
            }
            // localStorage.setItem("roomsize",JSON.parse(e.data))
        }
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
        const getData = async (e) => {
            if (toggleState === true) {
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

    useEffect(()=>{
        if(vitalData!==""){
            setSuccessNotice(vitalData)
            setVitalData("")
        }
    },[vitalData])

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
            // console.log(searchQuery)

            if (tokenResponse.data) {
                return (token)
            }
            else {
                return 0
            }
        }
    }


    const handleMovement = (data) => {
        if(keyboardNav){
            socket.emit("frontenddata", data)
        }
    }

    const handlePrescribedTasks = async (data) => {
        var tempTasks = []
        for (var i = 0; i < data.length; i++) {
            var dt = data[i].prescriptionSchedule
            var msg = data[i].prescriptionMsg
            var task = data[i].prescriptionType
            var curTask = { "dateAndTime": dt, "prescribedAction": "" }
            if (task === "Medication") {
                curTask.prescribedAction = "Remind patient to take " + msg
            }
            else if (task === "Therapy") {
                curTask.prescribedAction = "Remind patient to attend " + msg + " therapy lesson"
            }
            else if (task === "Diet") {
                curTask.prescribedAction = "Remind patient to eat " + msg
            }
            else {
                curTask.prescribedAction = msg
            }
            tempTasks.push(curTask)
        }
        setPrescribedTasks(tempTasks)
    }
    const handleNewPrescription = async () => {
        // console.log(prescriptionMsg)
        // console.log(prescriptionType)
        // console.log(prescriptionSchedule.toLocaleString())

        if (prescriptionMsg !== "") {
            try {
                let token = await validateToken();
                if (token !== 0) {
                    console.log(userData.user.username)
                    const body = { username: userData.user.username, patientname: "maurodragone", prescriptionMsg: prescriptionMsg, prescriptionSchedule: prescriptionSchedule.toLocaleString(), prescriptionType: prescriptionType }
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

    const handleDisconnect = async() =>{
        var iframeItem = iframeContainer.current.contentWindow;
        // console.log(document.getElementById("iframeTelecallContainer").contentWindow.getElementById("gobackTelecareCall").click())
        // iframeItem.contentWindow.getElementById("gobackTelecareCall").click()
        iframeItem.postMessage("STOPCALL","*")
    }
    
    const handleConnect = async() =>{
        if(localStorage.getItem("roomsize")>0){
            var iframeItem = iframeContainer.current.contentWindow;
            // const roomsize=iframeItem.localStorage.getItem("roomsize")
            // console.log(roomsize)
            iframeItem.postMessage("STARTCALL","*")
        }
    }
    const onPressureMeasurementClicked= async()=>{
        setBarProgress(0)
        setVitalData("")
        // var completionTime = 7 + Math.random() * (4 - 1)
        var completionTime = 9
        setTimeout(() => {                
            // console.log(t);
            setBarProgress(20);
        }, 1000*(1))
        setTimeout(() => {                
            // console.log(t);
            setBarProgress(40);
        }, 1000*(3))
        setTimeout(() => {                
            // console.log(t);
            setBarProgress(60);
        }, 1000*(5))
        setTimeout(() => {                
            // console.log(t);
            setBarProgress(80);
        }, 1000*(6))
        setTimeout(() => {                
            // console.log(t);
            setBarProgress(100);
        }, 1000*(9))
        // for(var i=0; i<completionTime; i++){
        //     // var t = barProgress + (Math.floor(100 / completionTime));
        //     // eslint-disable-next-line no-loop-func
        //     setTimeout(() => {                
        //         // console.log(t);
        //         setBarProgress(Math.floor(100/completionTime)*i);
        //     }, 1000*(i+1))            
        // }
        // var randTopPressureVal = Math.floor(115 + Math.random() * (10 - 1));
        // var randBottomPressureVal = Math.floor(75 + Math.random() * (10 - 1));
        // setVitalData(randTopPressureVal.toString() + "/" + randBottomPressureVal);
        setTimeout(() => {
            setBarProgress(0)
            var randTopPressureVal = Math.floor(115 + Math.random() * (125 - 115));
            var randBottomPressureVal = Math.floor(75 + Math.random() * (85 - 75));
            setVitalData(randTopPressureVal.toString() + "/" + randBottomPressureVal);
            
        }, (completionTime+2) * 1000)

    }
    const onPulseMeasurementClicked= async()=>{
        setBarProgress(0)
        setVitalData("")
        // var completionTime = 7 + Math.random() * (4 - 1)
        var completionTime = 9
        setTimeout(() => {                
            // console.log(t);
            setBarProgress(20);
        }, 1000*(1))
        setTimeout(() => {                
            // console.log(t);
            setBarProgress(40);
        }, 1000*(3))
        setTimeout(() => {                
            // console.log(t);
            setBarProgress(60);
        }, 1000*(5))
        setTimeout(() => {                
            // console.log(t);
            setBarProgress(80);
        }, 1000*(6))
        setTimeout(() => {                
            // console.log(t);
            setBarProgress(100);
        }, 1000*(9))
        // for(var i=0; i<completionTime; i++){
        //     // var t = barProgress + (Math.floor(100 / completionTime));
        //     // eslint-disable-next-line no-loop-func
        //     setTimeout(() => {                
        //         // console.log(t);
        //         setBarProgress(Math.floor(100/completionTime)*i);
        //     }, 1000*(i+1))            
        // }
        // var randTopPressureVal = Math.floor(115 + Math.random() * (10 - 1));
        // var randBottomPressureVal = Math.floor(75 + Math.random() * (10 - 1));
        // setVitalData(randTopPressureVal.toString() + "/" + randBottomPressureVal);
        setTimeout(() => {
            var randTopPressureVal = Math.floor(75 + Math.random() * (85 - 75));
            
            setVitalData(randTopPressureVal.toString() + "BPM" );
            setBarProgress(0)
        }, (completionTime+2) * 1000)
        
    }
    const onTempMeasurementClicked= async()=>{
        setBarProgress(0)
        setVitalData("")
        // var completionTime = 7 + Math.random() * (4 - 1)
        var completionTime = 9
        setTimeout(() => {                
            // console.log(t);
            setBarProgress(20);
        }, 1000*(1))
        setTimeout(() => {                
            // console.log(t);
            setBarProgress(40);
        }, 1000*(3))
        setTimeout(() => {                
            // console.log(t);
            setBarProgress(60);
        }, 1000*(5))
        setTimeout(() => {                
            // console.log(t);
            setBarProgress(80);
        }, 1000*(6))
        setTimeout(() => {                
            // console.log(t);
            setBarProgress(100);
        }, 1000*(9))
        // for(var i=0; i<completionTime; i++){
        //     // var t = barProgress + (Math.floor(100 / completionTime));
        //     // eslint-disable-next-line no-loop-func
        //     setTimeout(() => {                
        //         // console.log(t);
        //         setBarProgress(Math.floor(100/completionTime)*i);
        //     }, 1000*(i+1))            
        // }
        // var randTopPressureVal = Math.floor(115 + Math.random() * (10 - 1));
        // var randBottomPressureVal = Math.floor(75 + Math.random() * (10 - 1));
        // setVitalData(randTopPressureVal.toString() + "/" + randBottomPressureVal);
        setTimeout(() => {
            var randTopPressureVal = Math.floor(37 + Math.random() * (85 - 75),);
            
            setVitalData(randTopPressureVal.toString() + "BPM" );
            setBarProgress(0)
        }, (completionTime+2) * 1000)
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


                {isDesktopOrLaptop ? (
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

                            <ControlPanel keyboardNav={keyboardNav} setKeyboardNav={setKeyboardNav} history={history} setPrescriptionMsg={setPrescriptionMsg} setPrescriptionType={setPrescriptionType} prescriptionType={prescriptionType} setPrescriptionSchedule={setPrescriptionSchedule} prescriptionSchedule={prescriptionSchedule} handleNewPrescription={handleNewPrescription} obstacleAv={obstacleAv} setObstacleAv={setObstacleAv} setClickVal={setClickVal} handleDisconnect={handleDisconnect} handleConnect={handleConnect} barProgress={barProgress} onPressureMeasurementClicked={onPressureMeasurementClicked} onTempMeasurementClicked={onTempMeasurementClicked} onPulseMeasurementClicked={onPulseMeasurementClicked} vitalData={vitalData} setFaceTrack={setFaceTrack} faceTrack={faceTrack} setUrgencyLevel={setUrgencyLevel} urgencyLevel={urgencyLevel}/>

                            <DoctorWidget prescribedTasks={prescribedTasks} vitalHistory={vitalHistory} />
                        </Col>
                    </Row>
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
