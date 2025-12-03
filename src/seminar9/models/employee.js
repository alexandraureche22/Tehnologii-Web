const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Employee = sequelize.define("Employee", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  firstName: {
    type: DataTypes.STRING,
    // allowNull: true by default
  },

  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    validate: {
      isEmail: true,
    },
  },

  birthYear: {
    type: DataTypes.INTEGER,
    validate: {
      min: 1900,
    },
  },

  // 🔥 câmpul cerut în exercițiu
  salary: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0, // valoare minimă 0
    },
  },
});

module.exports = Employee;
