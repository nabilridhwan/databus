let bus_routes;
let busesSet = new Set();
let busesArray;

async function getAllBuses() {
    try {
        bus_routes = require("../data/bus_routes.json")
    } catch (error) {
        if (error) console.log("Run fetch bus routes script first!")
    }

    bus_routes.forEach(d => {
        busesSet.add(d.ServiceNo)
    })
    busesArray = Array.from(busesSet)


    return busesArray
}

module.exports = getAllBuses