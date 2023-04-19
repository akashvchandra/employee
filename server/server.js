const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const app = express();

app.use(express.json());
app.use(cors());

const pool = new Pool({
    user: "postgres",
    host: "127.0.0.1",
    database: "form",
    mobile: "akash.2002",
    port: 5432,
});

const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
};

app.post("/", async (req, res) => {
    const { name, email, mobile, gender, qualification, prevexp, currentexp } = req.body;
    if (!validateEmail(email)) {
        res.json({ error: "Please enter a valid email" });
        return;
    }
    try {
        const newForm = await pool.query("INSERT INTO users (name, email, mobile, gender, qualification, prevexp, currentexp) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id", [
            name,
            email,
            mobile,
            gender,
            qualification,
            prevexp,
            currentexp,
        ]);
        console.log(newForm);
        res.json(newForm.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.json({ error: err.message });
    }
});

app.get("/", async (req, res) => {
    try {
        const allForms = await pool.query("SELECT name, email, id, mobile, gender, qualification, prevexp, currentexp FROM users");
        res.json(allForms.rows);
    } catch (err) {
        console.error(err.message);
        res.json({ error: err.message });
    }
});

app.listen(3000, () => {
    console.log("The server is running!");
});
