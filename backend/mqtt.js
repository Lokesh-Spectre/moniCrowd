import mqtt from "mqtt";
import {server} from "./constants.js";

const mqClient = mqtt.connect(server.mqtt_broker);

export {mqClient}