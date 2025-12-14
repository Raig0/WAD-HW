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
    } catch (err) {
        console.error(err.message);
    }
});
// updateb postitust
app.put("/posts/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { body } = req.body;
        const updatePost = await pool.query(
            "UPDATE posts SET body = $1 WHERE id = $2 RETURNING *",
            [body, id]
        );
        res.json(updatePost.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});
// kustutab postituse
app.delete("/posts/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletePost = await pool.query("DELETE FROM posts WHERE id = $1", [
            id,
        ]);
        res.json({ message: "Post deleted successfully" });
    } catch (err) {
        console.error(err.message);
    }
});
// kustutab kõik postitused
app.delete("/posts", async (req, res) => {
    try {
        await pool.query("DELETE FROM posts");
        res.json({ message: "All posts deleted successfully" });
    } catch (err) {
        console.error(err.message);
    }
});
// saab kindla postituse id järgi
app.get("/posts/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const post = await pool.query("SELECT * FROM posts WHERE id = $1", [
            id,
        ]);
        if (post.rows.length === 0) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.json(post.rows[0]);
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

app.post("/users", async (req, res) => {
    const { email, password } = req.body;
    try {
        const newUser = await pool.query(
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
            [email, password]
        );
        res.json(newUser.rows[0]);
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
