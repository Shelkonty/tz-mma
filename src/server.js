require("reflect-metadata");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const { ApolloServerPluginLandingPageGraphQLPlayground } = require("@apollo/server-plugin-landing-page-graphql-playground");
const { AppDataSource } = require("./data-source");
const { resolvers } = require("./resolvers");
const { typeDefs } = require("./schema");

async function startServer() {
    const app = express();

    await AppDataSource.initialize();
    console.log("Database connected");

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    });

    await server.start();

    app.use(cors());
    app.use(bodyParser.json());
    app.use(
        "/graphql",
        expressMiddleware(server, {
            context: async () => ({ dataSource: AppDataSource }),
        })
    );

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}/graphql`);
    });
}

startServer().catch(console.error);