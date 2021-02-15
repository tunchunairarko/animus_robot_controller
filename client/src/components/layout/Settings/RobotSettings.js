import React, {useState, useEffect, Fragment} from 'react'
import ModuleHeader from "../ModuleHeader/ModuleHeader";
import UserContext from "../../../context/UserContext";
import { useCookies } from "react-cookie";

export default function RobotSettings() {
    const [cookies] = useCookies(["user"]);
    

    

    return (
        <Fragment>
            <ModuleHeader moduleName={"Robot Settings"}/>
        </Fragment>
    )
}
