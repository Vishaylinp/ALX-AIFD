const express = require('express');
const app = express();
app.use(express.json());

const items = [];

app.get("/item ", (req, res) => {
    res.send(item);
})
