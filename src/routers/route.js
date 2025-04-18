

const express = require("express");
const bodyParser = require("body-parser");
const pg = require("pg");
require('dotenv').config();

const app = express();
const router = express.Router();
const port = 3000;
const db = new pg.Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: "Alumni",
});

const staticFiles = "C:\\Users\\DELL\\Desktop\\Webdash\\public";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(staticFiles));
app.set('view engine', 'ejs');
app.set('views', 'C:\\Users\\DELL\\Desktop\\Webdash\\views');


db.connect();

app.get("/", (req, res) => {
    res.sendFile(staticFiles + "\\home.html")
})

app.get('/directory', (req, res) => {
    res.render("alumniCards.ejs")
})

app.get("/achievements", (req, res) => {
    const achievements = [
        {
            title: "1st Place - AI Hackathon",
            description: "Won 1st place in an inter-college AI Hackathon for building an AI traffic controller.",
            date: "March 2024"
        },
        {
            title: "Launched Personal Portfolio",
            description: "Built and deployed my own personal website with Express and EJS."
        },
        {
            title: "Internship at DevTech",
            description: "Worked as a backend intern using Node.js and PostgreSQL.",
            date: "June 2023 - August 2023"
        },
    ]

    res.render("achievements.ejs", { achievements });
});

app.get("/dashboard", (req, res) => {
    const name = req.query.username
    console.log(name)
    console.log(req.body)
    res.render("dashboard.ejs", { name: name })
})
app.get("/login", (req, res) => {
    res.render("login.ejs")
})
app.get("/signup", (req, res) => {
    res.render("signup.ejs")
})

app.post("/login", async (req, res) => {
    console.log(req.body)
    const qres = await db.query("SELECT * FROM users")
    const users = qres.rows
    for (let user of users) {
        console.log(user)
        if ((user.email === req.body.email) && (user.password === req.body.password)) {
            console.log("User exists.")
            let username = user.name
            return res.redirect(`/dashboard?username=${username}`)
        }
    }
    console.log('User does not exist.')
    return res.redirect("/login")

})
app.post("/signup", async (req, res) => {
    console.log(req.body)
    const qres = await db.query("SELECT * FROM users")
    const users = qres.rows
    for (let user of users) {
        console.log(user)
        if ((user.email === req.body.email) && (user.password === req.body.password)) {
            console.log("User exists.")
            return res.redirect("/login")
        }
    }
    const qres2 = await db.query(
        "INSERT INTO users (email,password) VALUES ($1,$2)",
        [req.body.email, req.body.password]
    );
    res.redirect("/dashboard")
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
console.log("Hello Backend")