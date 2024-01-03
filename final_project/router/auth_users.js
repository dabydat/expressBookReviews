const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => { //returns boolean
    //write code to check is the username is valid
    let userswithsamename = users.filter((user)=>{
        return user.username === username
      });
      if(userswithsamename.length > 0){
        return true;
      } else {
        return false;
      }
}

const authenticatedUser = (username, password) => { //returns boolean
    //write code to check if username and password match the one we have in records.
    let validusers = users.filter((user)=>{
        return (user.username === username && user.password === password)
      });
      if(validusers.length > 0){
        return true;
      } else {
        return false;
      }
}

//only registered users can login
regd_users.post("/login", (req, res) => {
    const user = req.body.username;
    if (!user) {
        return res.status(404).json({ message: "Body Empty" });
    }
    let accessToken = jwt.sign({
        data: user
    }, 'access', { expiresIn: 60 * 60 });

    req.session.authorization = {
        accessToken
    }
    req.session.username = user;
    return res.status(200).send("User successfully logged in");
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    //Write your code here
    //return res.status(300).json({message: "Yet to be implemented"});
    console.log(req.session, req.params, req.body);
    const username = req.session.username;
    const newreview = req.body.review;
    let newReview = { user: username, review: newreview }
    booksReviewByISBN = [];
    Object.entries(books).map(([key, value]) => {
        if (value["isbn"] && value["isbn"] == req.params.isbn) {
            console.log(value);
            booksReviewByISBN.push({ reviews: newReview })
        }
    })
    return res.status(200).json({
        type: "success",
        data: booksReviewByISBN,
        message: "Getting the new review"
    });
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
    let reviews;
    Object.entries(books).map(([key, value]) => {
        if (value["isbn"] && value["isbn"] == req.params.isbn) {
            reviews = [value.reviews]
            reviews.filter(reviews => reviews.user == req.session.username);
        }
    })
    return res.status(200).json({
        type: "success",
        data: {reviews: reviews},
        message: "deleting the review by user session",
        username: req.session.username
    });
    
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
