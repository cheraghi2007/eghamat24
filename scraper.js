const { chromium } = require("playwright");

export default async function handler(req, res) {
  const browser = await chromium.launch({ headless: true });

  const page = await browser.newPage();
  await page.goto("https://www.eghamat24.com/search/Tehran/03-11-24/1", {
    waitUntil: "networkidle",
  });

  const hotelNames = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".subtitle-2")).map(
      (el) => el.innerText.trim()
    );
  });

  await browser.close();

  res.status(200).json({ hotels: hotelNames });
}
