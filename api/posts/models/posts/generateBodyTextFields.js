// This likely isn't the fastest/most memory efficient way of doing things. Fortunately, for this usecase, blog posts are created infrequently so it is not an issue.
// It works like so: Parses markdown -> serializes as html, using remark. Then, using node-html-parser, parse html -> convert legacy elements -> extract plain text && serialize final html.
// Remark is part of a whole ecosystem of related parser/serializes and no doubt I could have done this all in that ecosystem. That way I could have avoided the extra parse/serialize step. However, I found the ecosystem complex for my needs and preferred the DOM-like API of node-html-parser.

const Remark = require("remark");
const RemarkHtml = require("remark-html");
const htmlParser = require("node-html-parser");

const generationErrorHandler = require("./generationErrorHandler.js");

const markdownToHTML = mdString => {
  return new Promise(resolve => {
    Remark()
      .use(RemarkHtml)
      .process(mdString, (err, file) => {
        let output = "";
        if (!err) {
          output = String(file);
        }
        resolve(output);
      });
  });
};

// a mapping from legacy styling element tag names to a string representing it's desired effect
const styleElementDict = {
  em: "italic",
  b: "bold",
  strong: "bold",
  i: "italic",
  s: "strikethrough",
  strike: "strikethrough",
  del: "strikethrough",
  u: "underline"
};

// convert various legacy elements to a span with relevant class name
const convertTagNames = rootObj =>
  Object.keys(styleElementDict).forEach(tag => {
    const elementArray = rootObj.querySelectorAll(tag);
    elementArray.forEach(el => {
      el.tagName = "span";
      // set the class attribute as classNames array was not working
      el.setAttribute("class", styleElementDict[tag]);
    });
  });

const generateBodyTextFields = async data => {
  // generates html, introText and fullText
  try {
    // parse markdown and serialize it as html
    const roughHtml = await markdownToHTML(data.markdown);
    // parse the html into
    const htmlRoot = htmlParser.parse(roughHtml);
    // convert any legacy styling elements to spans with the relevant class name
    convertTagNames(htmlRoot);
    // add serialized html to data object
    data.html = htmlRoot.toString();
    const firstParagraphElement = htmlRoot.querySelector("p");
    // add plain text fields to data object
    data.introText = firstParagraphElement ? firstParagraphElement.text : "";
    data.fullText = htmlRoot.text;
  } catch (error) {
    generationErrorHandler(error, "body text fields", data.title);
  }
};

module.exports = generateBodyTextFields;
