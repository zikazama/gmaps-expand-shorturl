# gmaps-expand-shorturl


# URL Unshortener in Node.js

A simple Node.js function to unshorten shortened URLs, revealing their final destinations.

# Installation

1. Clone the repository:

Bash
git clone https://github.com/zikazama/gmaps-expand-shorturl


2. Install dependencies:

Bash
npm i gmaps-expand-shorturl

# Usage
1. Import the function:

JavaScript
const convertMapUrlToPoint = require('./convertMapUrlToPoint');

2. Call the function with a shortened URL:

JavaScript
const pointLatLong = await convertMapUrlToPoint('https://maps.app.goo.gl/hvoaKDU5ZiBfsuWk7');

# Features
Secure HTTP requests: Uses the https module for secure communication.
Error handling: Gracefully handles potential errors during URL parsing and network requests.
Recursive unshortening: Supports multiple redirects to uncover the final URL.
Promise-based: Returns a promise for convenient asynchronous handling.
Clear comments: Includes explanatory comments for better understanding.