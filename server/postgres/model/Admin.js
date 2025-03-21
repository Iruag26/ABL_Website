import { DataTypes } from "sequelize";
import { sequelize } from "../postgresmodel.js"; // Ensure this path is correct

const Admin = sequelize.define(
    "admin",
    {
        a_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        a_username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        a_password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    { tableName: "admin", timestamps: false }
);

export default Admin;
