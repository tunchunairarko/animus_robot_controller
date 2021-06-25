import React, { useState, Fragment, useContext, useEffect } from 'react'
import PrivateRoute from "../../../router/PrivateRoute";
import Aside from '../Aside/Aside';
import Sidebar from "../Sidebar/Sidebar";
import 'react-pro-sidebar/dist/css/styles.css';
import { FaBars } from 'react-icons/fa';
import '../../assets/Dashboard.scss';
// import RobotSettings from '../Settings/RobotSettings';
import Dashboard from '../Dashboard/dashboard';
import { Switch } from "react-router-dom";
import "../../../components/assets/style.css";
import ModuleHeader from "../ModuleHeader/ModuleHeader";
import UserContext from "../../../context/UserContext";
import { useHistory } from "react-router-dom";
import AddRobot from "../RobotManager/AddRobot";
import PublicRoute from '../../../router/PublicRoute';


export default function Admin() {
    const { userData } = useContext(UserContext);
    // const [collapsed] = useState(false);
    // const [toggled, setToggled] = useState(false);
    const history = useHistory();
    
    useEffect(() => {
        const checkIfUserExists = () => {
            if (!userData.user) {
                history.push("/login")
            }
        }
        checkIfUserExists()

    }, [])


    return (
        <Fragment>
            {/* <Sidebar /> */}
            <main style={{overflow:"hidden"}}>
                <div className="container-fluid main-body">
                    <ModuleHeader moduleName={"Dashboard"} />
                    <Switch>
                        <PrivateRoute component={AddRobot} path="/robots/add" />
                        <PrivateRoute component={Dashboard} path="/dashboard" />
                    </Switch>
                </div>
            </main>
        </Fragment>
    )
}
