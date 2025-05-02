const axios = require('axios');

const API_URL = 'http://localhost:4000/graphql';

async function graphqlRequest(query, variables = {}) {
        const response = await axios.post(API_URL, {
            query,
            variables,
        });
        if (response.data.errors) {
            console.error('GraphQL Errors:', response.data.errors);
        }
        return response.data;
}

async function runTests() {
        const createFighterQuery = `
      mutation CreateFighter($firstName: String!, $lastName: String!, $weightClassId: Int!, $nationality: String!) {
        createFighter(
          firstName: $firstName
          lastName: $lastName
          weightClassId: $weightClassId
          nationality: $nationality
        ) {
          id
          first_name
          last_name
        }
      }
    `;

        const fighter1 = await graphqlRequest(createFighterQuery, {
            firstName: "Jon",
            lastName: "Jones",
            weightClassId: 1,
            nationality: "USA"
        });

        console.log('Created Fighter:', fighter1.data.createFighter);

        const getAllFightersQuery = `
      query {
        fighters {
          id
          first_name
          last_name
          nationality
        }
      }
    `;

        const allFighters = await graphqlRequest(getAllFightersQuery);
        console.log('All Fighters:', allFighters.data.fighters);

        const createEventQuery = `
      mutation CreateEvent($name: String!, $date: String!, $location: String!, $venue: String!) {
        createEvent(
          name: $name
          date: $date
          location: $location
          venue: $venue
        ) {
          id
          name
        }
      }
    `;

        const event = await graphqlRequest(createEventQuery, {
            name: "UFC 301",
            date: "2025-07-01",
            location: "New York",
            venue: "Madison Square Garden"
        });

        console.log('Created Event:', event.data.createEvent);
}

runTests();