const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Koneksi ke database MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',         // ganti sesuai user MySQL kamu
  password: 'cacasayangmama',         // ganti sesuai password MySQL kamu
  database: 'karin_db'  // ganti sesuai nama database kamu
});

// Endpoint login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.query(
    'SELECT * FROM users WHERE username = ? AND password = ?',
    [username, password],
    (err, results) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      if (results.length > 0) {
        res.json({ success: true, user: results[0] });
      } else {
        res.json({ success: false, message: 'Username atau password salah' });
      }
    }
  );
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});