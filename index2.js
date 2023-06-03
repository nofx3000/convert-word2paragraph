const fs = require("fs");
var path = require("path");
const AdmZip = require("adm-zip"); //引入查看zip文件的包
const dir = path.join(__dirname, "1.docx");
const zip = new AdmZip(dir); //filePath为文件路径

let contentXml = zip.readAsText("word/document.xml"); //将document.xml读取为text内容；
let str = "";
// console.log(contentXml);
// contentXml.match(/<w:t>[\s\S]*?<\/w:t>/gi).forEach((item) => {
//   str += item.slice(5, -6);
// });
let idx = 0;
contentXml.match(/<w:p[\s\S]*?<\/w:p>/gi).forEach((paragraph) => {
  let p = "";
  if (paragraph.match(/<w:t[\s\S]*?<\/w:t>/gi) !== null) {
    paragraph.match(/<w:t[\s\S]*?<\/w:t>/gi).forEach((sintence) => {
      let tmp = sintence.replace(' xml:space="preserve">', ">");
      tmp = tmp.slice(5, -6);
      p += tmp;
    });
  }
  console.log(p);
  if (p.trim().length > 0) {
    fs.writeFile(`./${idx++}-${p.slice(0, 20)}.txt`, p, (err) => {
      //将./2.txt替换为你要输出的文件路径
      if (err) throw err;
    });
  }
});
