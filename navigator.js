const Navigator = {
  dashboard: "website/dashboard",
  programs:
    "website/programs",

  async login(page, delayVal) {
    page.click("#LoginUser_UserName", { delay: 1 });
    await page.type("#LoginUser_UserName", process.env.USERNAME_DB, {
      delay: delayVal,
    });
    await page.type("#LoginUser_Password", process.env.PASSWORD_DB, {
      delay: delayVal,
    });
    page.click("#LoginUser_LoginButton", { delay: 10 });
  },

  async select(page, id = [""], optionText = [""]) {
    if (id.constructor == Array && optionText.constructor == Array) {
      for (let i = 0; i < id.length; i++) {
        const dropdown = await page.$(id[i]);
        i < 2 ? console.log("") : await dropdown.click({clickcount: 3}) && await dropdown.press('Backspace');
        await dropdown.type(optionText[i]);
        i === 0 ? await page.waitForTimeout(2000) : await page.waitForTimeout(1500)
      }
      return;
    }
    console.log("You need to pass arrays to this function!")
  },
};

module.exports = { Navigator };
