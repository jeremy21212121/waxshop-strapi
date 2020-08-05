const slugify = require("slugify");
const generationErrorHandler = require("./generationErrorHandler.js");
const slugifyOptions = { lower: true, locale: "en" };

const generateSlug = data => {
  try {
    data.slug = slugify(data.title, slugifyOptions);
  } catch (error) {
    generationErrorHandler(error, "slug", data.title);
  }
};

module.exports = generateSlug;
