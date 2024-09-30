import express from "express";
import {db} from "./db.js";
import morgan from "morgan";
import constants from "./constants.js";
import controller from "./controller.js";
import bodyParser from "body-parser";


const server = constants.server;
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan("short"));



app.get("/", async (req, res) => {
    return res.status(200).send({ status: "success", message: "<<<BACKEND RUNNING>>>" })
})
controller.start(app);
// start/test database connection
db.authenticate()
    .then(() => {
        console.log("DB Connected...");
    })
    .catch((err) => {
        console.log(err);
    });

app.listen(server.PORT, (err) => {
    if (err) {
        console.log(`***${err}`)
    } else {
        console.log(`Server started at ${server.PORT}`)
    }
})

export {app};


// `
// INPUT: {
//     LABEL:"AB1-202",
//     L1:true,
//     L2:false,
//     L3:true,
//     L4:false,
//     count:10
// }
// `
// `
// TRANSULATION TABLE: {
//     L1:33,
//     L2:25,
//     L3:26,
//     L4:27
// }
// `
