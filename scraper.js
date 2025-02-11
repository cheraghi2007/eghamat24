const { chromium } = require("playwright");

(async () => {
  // مسیر کروم نصب‌شده روی ویندوز را مشخص کن
  const browser = await chromium.launch({
    executablePath: "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe", 
    headless: true, // برای اجرای بدون UI
  });

  const page = await browser.newPage();
  await page.goto("https://www.eghamat24.com/search/Tehran/03-11-24/1", {
    waitUntil: "networkidle",
  });

  const hotelNames = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".subtitle-2")).map(
      (el) => el.innerText.trim()
    );
  });

  console.log(hotelNames);
  await browser.close();
})();
