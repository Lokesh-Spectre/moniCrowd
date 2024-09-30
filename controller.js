import sensorController from "./controllers/sensorController.js";

const controller = {}
controller.start = (app)=>{
    app.use("/sensors",sensorController);
}
export default controller;