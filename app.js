const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/about', (req, res) => {
  res.send('<h2>About Page - This is manually deployed</h2>');
});

app.listen(3000, '0.0.0.0', () => {
  console.log("App running on port 3000");
});
