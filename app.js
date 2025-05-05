const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

let apiKey = "sk_live_1234567890abcdef";
apiKey = apiKey.replace("sk_live_", "sk_test_");

app.use(express.static(path.join(__dirname, 'public')));

app.get('/about', (req, res) => {
  res.send('<h2>About Page - This is manually deployed</h2>');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});