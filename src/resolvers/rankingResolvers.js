const { Ranking } = require("../entities/Ranking");

const rankingResolvers = {
    Query: {
        getRankings: async (_, { weightClassId }, { dataSource }) => {
            return dataSource.getRepository(Ranking).find({
                where: { weight_class_id: weightClassId },
                order: { rank: "ASC" },
                relations: ["fighter", "weightClass"]
            });
        },
    },
};

module.exports = { rankingResolvers };