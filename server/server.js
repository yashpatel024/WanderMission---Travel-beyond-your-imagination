import { userRoutes } from './routes/index';

const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config({
    path: "./config.env"
});

const port = process.env.PORT || 5000;

//disabling "x-powered-by", so requester doesn't know we are using express
app.disable('x-powered-by');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Adding routing 
const apiRouter = express.Router();
app.use("/mission",apiRouter);
apiRouter.use("/user",userRoutes);

// app.use(require("./routes/index"));

//get driver connection
const dbo = require("./database/conn");

app.listen(port, () => {
    //db connection when server starts
    dbo.connectDb();

    console.log(`Server is running on port: ${port}`);
})