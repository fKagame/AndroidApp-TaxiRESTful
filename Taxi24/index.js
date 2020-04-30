const express = require('express')
const Joi = require('joi')
const readUsers = require('./functions').readUsers
const readAuser =  require('./functions').readAuser
const nearbyUsers = require('./functions').nearbyUsers
const availableUsers = require('./functions').availableUsers

const app = express()
app.use(express.json())
app.get('/', (req,res)=>{
    res.send('Welcome to Taxi24')
})

/* The followwing get request '/api/drivers' will pull a list all Drivers in our database*/
app.get('/api/drivers', async (req,res)=>{
    const rows = await readUsers();
    res.setHeader("content-type","application/json")
    res.send(JSON.stringify(rows))
})

/* The followwing get request '/api/available' will pull a list all available Drivers in our database*/
app.get('/api/available', async (req,res)=>{
    const rows = await availableUsers();
    //nearbyUsers(-1.960327, 30.119472)
    res.setHeader("content-type","application/json")
    if(rows.length == 0 )
        res.send('No driver is available').sendStatus(404)
    res.send(JSON.stringify(rows))
})

// the request http://localhost:3000/api/3km?latitude= &longitude=
app.get('/api/nearby', async(req,res)=>{
    var lat = req.query.latitude
    var lng = req.query.longitude
    const rows = await nearbyUsers(lat,lng)
    if(rows.length == 0)        
        res.send("No driver in 3km")
    res.json(rows)
})

/* The followwing get request '/api/drivers' will return a specific driver from our database, we serve it an Id of the driver */
app.get('/api/drivers/:id', async (req,res)=>{
    const idNumber = req.params.id;
    const rows = await readAuser(idNumber);
    res.setHeader("content-type","application/json")
    if(rows.length == 0 )
        res.sendStatus(404).send('Driver not found')
    res.send(JSON.stringify(rows))
})

/* The followwing post request '/api/drivers' will create one user in our database, the JSon object to be sent need
to have a word "driver" so that it can be recognized */
 app.post('/api/drivers', async (req,res) =>{ 
    const schema = {
         name : Joi.string().min(2).required(),
         surname : Joi.string().min(2).required(),
         DoB : Joi.string().min(2).required()
     }
     
    let result={}
    try
    {
        const reqJson = req.body;

        const JSONname = reqJson.name ;
        const JSONsurname = reqJson.surname;
        const JSONdegree = reqJson.DoB;

        await createUser(JSONname,JSONsurname,JSONdegree)
        result.success=true;
    }
    catch(e)
    {
        result.success=false;
    }
    finally
    {
        res.setHeader("content-type","application/json")
        res.send(JSON.stringify(result))
    }
})

/* The followwing delete request '/api/users' will delete one user in our database, we need to send the Id to be deleted */
  app.delete('/api/users/:id', async (req,res) =>{
    let result={}
    try
    {
        const reqJson = req.body;
        //await deleteUser(reqJson.id)
        const idd = req.params.id;
        await deleteUser(idd) //Temporary use
        result.success=true;
    }
    catch(e)
    {
        result.success=false;
    }
    finally
    {
        res.setHeader("content-type","application/json")
        res.send(JSON.stringify(result))
    }
})

/* We will be listerning on ports that are assigned by local machine according to the ports available in 
their environment variables. If not, we will use port 3000 as default*/
const port = process.env.port || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))



