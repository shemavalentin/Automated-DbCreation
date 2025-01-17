/**
 * Set up Sequelize in project by crating a configuration file for the database connection.
 * Create Tables(Models), ralationship and constraint automatically but db you create it manually.
 */

// const { Sequelize } = require("sequelize");

// // Initialize Sequelize with database credentials
// const sequelize = new Sequelize("autocreateDB", "postgres", "Devops@2023", {
//   host: "localhost",
//   dialect: "postgresql",
// });

// module.exports = sequelize;

// WHEN I NEED TO CREATE A DATABASE ALSO AUTOMATICALLY, I CAN DO THIS:
//*************************** */

const { Sequelize } = require("sequelize");
const { Client } = require("pg");

const dbName = "DbCreation";
const dbUser = "postgres";
const dbPassword = "Devops@2023";
const dbHost = "localhost";

(async () => {
  try {
    // Connect to PostgreSQL without specifying a database
    const client = new Client({
      host: dbHost,
      user: dbUser,
      password: dbPassword,
    });
    await client.connect();

    // Check if the database exists, and create it if it doesn't
    const dbCheckQuery = `SELECT 1 FROM pg_database WHERE datname = '${dbName}'`;
    const dbCheckResult = await client.query(dbCheckQuery);

    if (dbCheckResult.rowCount === 0) {
      await client.query(`CREATE DATABASE ${dbName}`);
      console.log(`Database '${dbName}' created.`);
    } else {
      console.log(`Database '${dbName}' already exists.`);
    }

    // Close the temporary connection
    await client.end();

    // Initialize Sequelize with the database name
    const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
      host: dbHost,
      dialect: "postgres",
    });

    // Test the connection
    await sequelize.authenticate();
    console.log("Sequelize connected successfully");

    // Define and sync models here as needed ....

    const User = sequelize.define("User", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });

    /**
     * Define Order table or Model
     * It will include the primary key from User model as a foreigh key
     */

    const Order = sequelize.define("Ordre", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      totalAmount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    });

    // Defining relationships

    User.hasMany(Order, { foreignKey: "userId" }); // One to  many
    Order.belongsTo(User, { foreignKey: "userId" }); // Inverse relationship
  } catch (error) {
    console.error("Error:", error);
  }
})();
