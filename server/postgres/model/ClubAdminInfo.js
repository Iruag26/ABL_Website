import { DataTypes } from "sequelize";
import { sequelize } from "../postgresmodel.js"; // Adjust if needed

const ClubAdminInfo = sequelize.define(
  "club_admin_info",
  {
    rollno: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    club_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "club_admin_info",
    timestamps: false,
  }
);

export default ClubAdminInfo;
