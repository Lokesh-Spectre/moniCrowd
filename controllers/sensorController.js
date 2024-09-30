import express from "express";
import transulationModel from "../models/transulationModel.js";
import roomModel from "../models/roomModel.js";
const router = express.Router();
router.post("/",async (req,res)=>{
    const data = req.body;

    const trans = await transulationModel.findAll({where:{
        roomName:data.LABEL
    }})
    
    var room = await roomModel.findOne({where:{
        roomName:data.LABEL
    }});
    if (!room){
        room = await roomModel.create({
            roomName:data.LABEL,
            
        })
    }

    console.log(data);
    res.send(200);
})

export default router;