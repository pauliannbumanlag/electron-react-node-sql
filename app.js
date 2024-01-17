const express = require('express');
const sqlite3 = require('sqlite3');

const app = express();
const port = 3000;

// Create a SQLite database
const db = new sqlite3.Database('./mydatabase.db');

// Create a table (you can customize this according to your needs)
db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        username TEXT,
        email TEXT
    )
`);

// Express middleware to parse JSON
app.use(express.json());

// Define routes
app.get('/users', (req, res) => {
    // Fetch all users from the database
    db.all('SELECT * FROM users', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ users: rows });
    });
});

app.post('/users', (req, res) => {
    const { username, email } = req.body;

    // Insert a new user into the database
    db.run('INSERT INTO users (username, email) VALUES (?, ?)', [username, email], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }

        res.json({ userId: this.lastID });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});