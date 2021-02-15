import React, { Fragment, useState, useContext, useEffect } from 'react'
import Axios from "axios";
import { CardDeck, Row, Col, Button, ResponsiveEmbed, ButtonGroup, ToggleButton } from 'react-bootstrap'
import "../../../components/assets/style.css";
import { FaClock, FaUndo, FaPowerOff } from 'react-icons/fa';
import ModuleHeader from "../ModuleHeader/ModuleHeader";
import Total from "../../assets/sigma.png";
import Best from "../../assets/server.png";
import Upload from "../../assets/upload.png";
import DashCard from "./DashCard";
import { useDidMount } from "react-hooks-lib";
import { useCookies } from "react-cookie";

export default function Dashboard() {
    // const [userUpload,setUserUpload]=useState("-");
    // const [totalUpload,setTotalUpload]=useState("-");
    // const [bestUploader,setBestUploader]=useState("-");
    const [cookies] = useCookies(["user"]);
    const [validation, setValidator] = useState("");
    const [toggleState, setToggleState] = useState(false)

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

                            if (robotRes.data) {
                                console.log(robotRes.data)
                            }

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
                        style={{ 'font-size': '3em' }}
                        checked={toggleState}
                        value="1"
                        onChange={(e) => setToggleState(e.currentTarget.checked)}
                    >
                        <FaPowerOff />
                    </ToggleButton>
                </ButtonGroup>
                
                <div style={{ width: 660, height: 'auto', border: 'solid 3px #bbb', borderRadius: '5px' }}>
                    <ResponsiveEmbed aspectRatio="16by9">
                        <embed type="image/svg+xml" src="https://react-bootstrap.github.io/TheresaKnott_castle.svg" />
                    </ResponsiveEmbed>
                </div>
            </center>


        </Fragment>
    )
}
