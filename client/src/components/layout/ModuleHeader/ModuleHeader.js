import React, { Fragment, useState, useEffect } from 'react'
import { Nav, Navbar, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useCookies } from "react-cookie";
import DropdownList from "react-widgets/DropdownList";
import "react-widgets/styles.css";
import { RiSignalWifiOffLine } from "react-icons/ri";
import { FcEmptyBattery } from "react-icons/fc";

export default function ModuleHeader() {

    const [curTime, setCurTime] = useState();
    const [dispName, setDispName] = useState("");
    // const { userData } = useContext(UserContext);
    const [cookies] = useCookies(["user"]);

    const [dummyRoomData, setDummyRoomData] = useState(
        [
            { "robot": "Remote User: Mauro Dragone, Currie, Edinburgh" }
        ]
    )

    useEffect(() => {
        setInterval(() => {
            setCurTime(new Date().toLocaleTimeString())
            if (!dispName) {
                if (cookies.username) {
                    setDispName(cookies.username)
                }
            }
        }, 1000)
    })

    return (
        <Fragment>
            <Navbar collapseOnSelect expand="lg" variant="light" bg="light" className="moduleHeader">
                <Nav style={{ minWidth: "30%" }}>
                    <DropdownList
                        defaultValue="Remote User: Mauro Dragone, Currie, Edinburgh"
                        data={dummyRoomData}
                        textField='robot'
                    />
                </Nav>

                <Navbar.Toggle />

                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text className="navText">
                        Current time: {curTime}
                    </Navbar.Text>
                    {/* <Navbar.Text className="navText">
                        Signed in as: <a href="/login">{wifiSpeed}</a>
                    </Navbar.Text> */}

                    <Nav>
                        <OverlayTrigger placement="bottom" overlay={<Tooltip >Telecare connection strength</Tooltip>}>
                            <Button variant="light" className="mr-2"><RiSignalWifiOffLine /></Button>
                        </OverlayTrigger>
                        <OverlayTrigger placement="bottom" overlay={<Tooltip >Robot's battery level</Tooltip>}>
                            <Button variant="light" className="mr-2"><FcEmptyBattery /></Button>
                        </OverlayTrigger>
                        {/* <OverlayTrigger placement="bottom" overlay={<Tooltip >Connect </Tooltip>}>
                            <Button variant="success" className="mr-2"><AiFillApi /></Button>
                        </OverlayTrigger>
                        <OverlayTrigger placement="bottom" overlay={<Tooltip >Disconnect</Tooltip>}>
                            <Button variant="danger"><AiOutlineDisconnect /></Button>
                        </OverlayTrigger>*/}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Fragment>
    )
}
