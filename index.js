var textract = require("textract");
var fs = require("fs");
var path = require("path");

const dir = path.join(__dirname, "1.docx");

textract.fromFileWithPath(dir, function (error, text) {
  if (error) {
    console.log(error);
  } else {
    console.log(text);
  }
});
