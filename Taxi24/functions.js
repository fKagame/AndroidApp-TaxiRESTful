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

exports.readUsers = async function readUsers()
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
exports.availableUsers = async function availableUsers()
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


exports.nearbyUsers = async function nearbyUsers(lat1, lng1) // Latitude and longitude of the rider
{
    var driver = []
    try
    {
       const availableDrivers = (await availableUsers()).length // All available drivers

        for(var i = 0; i < availableDrivers ; i++)
        {
            const lat2 = await client.query(`SELECT dlatitude FROM driverlocation WHERE iddriver = ${Aresults.rows[i].id}`)
            const lng2 = await client.query(`SELECT dlongitude FROM driverlocation WHERE iddriver = ${Aresults.rows[i].id}`)

            var x = lat2.rows[0].dlatitude
            var y = lng2.rows[0].dlongitude
            if( getDistanceFrom(lat1,lng1,x,y) <= 3 )
            {
                var idx = Aresults.rows[i].id 
                console.log(Aresults.rows[i])
                console.log("Driver id :" + idx +" is around in "+ getDistanceFrom(lat1,lng1,x,y)+" km only")



                driver.push(Aresults.rows[i])
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


exports.getDistanceFrom = function getDistanceFrom(lat1, lng1, lat2, lng2) 
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


exports.readAuser = async function readAuser(idn)
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

