const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

const books = [];

// Set EJS as view engine
app.set("view engine", "ejs");

// Middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.get("/", (req, res) => {
  res.render("index", { books: books });
});

app.post("/submit", (req, res) => {
  const book = req.body.book;
  if (book) {
    books.push(book);
    console.log(`Book submitted: ${book}`);
  }
  res.redirect("/");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
