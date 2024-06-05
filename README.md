# Bookshelf App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Overview
A simple app that allows users to search for books using the Open Library API and add any book to their personal bookshelf in the browser using localStorage.

## Getting Started
To run this project for the first time, run  `npm install` to install all dependencies.

Afterwards, run the development server with `npm start`. Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will reload when you make changes. You may also see any lint errors in the console.

The app has two pages:
- A homepage at [http://localhost:3000/](http://localhost:3000) where you can search for books.

- A bookshelf page at [http://localhost:3000/user-bookshelf](http://localhost:3000) where you can view books you have added to your personal shelf.

## Implementation
There is a navigation bar at the top of every page which has the title, "Books" linking to the homepage and a button, "My Bookshelf" that navigates to the user's personal bookshelf.

### HomePage
On the homepage, you will see a search bar and as you type in it, will run a get request to the Open Library API on your search query, fetch the results and display it on your screen. The results are limited to 10 and on each book that is returned you will see some information about it like the title, author(s), etc. There is an "Add to Bookshelf" button displayed on every book and clicking on this button will add the book to your shelf. If the book does not already exist in your shelf, you will get a notification saying the book has been added. If the book is already in your shelf you will be notified that the book already exists. It checks if the book exists using the book "key" which is a property that exists on every book.

### User Bookshelf Page
On this page, every book that you have in your shelf is listed here. The books are stored in the browser's localstorage and are then loaded in into the state. This state exists as a context that is wrapped around the entire app and so can be accessed on any page. In the `providers/bookmarks-store.js` file, you will find the bookmarks being loaded from localstorage if there already exists a bookmark key or it creates the key in localstorage if it is not there. You will also find the "addBookmark" and "deleteBookmark" functions which, again, since they are provided in the context can be accessed any where in the app.

😊 Thank you!