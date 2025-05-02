// src/database/seed.js
const { AppDataSource } = require("../data-source");
const fs = require('fs');
const path = require('path');

async function seedDatabase() {
    console.log("\n🌱 Checking database and seeding if needed...");

    try {
        // Wait for the data source to initialize if it hasn't already
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }

        // Check if the database already has data
        const weightClassCount = await AppDataSource.getRepository("WeightClass").count();
        const fighterCount = await AppDataSource.getRepository("Fighter").count();
        const eventCount = await AppDataSource.getRepository("Event").count();

        if (weightClassCount > 0 && fighterCount > 0 && eventCount > 0) {
            console.log("✅ Database already contains data. Skipping seed process.");
            return;
        }

        console.log("🔄 Seeding database with initial data...");

        // Read SQL file content
        const seedFilePath = path.join(__dirname, 'seed.sql');
        const seedSQL = fs.readFileSync(seedFilePath, 'utf8');

        // Split the SQL file into separate statements
        // Note the improved statement separator detection
        const statements = seedSQL
            .replace(/\r\n/g, '\n')      // Normalize line endings
            .split(';')                  // Split by semicolon
            .map(stmt => stmt.trim())    // Trim whitespace
            .filter(stmt => stmt !== ''); // Remove empty statements

        // Execute each statement
        for (const statement of statements) {
            try {
                await AppDataSource.query(statement + ';');
            } catch (error) {
                console.error(`Error executing statement: ${statement.substring(0, 100)}...`);
                throw error;
            }
        }

        console.log("✅ Database seeded successfully!");

    } catch (error) {
        console.error("❌ Error seeding database:", error);
        throw error;
    }
}

// If this file is executed directly
if (require.main === module) {
    seedDatabase()
        .then(() => process.exit(0))
        .catch(error => {
            console.error(error);
            process.exit(1);
        });
} else {
    // Export for use in other files
    module.exports = { seedDatabase };
}