require("reflect-metadata");
const { DataSource } = require("typeorm");
const { Fighter } = require("./entities/Fighter");
const { WeightClass } = require("./entities/WeightClass");
const { Event } = require("./entities/Event");
const { Fight } = require("./entities/Fight");
const { Ranking } = require("./entities/Ranking");

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "1234",
    database: "ufc_db",
    synchronize: true,
    logging: false,
    entities: [Fighter, WeightClass, Event, Fight, Ranking],
    migrations: [],
    subscribers: [],
});

module.exports = { AppDataSource };