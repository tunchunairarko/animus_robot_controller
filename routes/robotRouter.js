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

router.get("/robotdata",auth,async(req,res)=>{
    try {
        let options = {
            mode: 'json',
            pythonPath: process.env.PYTHON_PATH,
            pythonOptions: ['-u'], // get print results in real-time 
            scriptPath: path.join(__dirname, '../python'), //If you are having python_test.py script in same folder, then it's optional. 
            args: [query, queryType, marketplaceString] //An argument which can be accessed in the script using sys.argv[1] 
        };
        PythonShell.run('apiController.py', options, function (err, result) {
            if (err) throw err;
            console.log('result: ', result); 
            res.send(result[0])
        });
    } catch (err) {
        dumpError(err)
        res.status(500).json({ error: err.message });
    }
})

router.post("/dashboarddata", auth, async (req, res) =>{
    const { username } = req.body;
    // console.log(username)
    const userPostedProductsCount = await UserProducts.countDocuments({username:username})
    const totPostedProductsCount = await Products.countDocuments({})

    const resData = await UserProducts.aggregate([
        {$group :{_id:"$username","count":{$sum:1}}},
        {$sort:{"count":-1}},
        {$limit : 5}]
    )
    const bestPoster = resData[0]._id
    const bestPosterCount=resData[0].count
    res.json({userPostedProductsCount,totPostedProductsCount,bestPoster,bestPosterCount})
})


module.exports = router;