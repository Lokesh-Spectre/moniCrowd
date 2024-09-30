import { DataTypes } from "sequelize";
import { db } from "../db.js";
import constants from "../constants.js";

  const room = db.define("room",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      roomName: { type: DataTypes.TEXT, allowNull: false },
      devicesState: { type: DataTypes.JSON, allowNull: false },
      peopleCount: { type: DataTypes.INTEGER, allowNull: false }
    },
    {
      freezeTableName: true,
      timestamps: true
    }
  );

  room.sync({ force: constants.forceSync });
export default room;
