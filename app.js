const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();

// view engine
app.set("view engine", "ejs");

// body-parser to parse request body
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// static files
app.use(express.static(path.join(__dirname, "./public/assets")));

// enabling session
app.use(
  session({
    secret: "some_secret_key",
    cookie: { express: new Date(Date.now() + 900) },
  })
);

// routes
const index = require("./routes/main");
const auth = require("./routes/auth");
const adm = require("./routes/admin");

app.use("/", index);
app.use("/auth", auth);
app.use("/admin", adm);

//pengganti app.listen sebelumnya
app.listen(process.env.PORT||3000)
console.log("Server runs at port 3000...");
