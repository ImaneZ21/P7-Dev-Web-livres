const express = require("express");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.get("/api/books", (req, res, next) => {
    console.log('Route /api/books appelée');
  const book = [
    {
      id: "1",
      userId: "clc4wj5lh3gyi0ak4eq4n8syr",
      title: "Milwaukee Mission",
      author: "Elder Cooper",
      imageUrl: "https://via.placeholder.com/206x260",
      year: 2021,
      genre: "Policier",
      ratings: [
        {
          userId: "1",
          grade: 5,
        },
        {
          userId: "1",
          grade: 5,
        },
        {
          userId: "clc4wj5lh3gyi0ak4eq4n8syr",
          grade: 5,
        },
        {
          userId: "1",
          grade: 5,
        },
      ],
      averageRating: 3,
    },
    {
      id: "2",
      userId: "clbxs3tag6jkr0biul4trzbrv",
      title: "Book for Esther",
      author: "Alabaster",
      imageUrl: "https://via.placeholder.com/206x260",
      year: 2022,
      genre: "Paysage",
      ratings: [
        {
          userId: "clbxs3tag6jkr0biul4trzbrv",
          grade: 4,
        },
        {
          userId: "1",
          grade: 5,
        },
        {
          userId: "1",
          grade: 5,
        },
        {
          userId: "1",
          grade: 5,
        },
      ],
      averageRating: 4.2,
    },
    {
      id: "3",
      userId: "1",
      title: "The Kinfolk Table",
      author: "Nathan Williams",
      imageUrl: "https://via.placeholder.com/206x260",
      year: 2022,
      genre: "Cuisine",
      ratings: [
        {
          userId: "1",
          grade: 5,
        },
        {
          userId: "1",
          grade: 5,
        },
        {
          userId: "1",
          grade: 5,
        },
        {
          userId: "1",
          grade: 5,
        },
      ],
      averageRating: 3,
    },
    {
      id: "4",
      userId: "1",
      title: "Milwaukee Mission",
      author: "Elder Cooper",
      imageUrl: "https://via.placeholder.com/206x260",
      year: 2021,
      genre: "Policier",
      ratings: [
        {
          userId: "1",
          grade: 5,
        },
        {
          userId: "1",
          grade: 5,
        },
        {
          userId: "1",
          grade: 5,
        },
        {
          userId: "1",
          grade: 5,
        },
      ],
      averageRating: 3,
    },
    {
      id: "5",
      userId: "1",
      title: "Book for Esther",
      author: "Alabaster",
      imageUrl: "https://via.placeholder.com/206x260",
      year: 2022,
      genre: "Paysage",
      ratings: [
        {
          userId: "1",
          grade: 5,
        },
        {
          userId: "1",
          grade: 5,
        },
        {
          userId: "1",
          grade: 5,
        },
        {
          userId: "1",
          grade: 5,
        },
      ],
      averageRating: 4,
    },
    {
      id: "6",
      userId: "1",
      title: "The Kinfolk Table",
      author: "Nathan Williams",
      imageUrl: "https://via.placeholder.com/206x260",
      year: 2022,
      genre: "Cuisine",
      ratings: [
        {
          userId: "1",
          grade: 5,
        },
        {
          userId: "1",
          grade: 5,
        },
        {
          userId: "1",
          grade: 5,
        },
        {
          userId: "1",
          grade: 5,
        },
      ],
      averageRating: 3,
    },
    {
      id: "7",
      userId: "1",
      title: "Milwaukee Mission",
      author: "Elder Cooper",
      imageUrl: "https://via.placeholder.com/206x260",
      year: 2021,
      genre: "Policier",
      ratings: [
        {
          userId: "1",
          grade: 5,
        },
        {
          userId: "1",
          grade: 5,
        },
        {
          userId: "1",
          grade: 5,
        },
        {
          userId: "1",
          grade: 5,
        },
      ],
      averageRating: 3,
    },
    {
      id: "8",
      userId: "clc7s9xnh7zpt0ak4fisdwuj1",
      title: "Book for Esther",
      author: "Alabaster",
      imageUrl: "https://via.placeholder.com/206x260",
      year: 2022,
      genre: "Paysage",
      ratings: [
        {
          userId: "1",
          grade: 5,
        },
        {
          userId: "1",
          grade: 5,
        },
        {
          userId: "1",
          grade: 5,
        },
        {
          userId: "1",
          grade: 5,
        },
      ],
      averageRating: 4,
    },
    {
      id: "9",
      userId: "clc4wj5lh3gyi0ak4eq4n8syr",
      title: "The Kinfolk Table",
      author: "Nathan Williams",
      imageUrl: "https://via.placeholder.com/206x260",
      year: 2022,
      genre: "Cuisine",
      ratings: [
        {
          userId: "1",
          grade: 5,
        },
        {
          userId: "1",
          grade: 5,
        },
        {
          userId: "1",
          grade: 5,
        },
        {
          userId: "clc4wj5lh3gyi0ak4eq4n8syr",
          grade: 1,
        },
      ],
      averageRating: 3,
    },
  ];

  res.status(200).json(book)
});

app.post('/api/auth/login', (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    message: 'objet créé'
  })
})

app.post('/api/auth/signup', (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    message: 'user créé'
  })
})

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

