'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */
const slugify = require('slugify')
// the following lifecycle hooks generate a slug from the post title
module.exports = {
  lifecycles: {
    beforeCreate: async (data) => {
      if (data.title) {
        data.slug = slugify(data.title)
      }
    },
    beforeUpdate: async (_params, data) => {
      data.slug = slugify(data.title)
    }
  }
};
