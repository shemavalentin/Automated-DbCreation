const { DataTypes } = require("sequelize");

const sequelize = require("./initializeSequelize");

/**
 * Define user model
 * Create models to represent your tables and define relationships
 */

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

module.exports = { User, Order };
