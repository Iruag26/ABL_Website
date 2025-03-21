import { DataTypes } from "sequelize";
import { sequelize } from "../postgresmodel.js"; // Ensure this path is correct

const Student = sequelize.define(
  "students",
  {
    s_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    s_username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    s_password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
);

export default Student;
