const { EntitySchema } = require("typeorm");

module.exports.Event = new EntitySchema({
    name: "Event",
    tableName: "events",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        name: {
            type: "varchar",
            length: 200,
        },
        date: {
            type: "timestamp",
        },
        location: {
            type: "varchar",
            length: 100,
        },
        venue: {
            type: "varchar",
            length: 100,
        },
    },
    relations: {
        fights: {
            target: "Fight",
            type: "one-to-many",
            inverseSide: "event",
        },
    },
});