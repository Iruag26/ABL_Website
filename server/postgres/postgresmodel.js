import { Sequelize } from "sequelize";

const sequelize = new Sequelize("ABLwebsitDB", "postgres", "gauri26", {
  host: "localhost",
  dialect: "postgres",
  port: 5433,
  pool: {
    max: 10, // Max connections
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export { sequelize, connection };
