const express = require('express');
const promMid = require('express-prometheus-middleware');
require('dotenv').config();

const router = require('./router.js');

const app = express();
const port = 5001;

app.use("/", router);

app.use((req, res, next) => {
    console.log('Time:', Date.now());
    let headers = req.headers;
    if (headers.authorization && headers.authorization == process.env.REACT_APP_ACCESS_TOKEN) {
        next();
    } else {
        res.send(403);
    }
});

app.use(promMid({
    // TODO: Store as sepaate file,  export as JS object
    metricsPath: '/metrics',
    collectDefaultMetrics: true,
    includeMethod: true,
    includePath: true,
    requestDurationBuckets: [0.1, 0.5, 1, 1.5],
    requestLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
    responseLengthBuckets: [512, 1024, 5120, 10240, 51200, 10240],
}));

app.listen(port, () => {
    console.log(`TEST APP - running on localhost:${port}`);
});