const cors = require('cors');
const express = require('express');

const app = express();
const port = 5001;

app.use(cors());

app.use((req, res, next) => {
    console.log('Time:', Date.now());
    let headers = req.headers;
    if (headers.authorization && headers.authorization == "mysecrettoken") {
        next()
    } else {
        res.send(403);
    }
});

app.get('/time', (req, res, next) => {
    res.send(Date.now().toString());
});

app.get('/metrics', (req, res) => {
    res.send(JSON.stringify({
        resposneTime: 500102,
        responseMessage: "hello there"
    }));
});

app.listen(port, () => {
    console.log(`TEST APP - running on localhost:${port}`);
});