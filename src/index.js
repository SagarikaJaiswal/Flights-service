const express = require('express');

const { ServerConfig } = require('./config');
const router = require('./routes');
const { where } = require('sequelize');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', router);

app.listen(ServerConfig.PORT, async () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
    //bad code alert
    // const { Cities, Airport} = require("./models");
    // const bombay = await Cities.findByPk(2);
    // console.log(bombay);
    //const cstAirport = await Airport.create({name: "Chhtrapati Shivaji Terminal", code: "BOM", cityId: 2});
    // const cstAirport = await bombay.createAirport({name: "Chhtrapati Shivaji Terminal", code: "BOM"});
    // console.log(cstAirport);
    // const cstAirport = await Airport.findByPk(1);
    // console.log(cstAirport);
    //  await bombay.removeAirport(cstAirport);

    // this will delete the airport as well since onDelete is set to 'CASCADE'
    // const mumbai = await Cities.findByPk(2);
    // console.log(mumbai);
    // await Cities.destroy({
    //     where: {
    //         id: 2
    //     }
    // })   /
});