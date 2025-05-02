const { EntitySchema } = require("typeorm");

module.exports.WeightClass = new EntitySchema({
    name: "WeightClass",
    tableName: "weight_classes",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        name: {
            type: "varchar",
            length: 50,
        },
        weight_limit: {
            type: "decimal",
            precision: 5,
            scale: 2,
        },
        gender: {
            type: "varchar",
            length: 10,
        },
    },
    relations: {
        fighters: {
            target: "Fighter",
            type: "one-to-many",
            inverseSide: "weightClass",
        },
        rankings: {
            target: "Ranking",
            type: "one-to-many",
            inverseSide: "weightClass",
        },
    },
});
