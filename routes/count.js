import express from "express";
import { client } from "../index.js";
import {ObjectId} from "mongodb";
import { auth } from "../middleware/auth.js";

const router = express.Router();


router.get("/getAllCount",auth, async (req,res)=>{

    try{
    
    const tasksData = await client.db("zenStudentDashboard").collection("tasks").find().toArray();
    const classesData = await client.db("zenStudentDashboard").collection("classes").find().toArray();

    const count = { classes : classesData.length, tasks : tasksData.length}
    res.send(count)
    }catch(error){
        res.status(404).send(error.message);
    }
})



export const countRouter = router;