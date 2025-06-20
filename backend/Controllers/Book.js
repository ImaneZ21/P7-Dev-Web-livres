const Book = require('../Models/Book');

exports.createBook =  (req, res) => {
  delete req.body._id;
  const book = new Book({
    ...req.body,
  });
  book
    .save()
    .then(() => res.status(201).json({ message: "Book créé !" }))
    .catch((error) => res.status(400).json({ error }));
}

exports.getBooks =  (req, res) => {
  Book.find()
    .then((books) => res.status(200).json(books))
    .catch((error) => res.status(400).json({ error }));
}

exports.getBestRatings =  (req, res) => {
  Book.find()
    .sort({ averageRating: -1})
    .limit(3)
    .then((book) => res.status(200).json(book))
    .catch((error) => res.status(400).json({ error }));
}

exports.modifyBook = (req, res) => {
  Book.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Book modifié !" }))
    .catch((error) => res.status(400).json({ error }));
}

exports.deleteBook = (req, res) => {
  Book.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Book supprimé !'}))
    .catch(error => res.status(400).json({ error }));
}

exports.getOneBook =  (req, res) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => res.status(200).json(book))
    .catch((error) => res.status(400).json({ error }));
}

