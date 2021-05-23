require("dotenv").config()
let axios = require("axios").default

let {
    API_KEY,
    API_ACCEPT
} = process.env

async function getAllBusStops() {
    let bus_stops = [];
    let skip = 0;
    let length;

    do {
        let res = await axios.get(`http://datamall2.mytransport.sg/ltaodataservice/BusStops?$skip=${skip}`, {
            headers: {
                "AccountKey": API_KEY,
                "accept": API_ACCEPT
            }
        })

        let data = res.data.value
        length = data.length
        skip += 500
        // Concat array using spread operator
        bus_stops = [...bus_stops, ...data]
    } while (length != 0);

    return bus_stops
}

module.exports = getAllBusStops