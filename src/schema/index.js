const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Fighter {
    id: ID!
    first_name: String!
    last_name: String!
    weight_class_id: Int!
    weightClass: WeightClass
    nationality: String!
    team: String
    wins: Int!
    losses: Int!
    knockouts: Int!
    submissions: Int!
    fightsAsFighter1: [Fight!]
    fightsAsFighter2: [Fight!]
    rankings: [Ranking!]
  }

  type WeightClass {
    id: ID!
    name: String!
    weight_limit: Float!
    gender: String!
    fighters: [Fighter!]
    rankings: [Ranking!]
  }

  type Event {
    id: ID!
    name: String!
    date: String!
    location: String!
    venue: String!
    fights: [Fight!]
  }

  type Fight {
    id: ID!
    event_id: Int!
    fighter1_id: Int!
    fighter2_id: Int!
    winner_id: Int
    result_type: String
    round: Int
    time: String
    event: Event
    fighter1: Fighter
    fighter2: Fighter
  }

  type Ranking {
    id: ID!
    fighter_id: Int!
    weight_class_id: Int!
    rank: Int!
    updated_at: String!
    fighter: Fighter
    weightClass: WeightClass
  }

  type Query {
    fighters: [Fighter!]!
    fighter(id: Int!): Fighter
    fighterHistory(fighterId: Int!): [Fight!]!
    events: [Event!]!
    event(id: Int!): Event
    upcomingEvents: [Event!]!
    fights: [Fight!]!
    fight(id: Int!): Fight
    getRankings(weightClassId: Int!): [Ranking!]!
  }

  type Mutation {
    createFighter(
      firstName: String!
      lastName: String!
      weightClassId: Int!
      nationality: String!
      team: String
    ): Fighter!

    updateFighter(
      id: Int!
      firstName: String
      lastName: String
      weightClassId: Int
      nationality: String
      team: String
    ): Fighter!

    deleteFighter(id: Int!): Boolean!

    createEvent(
      name: String!
      date: String!
      location: String!
      venue: String!
    ): Event!

    createFight(
      eventId: Int!
      fighter1Id: Int!
      fighter2Id: Int!
    ): Fight!

    recordFightResult(
      fightId: Int!
      winnerId: Int!
      resultType: String!
      round: Int!
      time: String!
    ): Fight!
  }
`;

module.exports = { typeDefs };