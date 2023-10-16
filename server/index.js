import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoute from './routes/userRoute.js';
import authRoute from './routes/authRoute.js';
import listingRoute from './routes/listingRoute.js';

dotenv.config();


// connecting to database
mongoose
.connect("mongodb://localhost:27017/real_estate")
.then(()=>{
  console.log('connected to db!');
})
.catch((err)=>{
  console.log(err);
});
// initialize app express
const app = express();
// middelwares
app.use(express.json());
app.use(cors());
app.use(cookieParser());
// connecting to server
app.listen(8000, () => {
  console.log('connected to server');
})

app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/listing', listingRoute);

app.use((err, req, res, next)=>{
  const statusCode = err.statusCode || 500;
  const message = err.message || 'internal server error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  })
});










