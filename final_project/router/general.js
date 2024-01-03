const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const doesExist = (username) => {
    let userswithsamename = users.filter((user) => {
        return user.username === username
    });
    if (userswithsamename.length > 0) {
        return true;
    } else {
        return false;
    }
}

public_users.post("/register", (req, res) => {
    //Write your code here
    //return res.status(300).json({ message: "Yet to be implemented" });
    const username = req.body.username;
    const password = req.body.password;
    console.log(req.body);

    if (username && password) {
        if (!doesExist(username)) {
            users.push({ "username": username, "password": password });
            return res.status(200).json({ message: "User successfully registred. Now you can login" });
        } else {
            return res.status(404).json({ message: "User already exists!" });
        }
    }
    return res.status(404).json({ message: "Unable to register user." });
});

// Get the book list available in the shop
public_users.get('/1', function (req, res) {
    //Write your code here
    return res.status(200).json({
        type: "success",
        data: books,
        message: "List of all books"
    });
});

// Get the book list available in the shop CALLBACKS PROMISES
public_users.get('/', function (req, res) {
    //Write your code here
    let getBooksPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Promise getBooksPromise resolved")
        }, 1000)
    })
    getBooksPromise.then((successMessage) => {
        return res.status(200).json({
            type: "success",
            data: books,
            message: "List of all books from callback"
        });
    })
});



// Get book details based on ISBN
public_users.get('/1isbn/:isbn', function (req, res) {
    booksWithISBN = [];
    //Write your code here
    //return res.status(300).json({message: "Yet to be implemented"});
    Object.entries(books).map(([key, value]) => {
        if (value["isbn"] && value["isbn"] == req.params.isbn) {
            booksWithISBN.push(value)
        }
    })
    return res.status(200).json({
        type: "success",
        data: booksWithISBN,
        message: "Getting book details by ISBN"
    });
});

// Get book details based on ISBN CALLBACK PROMISES
public_users.get('/isbn/:isbn', function (req, res) {
    booksWithISBN = [];
    //Write your code here
    //return res.status(300).json({message: "Yet to be implemented"});
    Object.entries(books).map(([key, value]) => {
        if (value["isbn"] && value["isbn"] == req.params.isbn) {
            booksWithISBN.push(value)
        }
    })
    
    let getBooksBasedOnISBNPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Promise getBooksBasedOnISBNPromise resolved")
        }, 1000)
    })
    getBooksBasedOnISBNPromise.then((successMessage) => {
        return res.status(200).json({
            type: "success",
            data: booksWithISBN,
            message: "Getting book details by ISBN FROM CALLBACKS"
        });
    })
});

// Get book details based on author
public_users.get('/1author/:author', function (req, res) {
    booksBasedOnAuthor = [];
    //Write your code here
    //return res.status(300).json({ message: "Yet to be implemented" });
    Object.entries(books).map(([key, value]) => {
        if (value["author"] && value["author"] == req.params.author) {
            booksBasedOnAuthor.push(value)
        }
    })
    return res.status(200).json({
        type: "success",
        data: booksBasedOnAuthor,
        message: "Getting books based on author"
    });
});
// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    booksBasedOnAuthor = [];
    //Write your code here
    //return res.status(300).json({ message: "Yet to be implemented" });
    Object.entries(books).map(([key, value]) => {
        if (value["author"] && value["author"] == req.params.author) {
            booksBasedOnAuthor.push(value)
        }
    })
    

    let getBooksBasedOnAuthorPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Promise getBooksBasedOnAuthorPromise resolved")
        }, 1000)
    })
    getBooksBasedOnAuthorPromise.then((successMessage) => {
        return res.status(200).json({
            type: "success",
            data: booksBasedOnAuthor,
            message: "Getting books based on author FROM CALLBACKS"
        });
    })
});

// Get all books based on title
public_users.get('1/title/:title', function (req, res) {
    booksByTitle = [];
    //Write your code here
    //return res.status(300).json({message: "Yet to be implemented"});
    Object.entries(books).map(([key, value]) => {
        if (value["title"] && value["title"] == req.params.title) {
            booksByTitle.push(value)
        }
    })
    return res.status(200).json({
        type: "success",
        data: booksByTitle,
        message: "Getting book by title"
    });
});
// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    booksByTitle = [];
    //Write your code here
    //return res.status(300).json({message: "Yet to be implemented"});
    Object.entries(books).map(([key, value]) => {
        if (value["title"] && value["title"] == req.params.title) {
            booksByTitle.push(value)
        }
    })
    
    let getBooksBasedOnTitlePromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Promise getBooksBasedOnTitlePromise resolved")
        }, 1000)
    })
    getBooksBasedOnTitlePromise.then((successMessage) => {
        return res.status(200).json({
            type: "success",
            data: booksByTitle,
            message: "Getting book by title FROM CALLBACKS"
        });
    })
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    //Write your code here
    //return res.status(300).json({ message: "Yet to be implemented" });
    booksReviewByISBN = [];
    //Write your code here
    //return res.status(300).json({message: "Yet to be implemented"});
    Object.entries(books).map(([key, value]) => {
        if (value["isbn"] && value["isbn"] == req.params.isbn) {
            booksReviewByISBN.push({ reviews: value.reviews })
        }
    })
    return res.status(200).json({
        type: "success",
        data: booksReviewByISBN,
        message: "Getting reviews of the book byt ISBN"
    });
});

module.exports.general = public_users;
