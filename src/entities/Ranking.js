const { EntitySchema } = require("typeorm");

module.exports.Ranking = new EntitySchema({
    name: "Ranking",
    tableName: "rankings",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        fighter_id: {
            type: "int",
        },
        weight_class_id: {
            type: "int",
        },
        rank: {
            type: "int",
        },
        updated_at: {
            type: "timestamp",
        },
    },
    relations: {
        fighter: {
            target: "Fighter",
            type: "many-to-one",
            joinColumn: { name: "fighter_id" },
        },
        weightClass: {
            target: "WeightClass",
            type: "many-to-one",
            joinColumn: { name: "weight_class_id" },
        },
    },
});