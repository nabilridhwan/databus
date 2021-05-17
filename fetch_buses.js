require("dotenv").config()
let axios = require("axios").default
let fs = require('fs')

let {
    API_KEY,
    API_ACCEPT
} = process.env

// Get bus stop codes from bus stops data
let bus_stops_data = require("./data/bus_stops.json")
let all_bus_stop_codes = bus_stops_data.map(s => s["BusStopCode"])
// let all_bus_stop_codes = [
//     '01012', '01013', '01019', '01029', '01039', '01059', '01109',
//     '01112', '01113', '01119', '01121']

// Get all buses from bus arrival data
async function getAllBuses() {
    
    let all_buses = [];
    for (let i = 0; i < all_bus_stop_codes.length; i++) {
        let bus_stop_code = all_bus_stop_codes[i];
        console.log(`*\nCurrent stop:\t${bus_stop_code}\n*`)
        let res = await axios.get(`http://datamall2.mytransport.sg/ltaodataservice/BusArrivalv2?BusStopCode=${bus_stop_code}`, {
            headers: {
                "AccountKey": API_KEY,
                "accept": API_ACCEPT
            }
        })

        let current_buses = res.data.Services.map(a => {
            console.log(`\tBus:\t${a.ServiceNo}`)
            return a.ServiceNo
        })

        all_buses = [...all_buses, ...current_buses]
    }

    return all_buses
}

getAllBuses().then(d=>{
    // Remove duplicate
    let finalBusStop = []
    d.forEach(b => {
        !finalBusStop.includes(b) ? finalBusStop.push(b) : null
    })

    console.log(`Removed duplicates:\t${d.length - finalBusStop.length}\nOriginal size:\t${d.length}\nAfter size:\t${finalBusStop.length}`)
    fs.writeFileSync('./data/buses.json', JSON.stringify(finalBusStop))
})

let buses = require("./data/buses.json")
fs.writeFileSync('./data/buses.json', JSON.stringify(buses.sort()))