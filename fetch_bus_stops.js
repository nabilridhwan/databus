require("dotenv").config()
let axios = require("axios").default
let fs = require("fs")

let {
    API_KEY,
    API_ACCEPT
} = process.env

async function getAllBusStops() {
    let bus_stops = [];
    let skip = 0;
    let current_stops_length;

    let res = await axios.get(`http://datamall2.mytransport.sg/ltaodataservice/BusStops?$skip=${skip}`, {
        headers: {
            "AccountKey": API_KEY,
            "accept": API_ACCEPT
        }
    })

    let data = res.data.value
    current_stops_length = data.length

    while (current_stops_length != 0) {
        let res = await axios.get(`http://datamall2.mytransport.sg/ltaodataservice/BusStops?$skip=${skip}`, {
            headers: {
                "AccountKey": API_KEY,
                "accept": API_ACCEPT
            }
        })

        let data = res.data.value
        current_stops_length = data.length
        skip += 500

        // Concat array using spread operator
        bus_stops = [...bus_stops, ...data]
    }

    return bus_stops
}


// Run async function and then write the file
getAllBusStops().then(d => {
    let path = "./data/bus_stops.json"
    fs.writeFileSync(path, JSON.stringify(d))
    console.log(`Fetched ${d.length} bus stops, written to ${path}`)
})