import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

const app = express();
dotenv.config();

mongoose.connect((process.env.MONGO_URL))
.then(()=>{
  console.log('connected to db!');
})
.catch((err)=>{
  console.log(err);
})

app.listen(process.env.PORT, () => {
  console.log('server is running on port 8000');
})















