import { DataTypes } from "sequelize";
import { db } from "../db.js";
import constants from "../constants.js";

const transulation = db.define("transulation",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    roomName: { type: DataTypes.TEXT, allowNull: false },
    deviceName: { type: DataTypes.TEXT, allowNull: false },
    pin: { type: DataTypes.INTEGER, allowNull: false }
  },
  {
    freezeTableName: true,
    timestamps: false
  }
);

transulation.sync({ force: constants.forceSync });

export default transulation;
