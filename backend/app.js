const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://imane:9HhFgPmEs2Nvgtte@cluster0.rdcqu9q.mongodb.net/vieuxgrimoire?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

const Book = require("./Models/Book");
const User = require("./Models/User");

app.get("/api/books", (req, res, next) => {
  delete req.body._id;
  const book = new Book({
    ...req.body,
  });
  book
    .save()
    .then(() => res.status(201).json({ message: "Book enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
});

app.post("/api/auth/login", (req, res) => {
  const user = new User({
    ...req.body,
  });
  user
    .save()
    .then(() => res.status(200).json({ message: "User authentifié !" }))
    .catch((error) => res.status(400).json({ error }));

});

app.post("/api/auth/signup", (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    message: "user créé",
  });
});

module.exports = app;

// export const API_ROUTES = {
//   SIGN_UP: `${API_URL}/api/auth/signup`,
//   SIGN_IN: `${API_URL}/api/auth/login`,
//   BOOKS: `${API_URL}/api/books`,
//   BEST_RATED: `${API_URL}/api/books/bestrating`,
// };

// export const APP_ROUTES = {
//   SIGN_UP: '/Inscription',
//   SIGN_IN: '/Connexion',
//   ADD_BOOK: '/Ajouter',
//   BOOK: '/livre/:id',
//   UPDATE_BOOK: 'livre/modifier/:id',
// };
