


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

const session = require('express-session');

app.use(session({
    secret: 'yourSecretKey', // use something stronger in production
    resave: false,
    saveUninitialized: false
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(staticFiles));
app.set('view engine', 'ejs');
app.set('views', 'C:\\Users\\DELL\\Desktop\\Webdash\\views');


db.connect();

app.get("/", (req, res) => {
    res.sendFile(staticFiles + "\\home.html")
})

app.get('/profile/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const qres = await db.query("SELECT * FROM users WHERE user_id = $1", [id])
    const user = qres.rows[0]
    const qres2 = await db.query("SELECT * FROM achievements WHERE user_id =$1;", [id]);
    const userAchievements = qres2.rows
    console.log(user)
    res.render('viewProfile.ejs', {
        user,
        achievements: userAchievements
    });
});


app.get("/feed", (req, res) => {
    res.render("community.ejs")
})
app.get('/directory', async (req, res) => {
    const qres = await db.query("SELECT * FROM users")
    const users = qres.rows
    console.log(users)
    res.render("alumniCards.ejs", { users: users })
})

app.get("/achievements", async (req, res) => {
    const qres = await db.query("SELECT * FROM achievements WHERE user_id =$1;", [req.session.user.user_id]);
    const achievements = qres.rows
    console.log(achievements)
    res.render("achievements.ejs", { achievements });
});

app.get("/dashboard", (req, res) => {
    const name = req.session.user.name;
    res.render("dashboard.ejs", { name: name })
})

app.get('/logout', (req, res) => {
    console.log("Logging Out.")
    req.session.destroy(err => {
        if (err) console.log(err);
        res.redirect('/');
    });
});
app.get("/login", (req, res) => {
    res.render("login.ejs")
})
app.get("/signup", (req, res) => {
    res.render("signup.ejs")
})

app.post("/login", async (req, res) => {

    const qres = await db.query("SELECT * FROM users")
    const users = qres.rows
    for (let user of users) {

        if ((user.email === req.body.email) && (user.password === req.body.password)) {
            console.log("User exists.")
            req.session.user = {
                name: user.name,
                user_id: user.user_id
            };
            console.log(req.session)
            return res.redirect(`/dashboard?username=${user.name}`)
        }
    }
    console.log('User does not exist.')
    return res.redirect("/login")

})


app.post("/signup", async (req, res) => {

    const qres = await db.query("SELECT * FROM users")
    const users = qres.rows
    for (let user of users) {

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
