
import Axios from "axios";
import React, { Fragment, useState, useContext, useEffect } from 'react'
import { ZoomMtg } from '@zoomus/websdk';
ZoomMtg.setZoomJSLib('https://source.zoom.us/1.9.1/lib', '/av');
require('dotenv').config()
ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();

export default function ZoomCall({startCall}) {

  // setup your signature endpoint here: https://github.com/zoom/websdk-sample-signature-node.js
  var signatureEndpoint = '/api/zoom/signature'
  var apiKey = process.env.ZOOM_JWT_API_KEY
  var meetingNumber = '8673084098'
  var role = 0
  var leaveUrl = 'http://localhost:9000'
  var userName = 'Walter White'
  var userEmail = process.env.zoom_email
  var passWord = process.env.zoom_password


  useEffect(() => {
    if(startCall==true){
        getSignature()
    }
  }, [startCall])
  function getSignature () {
    // e.preventDefault();


    fetch(signatureEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        meetingNumber: meetingNumber,
        role: role
      })
    }).then(res => res.json())
    .then(response => {
      startMeeting(response.signature)
    }).catch(error => {
      console.error(error)
    })
  }

  const startMeeting = (signature)  =>{
    document.getElementById('zmmtg-root').style.display = 'block'

    ZoomMtg.init({
      leaveUrl: leaveUrl,
      isSupportAV: true,
      success: (success) => {
        console.log(success)

        ZoomMtg.join({
          signature: signature,
          meetingNumber: meetingNumber,
          userName: userName,
          apiKey: apiKey,
          userEmail: userEmail,
          passWord: passWord,
          success: (success) => {
            console.log(success)
          },
          error: (error) => {
            console.log(error)
          }
        })

      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  return (
    <div className="zoom-call">
      {/* <main>
        <h1>Zoom WebSDK Sample React</h1>

        <button onClick={getSignature}>Join Meeting</button>
      </main> */}
    </div>
  );
}

