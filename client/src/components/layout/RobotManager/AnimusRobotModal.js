import React, { Fragment, useEffect, useState } from 'react'
import { Modal, Button, Row, Image } from 'react-bootstrap'
import Axios from "axios";
import BootstrapTable from 'react-bootstrap-table-next';
import Loader from 'react-loader-spinner';
import "../../../components/assets/style.css"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { useAlert } from 'react-alert';

// const SearchModal = ({ show, handleClose, searchQuery, onProductChosen, marketplace }) => {
export default function AnimusRobotModal ({ show, handleClose, email, password, onRobotChosen }) {
    const alert = useAlert()
    const [userChosenRobot, setUserChosenRobot] = useState({});
    const [loaderVisible, setLoaderVisible] = useState(true);
    //popup theke data niye ekhon form e boshaite hobe
    // const [currentProductData, setCurrentProductData] = useState({
    //     productList: undefined,
    // });
    
    const [currentRobotData,setCurrentRobotData] =useState({
        robotList: undefined
    })

    useEffect(() => {
        const getRobotList = async () => {            
            if(show===true){
                if(!currentRobotData.robotList){
                    setLoaderVisible(true)
                    if (email && password) {
                        // console.log(searchQuery)
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
                                const body = { email:email, password:password, mode:"live" };
                                // const body = { searchQuery };
                                try{
                                    const robotRes = await Axios.post(
                                        "/api/robots/robotlist", 
                                        body,
                                        { headers: { "x-auth-token": token } }
                                    )
                                    
                                    if(robotRes.data && robotRes.data.length>0){
                                        setCurrentRobotData({
                                            robotList: robotRes.data,
                                        });
                                        
                                        setLoaderVisible(false);
                                    }
                                    else{
                                        handleClose(currentRobotData,loaderVisible)
                                        alert.error(<div style={{ 'font-size': '0.70em' }}>Error retrieving robots</div>)
                                    }
                                }catch(error){
                                    console.log(error)
                                    handleClose(currentRobotData,loaderVisible)
                                    alert.error(<div style={{ 'font-size': '0.70em' }}>Error retrieving robots</div>)
                                }
                            }
        
                        }
                    }
                }
            }
        }        
        getRobotList();
    },[show])
    
    // this will automatically retrieve if only 1 robot is available
    // useEffect(() =>{
    //     const nandakore = async () => {
            
    //         if(currentRobotData.robotList){
    //             if(currentRobotData.robotList.length==1){
    //                 onRobotChosen(currentRobotData.robotList[0])
    //                 setCurrentRobotData({
    //                     robotList: undefined,
    //                 });
    //                 handleClose(currentRobotData,loaderVisible);
    //             }
    //         }
            
    //     }
    //     nandakore();
    // },[currentRobotData])

    
    const finishAll = (data) =>{
        // console.log(data)
        onRobotChosen(data)
        setCurrentRobotData({
            robotList: undefined,
        });
        handleClose(currentRobotData,loaderVisible);
    }

    const chooseRobot = async (e) => {
        e.preventDefault();
        if (userChosenRobot) {
            finishAll(userChosenRobot)
            // const searchQuery = userChosenProduct['robot_id'];
            // const body = { searchQuery };
            // try{
            //     const productRes = await Axios.post(
            //         "/api/products/robotlist", 
            //         body
            //     ).then((result)=> finishAll(result.data))
                
            // }catch(error){
            //     console.log(error)
            //     onProductChosen(userChosenProduct)
            //     setCurrentProductData({
            //         productList: undefined,
            //     });
            //     handleClose(currentProductData,loaderVisible);
            // }
            
        }
    }
    

    const selectRow = {
        mode: 'radio',
        clickToSelect: true,
        onSelect: (row, isSelect, rowIndex, e) =>{setUserChosenRobot(currentRobotData.robotList[rowIndex])},
        style: (row, rowIndex) => {
          const backgroundColor = rowIndex > 1 ? '#00BFFF' : '#00FFFF';
          return { backgroundColor };
        }
      };

      const columns=[
        {
            dataField: 'image',
            text: 'Image',
            formatter:imageFormatter
        },
        {
            dataField: 'robot_name',
            text: 'Name'
        },
        {
            dataField: 'ipAddress',
            text: 'IP Address'
        },
        {
            dataField: 'location',
            text: 'Location'
        },
        {
            dataField: 'robot_id',
            text: 'Robot ID'
        }
    ]
    function imageFormatter(cell, row){
        return (<Image src={cell} fluid/>) ;
      }
      
    return (
        <Fragment>
            <Modal size="lg" show={show} onHide={(e)=>handleClose(currentRobotData,loaderVisible)} backdrop="static" keyboard={false} centered>
                <Modal.Header closeButton>
                    <Modal.Title id="searchResTitle">Logging in using {email}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {currentRobotData.robotList ? (
                        <BootstrapTable
                        keyField="robot_id"
                        data={ currentRobotData.robotList }
                        columns={ columns }
                        selectRow={ selectRow }
                        wrapperClasses="table-responsive"
                        rowClasses="text-nowrap"
                        
                      />
                    ) : (
                        
                        <Row className="justify-content-md-center">
                            <Loader
                            className="searchLoader"
                            type="TailSpin"
                            color="#00BFFF"
                            height={100}
                            width={100}
                            visible={loaderVisible} />
                        </Row>                        

                        )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={(e)=>handleClose(currentRobotData,loaderVisible)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={chooseRobot}>Choose</Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    )
};


