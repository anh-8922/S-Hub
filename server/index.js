import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from "cookie-parser"

import dbConnect from './src/config/db.js'
import userRoutes from './src/routes/userRoutes.js'
import guideRoutes from './src/routes/guideRoutes.js'
import communityRoutes from './src/routes/communityRoutes.js'
import housingRoutes from './src/routes/housingRoutes.js'
import serviceProviderRoutes from './src/routes/serviceProviderRoutes.js'
import  serviceRequestRoutes from './src/routes/serviceRequestRoutes.js'
import replyRoutes from "./src/routes/replyRoutes.js"
import messageRoutes from './src/routes/messageRoutes.js'

dotenv.config();
dbConnect();

const app = express();
// app.use(cors());
const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? process.env.CLIENT
      : "http://localhost:3000",
  credentials: true,
  preflightContinue: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));  
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded ({extended : false}));



app.use('/guide', guideRoutes)
app.use('/user', userRoutes)
app.use('/community', communityRoutes)
app.use('/housing', housingRoutes)
app.use('/serviceprovider', serviceProviderRoutes)
app.use('/servicerequests', serviceRequestRoutes)
app.use('/reply', replyRoutes)
app.use('/message', messageRoutes)
app.use("/image", express.static("./server/uploads"));

app.use("/uploads", express.static("./server/uploads"))

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server is up and running at port ${port}`))