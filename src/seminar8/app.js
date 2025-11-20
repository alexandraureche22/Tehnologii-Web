const express = require("express");
const Book = require("./book");
const app = express();
const port = 3000;

const bookRouter = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", bookRouter);

let books = [
  new Book(1, "Dune", "sf", "Frank Herbert"),
  new Book(2, "Robinson Crusoe", "adventure", "Daniel Defoe"),
  new Book(3, "Foundation", "sf", "Asimov"),
];

// EXISTING GET /books  (with optional ?genre)
bookRouter.route("/books").get((req, res) => {
  let filteredBooks = [];
  if (req.query.genre) {
    filteredBooks = books.filter((x) => x.genre === req.query.genre);
  } else {
    filteredBooks = books;
  }
  res.json(filteredBooks);
});

// NEW GET /books/sorted — return books sorted alphabetically
bookRouter.get("/books/sorted", (req, res) => {
  const sortedBooks = [...books].sort((a, b) => a.name.localeCompare(b.name));
  res.json(sortedBooks);
});

app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

app.listen(port, () => {
  console.log("Running on the port " + port);
});
