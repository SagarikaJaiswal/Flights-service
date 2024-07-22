const AirplaneRepository = require("../repositories/airplane-repository");

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data){
    try {
        const airplane = await airplaneRepository.create(data);
        return airplane;
    } catch (error) {
        console.log("Something went wrong: createAirplane");
        throw error;
    }
}

module.exports = {
    createAirplane
}