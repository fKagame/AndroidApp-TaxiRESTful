const express = require('express')
const Joi = require('joi')

const app = express()
app.use(express.json())
//getDistanceFrom(-1.942673, 30.066801, -1.949091, 30.109683)
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
    //console.log("First avail driver: " +Aresults.rows[0].id) // Delete this ------------------
    //console.log("Number of avail drivers: "+(await availableUsers()).length) // Delete this  ----------------
    //console.log("Nearby drivers: "+nearbyUsers(-1.942673, 30.066801)) // Delete this -----------------------
    //getDistanceFrom(-1.942673, 30.066801, -1.949091, 30.109683)

    nearbyUsers(-1.960327, 30.119472)
    res.setHeader("content-type","application/json")
    if(rows.length == 0 )
        res.send('No driver is available').sendStatus(404)
    res.send(JSON.stringify(rows))
})

app.get('/api/nearby', async(req,res)=>{
    //const rows = await ;
    res.setHeader("content-type","application/json")
    if(rows.length == 0)        
        res.send("No driver in 3km")
    res.send(JSON.stringify(rows))
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

const {Client} = require('pg')
const client = new Client({
    user: "postgres",
    password: "Vrakiski@05&kgl",
    host: "localhost",
    port: 5432,
    database: "taxi24DB"
})
start()
async function start()
{
    await connect();
    /*const users = await readUsers();
    console.log(users)
    const successCreate = await createUser("Huber","Dushime","Masters of Neulogy")*/
    //const deleteMe = await deleteUser(8)
}

async function connect()
{
    try
    {
        await client.connect();
    }
    catch (e)
    {
        console.error(`Failed to connect:// ${e}`)
    }

}

async function readUsers()
{
    try
    {
        const results = await client.query("SELECT * FROM driver")
        return results.rows;
    }
    catch(e)
    {
        console.error(`Cant read users:// ${e}`)
        return [];
    }
}

var Aresults;
async function availableUsers()
{
    try
    {
        const co = 'available'
         Aresults = await client.query(`SELECT * FROM driver WHERE ${co} = true`)
        return Aresults.rows;
    }
    catch(e)
    {
        console.error(`Cant read users:// ${e}`)
        return [];
    }
}






async function nearbyUsers(lat1, lng1) // Latitude and longitude of the rider
{
    var driver = []
    try
    {
       const availableDrivers = (await availableUsers()).length // All available drivers

        for(var i = 0; i < availableDrivers ; i++)
        {
            const lat2 = await client.query(`SELECT dlatitude FROM driverlocation WHERE iddriver = ${Aresults.rows[i].id}`)
            const lng2 = await client.query(`SELECT dlongitude FROM driverlocation WHERE iddriver = ${Aresults.rows[i].id}`)
            
            /*console.log("Driver id :" + Aresults.rows[i].id )
            console.log(lat2.rows[0].dlatitude)
            console.log(lng2.rows[0].dlongitude)*/
            var x = lat2.rows[0].dlatitude
            var y = lng2.rows[0].dlongitude
            
            if( getDistanceFrom(lat1,lng1,x,y) <= 3 )
            {
                var idx = Aresults.rows[i].id 
                console.log("Driver id :" + idx +" is around in "+ getDistanceFrom(lat1,lng1,x,y)+" km only")
                driver.push[idx]
            }
        }

        console.log(driver.length)
        
        return driver
    }
    catch(e)
    {
        console.error(`Cant read users:// ${e}`)
        return [];
    }
}

function getDistanceFrom(lat1, lng1, lat2, lng2) 
{ 
  function deg2rad(deg)
  {
      return deg * (Math.PI/180);
  }

  function square(x)
  {
      return Math.pow(x, 2);
  }

  var r = 6371; // radius of the earth in km
  lat1 = deg2rad(lat1);
  lat2 = deg2rad(lat2);
  var lat_dif = lat2-lat1;
  var lng_dif = deg2rad(lng2-lng1);
  var a = square(Math.sin(lat_dif/2)) + Math.cos(lat1)*Math.cos(lat2)*square(Math.sin(lng_dif/2));
  var d = 2*r*Math.asin(Math.sqrt(a));
  return d;
}








async function readAuser(idn)
{
    try
    {
        const results = await client.query(` SELECT * FROM driver WHERE id =${idn} `)
        return results.rows;
    }
    catch(e)
    {
        console.error(`Cant read users:// ${e}`)
        return [];
    }

}

/* The number 9 here is hardcoded, how can we automate it? */
async function createUser(name,surnam,degree)
{
    try
    {
       await client.query("insert into driver values ($1,$2,$3,$4)",[9,name,surnam,degree])
       return true
    }
    catch(e)
    {
        console.error(`Can not insert user ${name}:${e}`)
        return false;
    }
}

async function deleteUser(idn)
{
    try
    {
        await client.query(`delete from driver where id-driver=${idn}`)
        return true
    }
    catch(e)
    {
        console.error(`Cant delete:${e}`)
        return false;
    }
}
