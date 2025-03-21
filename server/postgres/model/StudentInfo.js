import { DataTypes } from "sequelize";
import { sequelize } from "../postgresmodel.js"; 

const StudentInfo = sequelize.define(
  "student_info",
  {
    s_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    s_batch: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    s_sem: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    s_csec: {
      type: DataTypes.CHAR(1), 
      allowNull: false,
    },
    s_branch: {
      type: DataTypes.STRING, // Branch names like EXTC, IT, Electrical
      allowNull: false,
    },
    s_name: {
      type: DataTypes.STRING(50), // Student names
      allowNull: false,
    },
  },
  { 
    timestamps: false, // No createdAt and updatedAt fields
    tableName: "student_info" // Explicit table name
  }
);

export default StudentInfo;
