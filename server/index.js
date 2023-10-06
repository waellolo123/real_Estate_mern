import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

const app = express();
dotenv.config();

app.listen(process.env.PORT, () => {
  console.log('server is running on port 8000');
})















