const fs = require("fs");
const { parse } = require("csv-parse/sync");

reader = {
   csvFile() {
    const file = fs.readFileSync("./New Item Request.csv")
    return parse(
        file,
        {
          columns: false,
          trim: false,
          relax_quotes: true,
          relax_column_count: true,
        },
        (err, rows) => {
          if (err) {
            console.log(err);
            return;
          }
        }
      )
  },
};

module.exports = { reader };
