import express from "express";
import { Db, MongoClient } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import { userRouter } from "./routes/users.js";
import { classesRouter } from "./routes/classes.js";
import { tasksRouter } from "./routes/tasks.js";
import { countRouter } from "./routes/count.js";

const app = express();
dotenv.config(); 

app.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-auth-token, Origin, Content-Type, Accept"
    );
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-control-Allow-Methods", "GET, POST, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Origin,X-Requested-With, content-type,Accept,Authorization");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

app.use(express.json());

const port = process.env.PORT || 4000;

const mongo_URL = process.env.Mongo_URL;

async function createConnection(){
    const client = new MongoClient(mongo_URL);
    await client.connect();
    // console.log(client);
    console.log("Mongo is connected");
    return client;
}

export const client = await createConnection();

app.get("/", async function(request,response){
    response.send("Hi, Welcome to Capstone...!!!")
})


app.use("/users",userRouter);
app.use("/classes",classesRouter);
app.use("/tasks",tasksRouter);
app.use("/count",countRouter);




app.listen(port,()=>console.log(`App has started in port ${port}`));