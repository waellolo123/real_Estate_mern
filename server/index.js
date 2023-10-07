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
  console.log('server is running on port 8000');
})

app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);












