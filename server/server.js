const express = require('express');

const app = express();
const port = 5001;

app.get('/', (req, res) => {
    res.send('Node.js backend');
});

app.listen(port, () => {
    console.log(`TEST APP - running on localhost:${port}`);
});