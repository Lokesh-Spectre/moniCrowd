import sensorController from "./controllers/sensorController.js";
import transulationController from "./controllers/transulationController.js";
const controller = {}
controller.start = (app)=>{
    app.use("/sensors",sensorController);
    app.use("/translations",transulationController);
}
export default controller;