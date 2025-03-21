import { DataTypes } from "sequelize";
import { sequelize } from "../postgresmodel.js"; 

const Mentor = sequelize.define(
  "mentors",
  {
    m_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,  // ✅ Ensure auto-increment is enabled
    },
    m_username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // ✅ Prevent duplicate usernames
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
