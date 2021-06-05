import React, { useState, Fragment, useContext, useEffect } from 'react';
// import ClickOutside from "react-click-outside";
import { Link, useHistory } from "react-router-dom";
import Logo from '../../assets/logo.png';
import Image from 'react-bootstrap/Image';
import { useCookies } from "react-cookie";
import UserContext from "../../../context/UserContext";
import { FaRobot, FaListAlt, FaCogs, FaPowerOff, FaUserAlt, FaColumns } from 'react-icons/fa';
import styled from 'styled-components';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from './StyledSideNav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
const navWidthCollapsed = 64;
const navWidthExpanded = 320;

const NavHeader = styled.div`
    display: ${props => (props.expanded ? 'block' : 'none')};
    white-space: nowrap;
    height:64px;
    background-color: #192a56;
    color: #fff;
    > * {
        color: inherit;
        background-color: inherit;
    }
`;
const NavFooter = styled.div`

    position: absolute;
    bottom: 0px;
    white-space: nowrap;
    height:64px;
    background-color: #192a56;
    color: #fff;
    > * {
        color: inherit;
        background-color: inherit;
    }
`;

// height: 20px + 10px + 10px = 40px
const NavTitle = styled.div`
    font-size: 1.5em;
    line-height: 16px;
    padding: 24px 0px 10px 0px;
`;

// height: 20px + 4px = 24px;
const NavSubTitle = styled.div`
    font-size: 0.875em;
    line-height: 20px;
    padding-bottom: 4px;
`;

const NavInfoPane = styled.div`
    float: left;
    width: 100%;
    padding: 10px 20px;
    background-color: #eee;
`;

const Separator = styled.div`
    clear: both;
    position: relative;
    margin: .8rem 0;
    background-color: #ddd;
    height: 1px;
`;

export default function Sidebar() {
    const [cookies, setCookie] = useCookies(["user"]);
    // const [logoutSelected, setLogoutSelected]=useState(false)
    const { userData,setUserData } = useContext(UserContext);
    const [selected, setSelected] = useState("dashboard")
    const [expanded, setExpanded] = useState(false)
    const history = useHistory(); //history is all events that had happened in the url bar
    
    

    const onSelect = (selected) => {
        if (selected === "logout") {
            setUserData({
                token: undefined,
                user: undefined
            });
            localStorage.setItem("auth-token", "");
            setCookie("username", "", {
                path: "/"
            });
            setCookie("email", "", {
                path: "/"
            });
            setCookie("displayName", "", {
                path: "/"
            });
            
            history.go(0)
        }
        else {
            const to = '/' + selected;
            history.push(to);
        }
    };
    const onToggle = (expanded) => {
        setExpanded(expanded);
    };


    return (
        <Fragment>
            <SideNav
                style={{ minWidth: expanded ? navWidthExpanded : navWidthCollapsed }}
                onSelect={onSelect}
                onToggle={onToggle}
            >
                <Toggle />
                <NavHeader expanded={expanded}>
                    <Image src={Logo} className="logo" style={{ margin: '20px' }} />
                    {/* <NavTitle>HWU Telepresence</NavTitle>
                        <NavSubTitle>Styled Side Navigation</NavSubTitle> */}
                </NavHeader>
                {expanded &&
                    <NavInfoPane>
                        <div>Time: 67</div>
                        <div>User: admin</div>
                    </NavInfoPane>
                }
                <Nav
                    defaultSelected={selected}
                >
                    <NavItem eventKey="dashboard">
                        <NavIcon>
                            <FaColumns style={{ fontSize: '2.5em', verticalAlign: 'middle' }} />
                            {/* <i className="fa fa-fw fa-home" style={{ fontSize: '2.5em', verticalAlign: 'middle' }} /> */}
                        </NavIcon>
                        <NavText style={{ paddingRight: 32 }} title="HOME">
                            DASHBOARD
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="robots">

                        <NavIcon>
                            <FaRobot style={{ fontSize: '2.5em', verticalAlign: 'middle' }} />
                            {/* <i className="fa fa-fw fa-line-chart" style={{ fontSize: '2.5em', verticalAlign: 'middle' }} /> */}
                        </NavIcon>
                        <NavText style={{ paddingRight: 32 }} title="MANAGE ROBOTS">
                            MANAGE ROBOTS
                            </NavText>
                        <NavItem eventKey="robots/add">
                            <NavText title="ADD A ROBOT">
                                ADD A ROBOT
                                </NavText>
                        </NavItem>
                        <NavItem eventKey="robots/edit">
                            <NavText title="EDIT ROBOT LIST">
                                EDIT ROBOT LIST
                            </NavText>
                        </NavItem>
                    </NavItem>
                    
                    <NavItem eventKey="tasks">
                        <NavIcon>
                            <FaListAlt style={{ fontSize: '2.5em', verticalAlign: 'middle' }} />
                            {/* <i className="fa fa-fw fa-list-alt" style={{ fontSize: '2.5em', verticalAlign: 'middle' }} /> */}
                        </NavIcon>
                        <NavText style={{ paddingRight: 32 }} title="TASK MANAGER">
                            TASK MANAGER
                        </NavText>
                        <NavItem eventKey="tasks/add">
                            <NavText title="ADD A TASK">
                                ADD A TASK
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="tasks/schedule">
                            <NavText title="NETWORK">
                                VIEW SCHEDULE
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="tasks/edit">
                            <NavText title="ADD A TASK">
                                EDIT TASK LIST
                            </NavText>
                        </NavItem>
                    </NavItem>
                    <NavItem eventKey="activity">
                        <NavIcon>
                            <FaCogs style={{ fontSize: '1.5em' }} />
                            {/* <i className="fa fa-fw fa-cogs" style={{ fontSize: '1.5em' }} /> */}
                        </NavIcon>
                        <NavText style={{ paddingRight: 32 }} title="ACTIVITY MONITOR">
                            ACTIVITY MONITOR
                        </NavText>
                        <NavItem eventKey="activity/remote">
                            <NavText style={{ paddingRight: 32 }} title="REMOTE ACTIVITY LOG">
                                REMOTE ACTIVITY LOG
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="activity/advanced">
                            <NavText style={{ paddingRight: 32 }} title="APP ACTIVITY LOG">
                                APP ACTIVITY LOG
                            </NavText>
                        </NavItem>

                    </NavItem>
                    <NavItem eventKey="profile">
                        <NavIcon>
                            <FaUserAlt style={{ fontSize: '1.5em' }} />
                            {/* <i className="fa fa-fw fa-cogs" style={{ fontSize: '1.5em' }} /> */}
                        </NavIcon>
                        <NavText style={{ paddingRight: 32 }} title="YOUR PROFILE">
                            YOUR PROFILE
                        </NavText>

                    </NavItem>

                    {/* <Separator /> */}
                    <NavItem eventKey="logout" style={{ position: 'absolute', bottom: '0px' }}>
                        <NavIcon>
                            <FaPowerOff style={{ fontSize: '1.5em' }} />
                            {/* <i className="fa fa-fw fa-power-off" style={{ fontSize: '1.5em' }} /> */}
                        </NavIcon>
                        <NavText style={{ paddingRight: 32 }} title="SIGN OUT">
                            SIGN OUT
                        </NavText>
                    </NavItem>
                </Nav>
            </SideNav>
        </Fragment>
    )
}

