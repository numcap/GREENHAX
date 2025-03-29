import express, { json } from 'express';

const app = express();
const PORT = 3000;

// Middleware
app.use(json());

// Routes
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});