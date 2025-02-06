import { DataTypes } from "sequelize";
import { sequelize } from "../postgres.js"; // Ensure this path is correct

const MentorInfo = sequelize.define(
  "mentor_info",
  {
    m_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    m_batch: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    m_sem: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    m_csec: {
        type: DataTypes.CHAR,
        allowNull: false,
      },
      m_branch: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  },
  { tableName: "mentor_info", timestamps: false }
);

export default MentorInfo;
