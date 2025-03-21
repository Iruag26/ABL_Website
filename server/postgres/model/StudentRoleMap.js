import { DataTypes } from "sequelize";
import { sequelize } from "../postgresmodel.js";

const StudentRoleMap = sequelize.define(
  "student_role_map",
  {
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true, // Set it as part of the composite primary key
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true, // Set it as part of the composite primary key
    },
  },
  {
    tableName: "student_role_map",
    timestamps: false,
  }
);
  

export default StudentRoleMap;
