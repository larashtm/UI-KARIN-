const express = require('express');
const app = express();
const path = require('path');

// Serve semua file di folder 'SRC'
app.use(express.static(path.join(__dirname)));

// Route utama
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Route login
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});