import express from "express";
import transulationModel from "../models/transulationModel.js";
import roomModel from "../models/roomModel.js";
import mqtt from "mqtt";
import {server} from "../constants.js";

const mqClient = mqtt.connect(server.mqtt_broker);

const router = express.Router();
router.post("/",async (req,res)=>{
    const data = req.body;

    const trans_data = await transulationModel.findAll({where:{
        roomName:data.LABEL
    }})
    const trans = {};
    trans_data.forEach(e=>{
        trans[e.deviceName] = e.pin;
    })
    const [room, created] = await roomModel.findOrCreate({where:{
            roomName:data.LABEL
        },
        defaults:{
            devicesState:(({LABEL,peopleCount,...o})=>o)(data),
            peopleCount:data.peopleCount
        }
    })
    if (!created){
        room.devicesState = (({LABEL,peopleCount,...o})=>o)(data);
        await room.update({...room});
    }
    // expected error cases
    if (trans.length == 0){
        res.status(500).send({message:"there is no pin transulation entries for given label"});
        return;
    }
    // console.log(room)
    const topic = `rooms/${room.roomName}`
    const payload = {}
    for (var device in room.devicesState ){ 
        
        var state = room.devicesState[device]==true?"HIGH":"LOW";
        var pin = trans[device];
        if (pin!=undefined){
            payload[pin] = state;
        }
    }
    
    mqClient.publish(topic,JSON.stringify(payload));
    console.log(`TOPIC: ${topic}\npayload: ${JSON.stringify(payload)}`);
    res.send(200);
})

export default router;