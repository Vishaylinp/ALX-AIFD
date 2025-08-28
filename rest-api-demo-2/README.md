# Simple REST API

A simple REST API built with Node.js and Express.

## Endpoints

- `GET /items` - Returns a list of all items
- `POST /items` - Adds a new item to the list

## Getting Started

### Prerequisites

- Node.js installed on your machine

### Installation

1. Install dependencies:
   ```
   npm install
   ```

2. Start the server:
   ```
   npm start
   ```

3. The server will run on port 3000. You can access it at http://localhost:3000

## Usage Examples

### Get all items
```
curl http://localhost:3000/items
```

### Add a new item
```
curl -X POST -H "Content-Type: application/json" -d '{"name":"Example Item","description":"This is an example item"}' http://localhost:3000/items
```