import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from "./routes/index.js";
import dotenv from 'dotenv';

import connectDB from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

// CORS configuration
const corsOptions = {
  origin: [
    'https://answerly-five.vercel.app',
    'http://localhost:5173', // for local development
    'http://localhost:3000'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




app.use('/api', routes);



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});