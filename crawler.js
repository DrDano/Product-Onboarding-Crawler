const puppeteer = require("puppeteer");
const dotenv = require("dotenv");
const { Navigator } = require("./navigator");
const { reader } = require("./reader");

dotenv.config();
// Settings
// ======================================
const maxDelay = 400;
let itemCount = 1;
// ======================================
const delayVal = () => Math.floor(Math.random() * maxDelay);
const data = reader.csvFile();
data[0] ? itemCount = data[0].join("").split("=")[1] : itemCount;

console.log(reader.csvFile());
console.log(data[0].join("").split("=")[1]);

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto(Navigator.dashboard, { waitUntil: "domcontentloaded" });

  Navigator.login(page, delayVal());
  await page.waitForNavigation();
  await page.goto(Navigator.programs);
  page.click("#create_new_item", {
    delay: delayVal,
  });
  await page.waitForSelector("#category_item");
  page.select("#category_item", "8");
  page.select("#item_time", "33");
  page.select("#item_count", `${itemCount}`);
  page.click("#create_rows_button", {
    delay: delayVal,
  });
  await page.waitForSelector(
    "#select_program"
  );


  for (let j = 0; j < itemCount; j++) {
    let idArrays = [
        `#select_program`,
        `#item_category`,
        `#item_option`,
        `#item_option`,
        `#item_option`,
        `#item_option`,
        `#item_option`,
        `#item_option`,
        `#item_option`,
        `#item_option`,
        `#item_option`,
        `#item_option`,
      ];
      console.log(idArrays[1])
    await Navigator.select( 
      page,
      idArrays,
      data[j+2]
    );
  }


})();
