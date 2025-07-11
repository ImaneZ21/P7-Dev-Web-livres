const { json } = require("express");
const Book = require("../Models/Book");
const fs = require("fs");

//Create a book
exports.createBook = (req, res) => {
  const bookObject = JSON.parse(req.body.book);
  delete bookObject._id;
  delete bookObject._userId;

  if(!req.file){
    return res.status(400).json({ message: "Champs fichier obligatoire" });
  }
  const book = new Book({
    ...bookObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  book
    .save()
    .then(() => {
      res.status(201).json({ message: "Book enregistré !" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

//Get all the books
exports.getBooks = (req, res) => {
  Book.find()
    .then((books) => res.status(200).json(books))
    .catch((error) => res.status(400).json({ error }));
};

//Get the best ratings
exports.getBestRatings = (req, res) => {
  Book.find()
    .sort({ averageRating: -1 })
    .limit(3)
    .then((book) => res.status(200).json(book))
    .catch((error) => res.status(400).json({ error }));
};

//Modify One Book
exports.modifyBook = (req, res) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (book.userId != req.auth.userId) {
        res.status(401).json({ message: "Not authorized" });
      } else {
        const bookObject = req.file
          ? {
              ...JSON.parse(req.body.book),
              imageUrl: `${req.protocol}://${req.get("host")}/images/${
                req.file.filename
              }`,
            }
          : { ...req.body };

        delete bookObject._userId;
        Book.updateOne(
          { _id: req.params.id },
          { ...bookObject, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: "Book modifié!" }))
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

//Delete One Book
exports.deleteBook = (req, res) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (book.userId != req.auth.userId) {
        res.status(401).json({ message: "Not authorized" });
      } else {
        const filename = book.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Book.deleteOne({ _id: req.params.id })
            .then(() => {
              res.status(201).json({ message: "Book supprimé !" });
            })
            .catch((error) => res.status(401).json({ error }));
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

//Get One Book
exports.getOneBook = (req, res) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => res.status(200).json(book))
    .catch((error) => res.status(400).json({ error }));
};

//Rate One Book
exports.rateOneBook = (req, res) => {
  const userId = req.auth.userId;
  const grade = Number(req.body.rating); //database --> grade / front --> rating

  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (book.ratings.find((rating) => rating.userId === userId)) {
        return res.status(401).json({ message: "book déjà noté" });
      }

      if (grade < 1 || grade > 5) {
        return res
          .status(401)
          .json({ message: "La note doit être comprise entre 0 et 5" });
      }

      book.ratings.push({ userId, grade });

      const total = book.ratings.reduce((sum, rating) => sum + rating.grade, 0);
      const averageSum = total / book.ratings.length;
      book.averageRating = averageSum;

      book
        .save()
        .then((book) => {
          const bookRes = {
            ...book._doc,
            id: book._id
          };
          res.status(200).json(bookRes); 
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
};
