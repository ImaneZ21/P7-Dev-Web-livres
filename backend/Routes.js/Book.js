const express = require('express');
const router = express.Router();


const BookControllers = require("../Controllers/Book.js");
const User = require("../Models/User");

router.post("/books", BookControllers.createBook);

router.get("/books", BookControllers.getBooks);

router.get("/books/bestrating", BookControllers.getBestRatings);

router.get("/books/:id", BookControllers.getOneBook);

router.put("/books/:id", BookControllers.modifyBook);

router.delete('/books/:id', BookControllers.deleteBook);

// router.post("/books/:id/rating", (req, res) => {
//   delete req.body._id;
//   const book = new Book({
//     ...req.body,
//   });
//   book
//     .save()
//     .then(() => res.status(201).json(book))
//     .catch((error) => res.status(400).json({ error }));
// });



router.post("/auth/login", (req, res) => {
  const user = new User({
    ...req.body,
  });
  user
    .save()
    .then(() => res.status(200).json({ message: "User authentifié !" }))
    .catch((error) => res.status(400).json({ error }));
});

router.post("/auth/signup", (req, res) => {
  console.log(req.body);
  res.status(201).json({
    message: "user créé",
  });
});

module.exports = router;