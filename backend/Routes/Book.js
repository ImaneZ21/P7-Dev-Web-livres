const express = require("express");
const auth = require('../middleware/auth');
const router = express.Router();
const multer = require('../middleware/multer-config.js');

const BookControllers = require("../Controllers/Book.js");

router.post("", auth, multer, BookControllers.createBook);

router.get("", BookControllers.getBooks);

router.get("/bestrating", BookControllers.getBestRatings);

router.get("/:id", BookControllers.getOneBook);

router.put("/:id", auth, multer, BookControllers.modifyBook);

router.delete("/:id", auth, BookControllers.deleteBook);

// router.post("/:id/rating", (req, res) => {
//   delete req.body._id;
//   const book = new Book({
//     ...req.body,
//   });
//   book
//     .save()
//     .then(() => res.status(201).json(book))
//     .catch((error) => res.status(400).json({ error }));
// });

module.exports = router;
