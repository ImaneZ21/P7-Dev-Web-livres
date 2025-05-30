const express = require("express");
const app = express();
const mongoose = require("mongoose");

const bookRoutes = require("./Routes.js/Book.js")

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

app.use('/api', bookRoutes);


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
