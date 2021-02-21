import React, { useEffect, useState } from "react";
import {io} from "socket.io-client";


export default function SocketClient() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = io('/frontend');
    socket.on("FromPYAPI", data => {
      setResponse(data);
    });

  }, []);

  return (
    <p>
      It's <time dateTime={response}>{response}</time>
    </p>
  );
}