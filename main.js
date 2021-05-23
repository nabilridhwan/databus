let fs = require("fs")
let getAllBusRoutes = require("./scripts/fetch_bus_routes")
let getAllBusStops = require("./scripts/fetch_bus_stops")
let getAllBuses = require("./scripts/fetch_buses")

getAllBusStops().then(d => {
    let path = "./data/bus_stops.json"
    fs.writeFileSync(path, JSON.stringify(d))
    console.log(`Fetched ${d.length} bus stops! Written to ${path}`)
})

getAllBusRoutes().then(d => {
    let path = "./data/bus_routes.json"
    fs.writeFileSync(path, JSON.stringify(d))
    console.log(`Fetched ${d.length} bus routes! Written to ${path}`)
})

getAllBuses().then(d => {
    let path = "./data/buses.json"
    fs.writeFileSync(path, JSON.stringify(d))
    console.log(`Fetch ${d.length} buses! Written to ${path}`)
})