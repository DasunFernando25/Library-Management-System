import 'dotenv/config';
import express from "express";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import logger from "./utils/logger";
import config from "./configs";
import { routesInit } from "./api/routes/routeIndex";
import { connect } from "./utils/database.connection";
import { googleAuth } from "./configs/google.config";

const app = express();
const PORT = process.env.PORT || "8090";        //check if there is PORT envirenment variable. If not use use 8090 Port

app.use(cors());

app.use(express.json({ limit: "20mb" }));          //limits the size of json request body
 
app.use(
    session({
        secret: config.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { 
            secure: false,
            expires: new Date(Date.now() + 10000),
            maxAge:  10000
        }
    })
)

app.use(passport.initialize());

app.use(passport.session());

app.get("/", (req, res, next) => {                              //at the endpoint what want to see on the browser
    // res.send("<h2>Library Management System API<h2>");
    res.send("<a href = 'http://localhost:8090/auth/google'>Login with Google</a>");
    next();
})

app.listen(PORT, () => {                                            //function for run the server

    // logger.info("This is Testing");
    // logger.error("This is Error");
    // logger.warn("This is Warning");

    logger.info(`Server is up and running on PORT ${PORT}`);

    connect();

    routesInit(app, passport);

    googleAuth(passport);
}); 

