const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const helmet = require("helmet");
const socketio = require("socket.io")
const request = require('request');

mongoose.connect(
  process.env.MONGODB_CONNECTION_STRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) throw err;
    console.log("MongoDB connection established");
  }
);
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());
// app.use(express.static("client/build"))

const root = require('path').join(__dirname, 'client', 'build')
app.use(express.static(root));


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === 'OPTIONS') {
      res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, GET");
      return res.status(200).json({});
  }
  next();
});

// set up routes
app.use("/api/feed", require("./routes/robotRouter"));
app.use("/api/users", require("./routes/userRouter"));

app.get("*", function (req, res) {
  res.sendFile('index.html', { root });
})

app.use(helmet());

const server = app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));

/////////////////////
//////////////////////
///////////////////

const io = socketio(server)

let interval;

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("pythondata",function(frame){
    // console.log(data)
    var buff = Buffer.from(frame).toString()
    let base64data = buff.toString('base64');
    
    // var ret = Object.assign({}, data, {
    //   frame: Buffer.from(data.frame, 'base64').toString() // from buffer to base64 string
    // })
    socket.broadcast.emit("FROMPYAPI",base64data)
    // io.Broad.emit("FROMPYAPI",frame)
    // setInterval(function(){
    //   //console.log(frame)
    //   io.emit("FROMPYAPI",frame)
    // },100 )
  })
  

  socket.on("frontenddata",function(data){
    console.log(data)
    // var ret = Object.assign({}, data, {
    //   data:'2'
    // })
    // console.log(ret)
    // io.broadcast.emit("FROMNODEAPI",data)
    socket.broadcast.emit("FROMNODEAPI",data)
  })

});


const getApiAndEmit = socket => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
}