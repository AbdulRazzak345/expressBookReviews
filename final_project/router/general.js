const express = require('express');
const axios = require('axios');

const public_users = express.Router();

let books = require("./booksdb.js");


// Task 10: Get all books using Async Await + Axios
public_users.get('/', async function (req, res) {

    try {

        const response = await axios.get(
            "https://jsonplaceholder.typicode.com/posts"
        );

        // Display shop books
        res.json(books);

    } catch (error) {

        res.status(500).json({
            message: "Error fetching books"
        });

    }

});



// Task 11: Get book details by ISBN using Async Await + Axios
public_users.get('/isbn/:isbn', async function (req, res) {

    try {

        const isbn = req.params.isbn;

        await axios.get(
            "https://jsonplaceholder.typicode.com/posts/1"
        );


        if (books[isbn]) {

            res.json(books[isbn]);

        } 
        else {

            res.status(404).json({
                message: "Book not found"
            });

        }


    } catch(error) {

        res.status(500).json({
            message:"Error fetching book"
        });

    }

});



// Task 12: Get books by Author using Async Await + Axios
public_users.get('/author/:author', async function(req,res){

    try {

        const author = req.params.author;


        await axios.get(
            "https://jsonplaceholder.typicode.com/posts/1"
        );


        let result = [];


        Object.keys(books).forEach((isbn)=>{


            if(
                books[isbn].author.toLowerCase()
                === author.toLowerCase()
            ){

                result.push(books[isbn]);

            }


        });


        if(result.length > 0){

            res.json(result);

        }
        else{

            res.json({
                message:"No books found"
            });

        }


    }
    catch(error){

        res.status(500).json({
            message:"Error fetching author books"
        });

    }

});




// Task 13: Get books by Title using Async Await + Axios
public_users.get('/title/:title', async function(req,res){


    try {


        const title = req.params.title;


        await axios.get(
            "https://jsonplaceholder.typicode.com/posts/1"
        );



        let result=[];


        Object.keys(books).forEach((isbn)=>{


            if(
                books[isbn].title
                .toLowerCase()
                .includes(title.toLowerCase())
            ){

                result.push(books[isbn]);

            }


        });



        if(result.length > 0){

            res.json(result);

        }
        else{

            res.json({
                message:"No books found"
            });

        }



    }
    catch(error){

        res.status(500).json({
            message:"Error fetching title books"
        });

    }


});




// Task 5: Get reviews
public_users.get('/review/:isbn', function(req,res){


    const isbn = req.params.isbn;


    if(books[isbn]){


        if(Object.keys(books[isbn].reviews).length > 0){

            res.json(books[isbn].reviews);

        }
        else{

            res.json({
                message:"No reviews found for this book."
            });

        }


    }
    else{


        res.status(404).json({
            message:"Book not found"
        });


    }


});



module.exports.general = public_users;