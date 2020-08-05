'use strict';
const generateSlug = require('./posts/generateSlug.js')
const generateBodyTextFields = require('./posts/generateBodyTextFields.js')
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

// The following lifecycle hooks are used to generate the non user editable fields.
// For example, the slug is generated from the title, the html is generated from the markdown, introText and fullText come from the html.
module.exports = {
  lifecycles: {
    beforeCreate: async (data) => {
      if (data.title) {
        // creates data.slug
        generateSlug(data)
      }
      if (data.markdown) {
        // creates data.html, data.introText and data.fullText
        generateBodyTextFields(data)
      }
    },
    beforeUpdate: async (_params, data) => {
      // why do we check properties of data in the beforeCreate hook but not here? This is how the example in the docs was structured. I suppose if we already checked on create then it must be there on update, in theory
      generateSlug(data)
      generateBodyTextFields(data)
    }
  }
};
