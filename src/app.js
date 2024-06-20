import express from "express";
import cors from "cors";
import logger from "./utils/logger";
import 'dotenv/config';
import { connect } from "./utils/database.connection";

const app = express();
const PORT = process.env.PORT || "8090";        //check if there is PORT envirenment variable. If not use use 8090 Port

app.use(cors());

app.use(express.json({ limit: "20mb" }))          //limits the size of json request body

app.get("/", (req, res, next) => {                              //at the endpoint what want to see on the browser
    res.send("<h2>Library Management System API<h2>");
    next();
})

app.listen(PORT, () => {                                            //function for run the server

    // logger.info("This is Testing");
    // logger.error("This is Error");
    // logger.warn("This is Warning");

    logger.info(`Server is up and running on PORT ${PORT}`);

    connect();
});

