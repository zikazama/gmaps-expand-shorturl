# gmaps-expand-shorturl

# Author : Fauzi Fadhlurrohman

# URL Unshortener in Node.js

A simple library to get google maps coordinates latitude longitude from url.

# Installation

1. Clone the repository:

Bash

```git clone https://github.com/zikazama/gmaps-expand-shorturl```


2. Install dependencies:

Bash

```npm i gmaps-expand-shorturl```

# Usage
1. Import the function:

JavaScript

```const { convertMapUrlToPoint } = require('gmaps-expand-shorturl');```

2. Call the function with a shortened URL:

JavaScript
```
const pointLatLong = await convertMapUrlToPoint('https://maps.app.goo.gl/hvoaKDU5ZiBfsuWk7');
const pointLatLong2 = await convertMapUrlToPoint('https://www.google.com/maps/place//@-6.209964,106.73527,15z/data=!3m1!4b1?entry=ttu');
```

# Features
- Secure HTTP requests: Uses the https module for secure communication.
- Error handling: Gracefully handles potential errors during URL parsing and network requests.
- Recursive unshortening: Supports multiple redirects to uncover the final URL.
- Promise-based: Returns a promise for convenient asynchronous handling.
- Clear comments: Includes explanatory comments for better understanding.

# Problem 
If production have problem you can try
1. Update system
```sudo apt-get update ```

2. Install some package
```
sudo apt install -y gconf-service libgbm-dev libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
```
