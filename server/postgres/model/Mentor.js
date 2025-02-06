import { DataTypes } from "sequelize";
import { sequelize } from "../postgres.js"; // Ensure this path is correct

const Mentor = sequelize.define(
  "mentors",
  {
    m_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    m_username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    m_password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    m_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  },
  { tableName: "mentors", timestamps: false }
);

export default Mentor;
