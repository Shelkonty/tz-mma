const { Fight } = require("../entities/Fight");
const { Fighter } = require("../entities/Fighter");
const { Ranking } = require("../entities/Ranking");

const fightResolvers = {
    Query: {
        fights: async (_, __, { dataSource }) => {
            return dataSource.getRepository(Fight).find({
                relations: ["fighter1", "fighter2", "event"]
            });
        },

        fight: async (_, { id }, { dataSource }) => {
            return dataSource.getRepository(Fight).findOne({
                where: { id },
                relations: ["fighter1", "fighter2", "event"]
            });
        },
    },

    Mutation: {
        createFight: async (_, { eventId, fighter1Id, fighter2Id }, { dataSource }) => {
            const fight = new Fight();
            fight.event_id = eventId;
            fight.fighter1_id = fighter1Id;
            fight.fighter2_id = fighter2Id;

            return dataSource.getRepository(Fight).save(fight);
        },

        recordFightResult: async (_, { fightId, winnerId, resultType, round, time }, { dataSource }) => {
            const fight = await dataSource.getRepository(Fight).findOne({
                where: { id: fightId },
                relations: ["fighter1", "fighter2"]
            });

            if (!fight) {
                throw new Error("Fight not found");
            }

            fight.winner_id = winnerId;
            fight.result_type = resultType;
            fight.round = round;
            fight.time = time;

            await dataSource.getRepository(Fight).save(fight);

            const winner = winnerId === fight.fighter1_id ? fight.fighter1 : fight.fighter2;
            const loser = winnerId === fight.fighter1_id ? fight.fighter2 : fight.fighter1;

            winner.wins += 1;
            loser.losses += 1;

            if (resultType === "KO") {
                winner.knockouts += 1;
            } else if (resultType === "SUB") {
                winner.submissions += 1;
            }

            await dataSource.getRepository(Fighter).save([winner, loser]);
            await updateRankings(fight.fighter1.weight_class_id, dataSource);

            return fight;
        },
    },
};

async function updateRankings(weightClassId, dataSource) {
    const fighters = await dataSource.getRepository(Fighter).find({
        where: { weight_class_id: weightClassId },
        order: { wins: "DESC", losses: "ASC" }
    });

    for (let i = 0; i < fighters.length; i++) {
        const ranking = await dataSource.getRepository(Ranking).findOne({
            where: { fighter_id: fighters[i].id, weight_class_id: weightClassId }
        });

        if (ranking) {
            ranking.rank = i + 1;
            ranking.updated_at = new Date();
            await dataSource.getRepository(Ranking).save(ranking);
        } else {
            const newRanking = new Ranking();
            newRanking.fighter_id = fighters[i].id;
            newRanking.weight_class_id = weightClassId;
            newRanking.rank = i + 1;
            newRanking.updated_at = new Date();
            await dataSource.getRepository(Ranking).save(newRanking);
        }
    }
}

module.exports = { fightResolvers };