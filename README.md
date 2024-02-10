# gmaps-expand-shorturl

# Unshorten URL

This script allows you to unshorten a shortened URL using Node.js. It follows redirects to reveal the ultimate destination URL.

# Prerequisites

Node.js installed on your system. You can download and install it from here.
Installation

Clone this repository to your local machine or download the files directly.
git clone <repository-url>

Navigate to the project directory.
cd unshorten-url

Install the required dependencies.
npm install

# Usage

Import the script into your Node.js project.
const unshortenUrl = require('./unshortenUrl');

Call the unshortenUrl function with the shortened URL as an argument.
unshortenUrl('http://example.com/shortened');

Replace 'http://example.com/shortened' with the URL you want to unshorten.

Run your Node.js script.
node your_script.js

# Example

const unshortenUrl = require('./unshortenUrl');

unshortenUrl('http://example.com/shortened');

This will output the ultimate destination URL.