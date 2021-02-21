const router = require("express").Router();
const auth = require("../middleware/auth");
const { PythonShell } = require('python-shell');
const path = require('path');
function dumpError(err) {
    if (typeof err === 'object') {
      if (err.message) {
        console.log('\nMessage: ' + err.message)
      }
      if (err.stack) {
        console.log('\nStacktrace:')
        console.log('====================')
        console.log(err.stack);
      }
    } else {
      console.log('dumpError :: argument is not an object');
    }
  }

router.post("/robotdata", auth, async(req,res)=>{
    try {

      let { toggleState, email, password } = req.body;
      
      if(toggleState==true){
        toggleState=1
      }
      else{
        toggleState=0
      }
      // console.log(toggleState + email + password)
      let options = {
          mode: 'text',
          pythonPath: process.env.PYTHON_PATH,
          pythonOptions: ['-u'], // get print results in real-time 
          scriptPath: path.join(__dirname, '../python'), //If you are having python_test.py script in same folder, then it's optional. 
          args: [toggleState, email, password] //An argument which can be accessed in the script using sys.argv[1] 
      };
      PythonShell.run('animus_datafeed.py', options, function (err, result) {
        if (err) throw err;
        console.log('result: ', result); 
        res.send(result)
    });
      // PythonShell.on('animus_datafeed.py', options, function (err, result) {
      //     if (err) throw err;
      //     console.log('result: ', result); 
      //     res.send(result)
      // });
    } catch (err) {
        dumpError(err)
        res.status(500).json({ error: err.message });
    }
})


module.exports = router;