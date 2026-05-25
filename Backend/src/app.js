//create server
const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const foodRoutes = require('./routes/food.routes');
const foodPartnerRoutes = require('./routes/food-partner.routes');
const cors = require('cors');

const app = express();
app.use(cookieParser());
app.use(express.json());

// Configure CORS origins via environment variable FRONTEND_URLS (comma-separated)
const allowedFrontends = (process.env.FRONTEND_URLS || 'http://localhost:5173,https://reel-5wnb.vercel.app')
  .split(',')
  .map(s => s.trim())

app.use(cors({
    origin: function(origin, callback) {
        // allow requests with no origin (like mobile apps or curl)
        if (!origin) return callback(null, true);
        if (allowedFrontends.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('CORS policy: This origin is not allowed: ' + origin));
        }
    },
    credentials: true,
}));

app.get('/',(req,res)=>{
    res.send('Hello World');
})



app.use('/api/auth',authRoutes);
app.use('/api/food',foodRoutes);
app.use('/api/food-partner',foodPartnerRoutes);






module.exports = app;