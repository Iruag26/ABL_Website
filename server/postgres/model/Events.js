import { DataTypes } from "sequelize";
import { sequelize } from "../postgresmodel.js"; // Adjust the path to your setup

const Events = sequelize.define(
  "events",
  {
    e_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    e_name: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    e_org: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    e_cost: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    e_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    e_category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    e_img: {
      type: DataTypes.BLOB("long"),
      allowNull: true,
    },
    e_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    e_start_time: {
      type: DataTypes.TIME, // ✅ New field
      allowNull: true,
    },
    e_end_time: {
      type: DataTypes.TIME, // ✅ New field
      allowNull: true,
    },
    e_link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    e_description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "events",
    timestamps: false,
  }
);

export default Events;
