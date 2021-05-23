require("dotenv").config()
let axios = require("axios").default
let {
    API_ACCEPT,
    API_KEY
} = process.env

async function getAllBusRoutes() {
    let busRoutes = [];
    let skip = 0;
    let length;

    do {
        let res = await axios.get(`http://datamall2.mytransport.sg/ltaodataservice/BusRoutes?$skip=${skip}`, {
            headers: {
                "AccountKey": API_KEY,
                "accept": API_ACCEPT
            }
        })

        let data = res.data.value
        skip += 500
        length = data.length
        busRoutes = [...busRoutes, ...data]

    } while (length != 0)

    return busRoutes
}

module.exports = getAllBusRoutes

