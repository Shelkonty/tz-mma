const { EntitySchema } = require("typeorm");

module.exports.Fight = new EntitySchema({
    name: "Fight",
    tableName: "fights",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        event_id: {
            type: "int",
        },
        fighter1_id: {
            type: "int",
        },
        fighter2_id: {
            type: "int",
        },
        winner_id: {
            type: "int",
            nullable: true,
        },
        result_type: {
            type: "varchar",
            length: 20,
            nullable: true,
        },
        round: {
            type: "int",
            nullable: true,
        },
        time: {
            type: "varchar",
            length: 10,
            nullable: true,
        },
    },
    relations: {
        event: {
            target: "Event",
            type: "many-to-one",
            joinColumn: { name: "event_id" },
        },
        fighter1: {
            target: "Fighter",
            type: "many-to-one",
            joinColumn: { name: "fighter1_id" },
        },
        fighter2: {
            target: "Fighter",
            type: "many-to-one",
            joinColumn: { name: "fighter2_id" },
        },
    },
});
