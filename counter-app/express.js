const express = require('express');

const app = express();
const port = 3000;

app.get('/',(req,res) => {
    console.log('Hello, world! Printed in server console');
    res.send('Check the server console.');
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});