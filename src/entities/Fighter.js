const { EntitySchema } = require("typeorm");

module.exports.Fighter = new EntitySchema({
    name: "Fighter",
    tableName: "fighters",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        first_name: {
            type: "varchar",
            length: 100,
        },
        last_name: {
            type: "varchar",
            length: 100,
        },
        weight_class_id: {
            type: "int",
        },
        nationality: {
            type: "varchar",
            length: 100,
        },
        team: {
            type: "varchar",
            length: 100,
            nullable: true,
        },
        wins: {
            type: "int",
            default: 0,
        },
        losses: {
            type: "int",
            default: 0,
        },
        knockouts: {
            type: "int",
            default: 0,
        },
        submissions: {
            type: "int",
            default: 0,
        },
    },
    relations: {
        weightClass: {
            target: "WeightClass",
            type: "many-to-one",
            joinColumn: { name: "weight_class_id" },
        },
        fightsAsFighter1: {
            target: "Fight",
            type: "one-to-many",
            inverseSide: "fighter1",
        },
        fightsAsFighter2: {
            target: "Fight",
            type: "one-to-many",
            inverseSide: "fighter2",
        },
        rankings: {
            target: "Ranking",
            type: "one-to-many",
            inverseSide: "fighter",
        },
    },
});