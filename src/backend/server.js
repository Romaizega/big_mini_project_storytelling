const express = require('express');
const cors = require('cors')
require('dotenv').config()
const db = require('./db/knex')
const authRouter = require('../backend/routers/auth_router')
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json())
app.use(cors())

app.get('/', (req, res)=>{
  res.send("Hello test")
})

app.use('/api/auth', authRouter)

// Test connect for server
app.listen(PORT, ()=> {
  console.log(`Server running on port ${PORT}`);
  
})

// Test connect for database
app.get('/db-test', async (req, res) => {
  try {
    const result = await db.raw('SELECT NOW()');
    res.json({ dbTime: result.rows[0].now });
  } catch (err) {
    console.error('DB Error:', err.message);
    res.status(500).json({ error: 'Database connection failed' });
  }
});