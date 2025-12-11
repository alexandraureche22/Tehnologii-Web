const { Sequelize } = require("sequelize");

const isProduction =
  process.env.NODE_ENV === "production" || process.env.DATABASE_URL;

let sequelize;

if (isProduction) {
  // Conexiune pentru Heroku (PostgreSQL)
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    protocol: "postgres",
    // Opțiuni necesare pentru a funcționa cu SSL pe Heroku
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false,
  });
} else {
  // Conexiune locală (SQLite)
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./sqlite/database.db",
    logging: console.log,
  });
}

module.exports = sequelize;
