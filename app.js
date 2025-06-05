// const express = require('express');
// const path = require('path');
// const app = express();
// const port = 3000;

// app.use(express.static(path.join(__dirname, 'public')));

// app.get('/about', (req, res) => {
//   res.send('<h2>About Page - This is manually deployed</h2>');
// });

// app.listen(port, '0,0,0,0', () => {
//   console.log(`Server running at http://localhost:${port}`);
// });

// CODE SMEEL VERSION
var express = require('express'); // gunakan var
var path = require('path');
var app = express();
var port = 3000;

// Fungsi tidak digunakan
function unusedFunction() {
  return "This function is never used";
}

app.use(express.static(path.join(__dirname, 'public')));

app.get('/about', (req, res) => {
  res.send('<h2>About Page - This is manually deployed</h2>');
});

// route dengan HTML inline panjang
app.get('/long', (req, res) => {
  res.send('<html><head><title>Long</title></head><body><h1>This is a very long inline HTML that should be in template</h1></body></html>');
});

// comparison tidak strict
if (port == '3000') {
  console.log("Port is 3000"); // penggunaan console.log
}

// callback nested
function step1(callback) {
  console.log("Step 1");
  callback();
}

function step2(callback) {
  console.log("Step 2");
  callback();
}

function step3() {
  console.log("Step 3");
}

step1(() => {
  step2(() => {
    step3();
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${port}`);
});
