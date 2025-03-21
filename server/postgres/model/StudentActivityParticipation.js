import { DataTypes } from "sequelize";
import { sequelize } from "../postgresmodel.js"; // Ensure this path is correct

const StudentActivityParticipation = sequelize.define(
  "student_activity_participation",
  {
    a_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    s_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    a_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    a_status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Not Approved", // Default status
    },
    a_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    a_sub_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    a_start_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    a_end_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    a_venue: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    a_level: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    a_points_scored: {
      type: DataTypes.INTEGER,
      allowNull: true, // Initially NULL
    },
  },
  { 
    tableName: "student_activity_participation", 
    timestamps: false 
  }
);

export default StudentActivityParticipation;
