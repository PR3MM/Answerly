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
  origin: function (origin, callback) {
    const allowedOrigins = [
      'https://answerly-five.vercel.app',
      'http://localhost:5173',
      'http://localhost:3000'
    ];
    
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  optionsSuccessStatus: 200,
  preflightContinue: false
};

app.use(cors(corsOptions));

// Handle preflight requests explicitly
// Use '/*' instead of '*' because path-to-regexp rejects bare '*'
app.options('/*', cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Self-ping mechanism to keep Render service alive
function initializeSelfPing() {
  // Only run in production (Render environment)
  if (process.env.NODE_ENV !== 'production') {
    console.log('🔧 Self-ping disabled in development mode');
    return;
  }

  const PING_INTERVAL = 13 * 60 * 1000; // 13 minutes
  const SERVICE_URL = process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`;
  
  function selfPing() {
    fetch(`${SERVICE_URL}/health`)
      .then(response => {
        if (response.ok) {
          console.log(`✅ Self-ping successful at ${new Date().toISOString()}`);
        } else {
          console.log(`⚠️ Self-ping returned ${response.status} at ${new Date().toISOString()}`);
        }
      })
      .catch(error => {
        console.error(`❌ Self-ping failed at ${new Date().toISOString()}:`, error.message);
      });
  }

  // Start self-pinging after app is fully ready
  setTimeout(() => {
    console.log('🚀 Starting self-ping mechanism...');
    console.log(`📍 Pinging: ${SERVICE_URL}/health every 13 minutes`);
    
    selfPing(); // Initial ping
    setInterval(selfPing, PING_INTERVAL); // Recurring pings
  }, 30000); // Wait 30 seconds for app to fully start
}



app.use('/api', routes);



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  initializeSelfPing();
});
