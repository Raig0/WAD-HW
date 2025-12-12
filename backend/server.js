const express = require("express");
const pool = require("./db");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

app.get("/posts", async (req, res) => {
    try {
        const posts = await pool.query("SELECT * FROM posts");
        res.json(posts.rows);
        console.log(posts.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/posts", async (req, res) => {
    const { body } = req.body;
    try {
        const newPost = await pool.query(
            "INSERT INTO posts (body, date) VALUES ($1, NOW()) RETURNING *",
            [body]
        );
        res.json(newPost.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/users", async (req, res) => {
    try {
        const users = await pool.query("SELECT * FROM users");
        res.json(users.rows);
        console.log(users.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(3000, () => console.log("Server jookseb port 3000 :D"));
