const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3001;

app.use(bodyParser.json());

// SQLite database setup
const db = new sqlite3.Database('./data/db');

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)");
});

// API endpoint to get all users
app.get('/api/users', (req, res) => {
    db.all("SELECT * FROM users", (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        res.json(rows);
    });
});

// API endpoint to add a new user
app.post('/api/users', (req, res) => {
    const { name } = req.body;
    db.run("INSERT INTO users (name) VALUES (?)", [name], function (err) {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        res.join({ id: this.lastID });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});