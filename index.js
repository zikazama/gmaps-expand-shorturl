const https = require("https");
const url = require("url");

function unshortenUrl(url) {
  return new Promise((resolve, reject) => {
    try {
      const parsedUrl = new URL(url);
      const hostname = parsedUrl.hostname;

      const options = {
        hostname,
        method: "HEAD",
        path: parsedUrl.pathname + parsedUrl.search,
      };

      const req = https.request(options, (res) => {
        if (
          res.statusCode >= 300 &&
          res.statusCode < 400 &&
          res.headers.location
        ) {
          const newUrl = res.headers.location;
          unshortenUrl(newUrl).then(resolve).catch(reject); // Recursively unshorten
        } else {
          resolve(url);
        }
      });

      req.on("error", (error) => {
        console.error("Error unshortening URL:", url, error.message);
        reject(url); // Return original URL on error
      });

      req.end();
    } catch (error) {
      console.error("Error unshortening URL:", url, error.message);
      reject(url); // Return original URL on error
    }
  });
}

function urlToPoint(url) {
  const regex = /@(-?[0-9]+\.[0-9]+),(-?[0-9]+\.[0-9]+)/;
  const match = url.match(regex);

  if (match) {
    const latitude = parseFloat(match[1]);
    const longitude = parseFloat(match[2]);
    return { latitude, longitude };
  } else {
    console.error("Failed to extract coordinates from URL:", url);
    return null;
  }
}

async function convertMapUrlToPoint(url) {
  return unshortenUrl(url)
    .then((unshortenedUrl) => {
      console.log("Unshortened URL:", unshortenedUrl);
      console.log(urlToPoint(unshortenedUrl));
      return urlToPoint(unshortenedUrl);
    })
    .catch((error) => {
      console.error("Error unshortening URL:", error);
    });
}

module.exports = { convertMapUrlToPoint };
