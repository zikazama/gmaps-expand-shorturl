const https = require("https");
const puppeteer = require("puppeteer");

let limitRequestInit = 0;
let limitRequest = 3;

function isGoogleMapsUrl(url) {
  const regexes = [
    /^(http|https):\/\/(www\.)?maps\.google\.com\/(\?q=|maps\?)(.*)$/, // Standard Maps URLs
    /^(http|https):\/\/(www\.)?google\.com\/maps\/place\/(.*)$/, // Place URLs
    /^(http|https):\/\/(www\.)?maps\.googleapis\.com\/maps\/api\/staticmap\?(.*)$/, // Static Map URLs
    /^https:\/\/maps\.app\.goo\.gl\/\w+$/,
    /^(http|https):\/\/(www\.)?google\.com\/maps\/(preview\/)?\?q=[\d\.\-]+,[\d\.\-]+(@[\d\.\-]+,[\d\.\-]+)?(,[\d]+z)?$/,
    /^(http|https):\/\/(www\.)?google\.com\/maps\/preview\/@[\d\.\-]+,[\d\.\-]+,[\d]+z$/,
  ];

  for (const regex of regexes) {
    if (regex.test(url)) {
      return true;
    }
  }

  return false;
}

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

      limitRequestInit++;
      if (limitRequestInit === limitRequest) {
        resolve(null);
      }
      resolve(url);

      // const req = https.request(options, (res) => {
      //   // if (
      //   //   res.statusCode >= 300 &&
      //   //   res.statusCode < 400 &&
      //   //   res.headers.location
      //   // ) {
      //   //   const newUrl = res.headers.location;
      //   //   unshortenUrl(newUrl).then(resolve).catch(reject); // Recursively unshorten
      //   // } else {
      //   //   resolve(url);
      //   // }
      //   req.end();
      //   resolve(url);
      // });

      // req.on("error", (error) => {
      //   console.error("Error unshortening URL:", url, error.message);
      //   reject(url); // Return original URL on error
      // });

      // req.end();
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
  const check = isGoogleMapsUrl(url);
  if (check === false) {
    return { latitude: null, longitude: null };
  }
  return unshortenUrl(url)
    .then((unshortenedUrl) => {
      console.log("Unshortened URL:", unshortenedUrl);
      let coor = urlToPoint(unshortenedUrl);
      if (coor === null) {
        coor = getCoordsWithPuppeteer(unshortenedUrl);
      }
      return coor;
    })
    .catch((error) => {
      console.error("Error unshortening URL:", error);
    });
}

async function getCoordsWithPuppeteer(url) {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  try {
    await page.goto(url);

    // Wait for 3 seconds for the full URL to appear
    await new Promise((res) => setTimeout(res, 3000));

    const fullUrl = page.url(); // Get the updated URL

    if (url !== fullUrl) {
      return urlToPoint(fullUrl);
    }

    const coords = await convertMapUrlToPoint(fullUrl); // Use your existing parsing function

    return coords;
  } catch (error) {
    console.error("Error using Puppeteer:", error);
    return null;
  } finally {
    await browser.close(); // Close the browser
  }
}

module.exports = { convertMapUrlToPoint };
