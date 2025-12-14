require("dotenv").config();
const express = require("express");
const pool = require("./db");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");

app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

function generateAccessToken(payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token missing" });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid token" });
        req.user = user;
        next();
    });
}

app.get("/posts", authenticateToken, async (req, res) => {
    try {
        const posts = await pool.query("SELECT * FROM posts");
        res.json(posts.rows);
    } catch (err) {
        console.error(err.message);
    }
});
// updateb postitust
app.put("/posts/:id", authenticateToken, async (req, res) => {
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
app.delete("/posts/:id", authenticateToken, async (req, res) => {
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
app.delete("/posts", authenticateToken, async (req, res) => {
    try {
        await pool.query("DELETE FROM posts");
        res.json({ message: "All posts deleted successfully" });
    } catch (err) {
        console.error(err.message);
    }
});
// saab kindla postituse id järgi
app.get("/posts/:id", authenticateToken, async (req, res) => {
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

app.post("/posts", authenticateToken, async (req, res) => {
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
        const existing = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );
        if (existing.rows.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = await pool.query(
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
            [email, password]
        );

        const token = generateAccessToken({ email: newUser.rows[0].email });
        res.json({ token });
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const userRes = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );
        if (userRes.rows.length === 0) {
            return res.status(400).json({ message: "User not found" });
        }
        const user = userRes.rows[0];
        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = generateAccessToken({ email: user.email });
        res.json({ token });
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
