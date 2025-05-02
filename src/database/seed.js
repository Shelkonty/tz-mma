const { AppDataSource } = require("../data-source");
const fs = require('fs');
const path = require('path');

async function seedDatabase() {
    console.log("Checking");

        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }

        const weightClassCount = await AppDataSource.getRepository("WeightClass").count();
        const fighterCount = await AppDataSource.getRepository("Fighter").count();
        const eventCount = await AppDataSource.getRepository("Event").count();

        if (weightClassCount > 0 && fighterCount > 0 && eventCount > 0) {
            console.log("database already contains data.");
            return;
        }

        console.log("Seeding database with initial data...");

        const seedFilePath = path.join(__dirname, 'seed.sql');
        const seedSQL = fs.readFileSync(seedFilePath, 'utf8');

        const statements = seedSQL
            .replace(/\r\n/g, '\n')
            .split(';')
            .map(stmt => stmt.trim())
            .filter(stmt => stmt !== '');

        for (const statement of statements) {
            try {
                await AppDataSource.query(statement + ';');
            } catch (error) {
                console.error(`Error executing statement: ${statement.substring(0, 100)}...`);
                throw error;
            }
        }

        console.log("successfully!");
}

if (require.main === module) {
    seedDatabase()
        .then(() => process.exit(0))
        .catch(error => {
            console.error(error);
            process.exit(1);
        });
} else {
    module.exports = { seedDatabase };
}