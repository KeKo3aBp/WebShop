// server.js (backend)
const express = require('express');
const mysql = require('mysql2/promise'); // Используем promise-версию mysql2

const app = express();
app.use(express.json()); // Разрешает парсинг JSON

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'web',
});


app.get('/users', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM users');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.listen(3306, () => console.log('Server listening on port 3306'));