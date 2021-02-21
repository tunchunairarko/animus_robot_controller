import React, { Fragment, useState, useContext, useEffect } from 'react'
import Axios from "axios";
import { CardDeck, Row, Col, Button, ResponsiveEmbed, ButtonGroup, ToggleButton } from 'react-bootstrap'
import "../../../components/assets/style.css";
import { FaClock, FaUndo, FaPowerOff } from 'react-icons/fa';
import ModuleHeader from "../ModuleHeader/ModuleHeader";
import { useCookies } from "react-cookie";
import socketIOClient from "socket.io-client";
import UserContext from "../../../context/UserContext";
import ReactNipple from 'react-nipple';
import 'react-nipple/lib/styles.css';


export default function Dashboard() {
    // const [userUpload,setUserUpload]=useState("-");
    // const [totalUpload,setTotalUpload]=useState("-");
    // const [bestUploader,setBestUploader]=useState("-");
    const {tempEmail,tempPassword} = useContext(UserContext)
    const [cookies] = useCookies(["user"]);
    const [validation, setValidator] = useState("");
    const [toggleState, setToggleState] = useState(false)
    const [embedSource, setEmbedSource] = useState("https://react-bootstrap.github.io/TheresaKnott_castle.svg");

    useEffect(()=>{
        const startRobot = async(e) =>{
            if(toggleState){
                const body={email:tempEmail,password:tempPassword}
                const response = await Axios.post(
                    "http://hwutelepresence.robot:6475/",
                    body,
                    {headers:{"Content-Type":"application/json", "Access-Control-Allow-Origin":"*"}}
                );
                
                if(response.status==200){
                    Axios.get(
                        "http://hwutelepresence.robot:6475/start",
                        null,
                        {headers:{"Content-Type":"application/json", "Access-Control-Allow-Origin":"*"}}
                    ).then(function(response){
                        setEmbedSource("http://hwutelepresence.robot:6475/video_feed")
                    })
                    
                }
                //setEmbedSource("http://hwutelepresence.robot:6475/video_feed")
            }
            else{
                // const response = await Axios.get(
                //     "http://hwutelepresence.robot:6475/stop",
                //     null,
                //     {headers:{"Content-Type":"application/json", "Access-Control-Allow-Origin":"*"}}
                // );
                setEmbedSource("https://react-bootstrap.github.io/TheresaKnott_castle.svg")
            }
        }
        startRobot()
    },[toggleState])


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

    return (
        <Fragment>
            <ModuleHeader moduleName={"Dashboard"} />
            {/* <Row >
                <Col className="mb-2" sm align="right">
                    
                    <small className="text-muted mr-2 ml-2" onClick={() => window.location.reload(false)}> <a href="#"><FaUndo /> Refresh data</a> </small>
                </Col>               
            </Row> */}
            {/* <CardDeck >
                <DashCard title={"User upload"} value={userUpload} image={Upload} />
                <DashCard title={"Total upload"} value={totalUpload} image={Total} />
                <DashCard title={"Best uploader"} value={bestUploader} image={Best} />
            </CardDeck> */}

            <center>
                <ButtonGroup toggle className="mb-2">
                    <ToggleButton
                        type="checkbox"
                        variant="info"
                        style={{ fontSize: '3em' }}
                        checked={toggleState}
                        value="1"
                        onChange={(e) => setToggleState(e.currentTarget.checked)}
                    >
                        <FaPowerOff />
                    </ToggleButton>
                </ButtonGroup>
                
                <div style={{ width: 660, height: 'auto', border: 'solid 3px #bbb', borderRadius: '5px' }}>
                    <ResponsiveEmbed aspectRatio="16by9">
                        <embed type="image/svg+xml" src={embedSource} />
                    </ResponsiveEmbed>
                </div>
                <ReactNipple
                    // supports all nipplejs options
                    // see https://github.com/yoannmoinet/nipplejs#options
                    options={{ mode: 'static', position: { top: '50%', left: '50%' } }}
                    // any unknown props will be passed to the container element, e.g. 'title', 'style' etc
                    style={{
                        outline: '1px dashed red',
                        width: 150,
                        height: 150,
                        color: 'blue',
                        background: 'green'
                        // if you pass position: 'relative', you don't need to import the stylesheet
                    }}
                    // all events supported by nipplejs are available as callbacks
                    // see https://github.com/yoannmoinet/nipplejs#start
                    onMove={(evt, data) => console.log(evt, data)}
                />
            </center>


        </Fragment>
    )
}
