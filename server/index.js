import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute.js'
import authRoute from './routes/authRoute.js'

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
// connecting to server
app.listen(8000, () => {
  console.log('connected to server');
})

app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);

app.use((err, req, res, next)=>{
  const statusCode = err.statusCode || 500;
  const message = err.message || 'internal server error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  })
});










