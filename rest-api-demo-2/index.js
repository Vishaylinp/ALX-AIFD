const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory data store
const items = [];

// GET endpoint to return all items
app.get('/items', (req, res) => {
  res.json(items);
});

// POST endpoint to add a new item
app.post('/items', (req, res) => {
  const newItem = req.body;
  items.push(newItem);
  res.status(201).json(newItem);
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});