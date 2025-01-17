/**
 * Sync models to the Database
 * Use sync() method to create the database and tables automatically based on model definitios
 */

const sequelize = require("./initializeSequelize");
const { User, Order } = require("./modelDefinition");
// Note that here I used an IIFE

(async () => {
  try {
    // connecting to the database
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    // Sync models to the database
    await sequelize.sync({ force: true }); // Use 'force:true' to drop and recreate tables
    console.log("Database synced successfully.");

    // Optionally, you can create some data
    const user = await User.create({ name: "Shema Valentin" });
    await Order.create({ totalAmount: 100.5, userId: user.id });

    console.log("Sample data added");
  } catch (error) {
    console.error("Unable to connect to the database", error);
  } finally {
    await sequelize.close();
  }
})();
