const { Fighter } = require("../entities/Fighter");
const { Fight } = require("../entities/Fight");

const fighterResolvers = {
    Query: {
        fighters: async (_, __, { dataSource }) => {
            return dataSource.getRepository(Fighter).find({ relations: ["weightClass"] });
        },

        fighter: async (_, { id }, { dataSource }) => {
            return dataSource.getRepository(Fighter).findOne({
                where: { id },
                relations: ["weightClass", "fightsAsFighter1", "fightsAsFighter2"]
            });
        },

        fighterHistory: async (_, { fighterId }, { dataSource }) => {
            return dataSource.getRepository(Fight).find({
                where: [
                    { fighter1_id: fighterId },
                    { fighter2_id: fighterId }
                ],
                relations: ["fighter1", "fighter2", "event"],
                order: { event: { date: "DESC" } }
            });
        },
    },

    Mutation: {
        createFighter: async (_, { firstName, lastName, weightClassId, nationality, team }, { dataSource }) => {

            const weightClass = await dataSource.getRepository("WeightClass").findOne({
                where: { id: weightClassId }
            });
            if (!weightClass) {
                throw new Error(`Weight class with ID ${weightClassId} does not exist`);
            }

            const fighter = {
                first_name: firstName,
                last_name: lastName,
                weight_class_id: weightClassId,
                nationality: nationality,
                team: team
            };

            return dataSource.getRepository(Fighter).save(fighter);
        },

        updateFighter: async (_, args, { dataSource }) => {
            const { id, firstName, lastName, weightClassId, nationality, team } = args;
            const fighter = await dataSource.getRepository(Fighter).findOne({ where: { id } });

            if (!fighter) {
                throw new Error("Fighter not found");
            }

            if (firstName) fighter.first_name = firstName;
            if (lastName) fighter.last_name = lastName;
            if (weightClassId) fighter.weight_class_id = weightClassId;
            if (nationality) fighter.nationality = nationality;
            if (team !== undefined) fighter.team = team;

            return dataSource.getRepository(Fighter).save(fighter);
        },

        deleteFighter: async (_, { id }, { dataSource }) => {
            const result = await dataSource.getRepository(Fighter).delete(id);
            return result.affected !== 0;
        },
    },
};

module.exports = { fighterResolvers };