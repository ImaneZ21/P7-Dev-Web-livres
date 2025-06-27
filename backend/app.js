const express = require("express");
const app = express();
const mongoose = require("mongoose");

const bookRoutes = require("./Routes/Book.js")
const authRoutes = require("./Routes/Auth.js")
const path = require('path');

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

app.use('/api/books', bookRoutes);
app.use('/api/auth', authRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;