const { fighterResolvers } = require("./fighterResolvers");
const { eventResolvers } = require("./eventResolvers");
const { fightResolvers } = require("./fightResolvers");
const { rankingResolvers } = require("./rankingResolvers");

const resolvers = {
    Query: {
        ...fighterResolvers.Query,
        ...eventResolvers.Query,
        ...fightResolvers.Query,
        ...rankingResolvers.Query,
    },
    Mutation: {
        ...fighterResolvers.Mutation,
        ...eventResolvers.Mutation,
        ...fightResolvers.Mutation,
    },
};

module.exports = { resolvers };