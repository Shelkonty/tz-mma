const { Event } = require("../entities/Event");

const eventResolvers = {
    Query: {
        events: async (_, __, { dataSource }) => {
            return dataSource.getRepository(Event).find({ relations: ["fights"] });
        },

        event: async (_, { id }, { dataSource }) => {
            return dataSource.getRepository(Event).findOne({
                where: { id },
                relations: ["fights"]
            });
        },

        upcomingEvents: async (_, __, { dataSource }) => {
            return dataSource.getRepository(Event).find({
                where: { date: MoreThan(new Date()) },
                order: { date: "ASC" },
                relations: ["fights", "fights.fighter1", "fights.fighter2"]
            });
        },
    },

    Mutation: {
        createEvent: async (_, { name, date, location, venue }, { dataSource }) => {
            const event = new Event();
            event.name = name;
            event.date = new Date(date);
            event.location = location;
            event.venue = venue;

            return dataSource.getRepository(Event).save(event);
        },
    },
};

module.exports = { eventResolvers };