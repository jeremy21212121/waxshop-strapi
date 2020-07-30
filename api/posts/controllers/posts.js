'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

// const { sanitizeEntity } = require('strapi-utils');

// // filter from the response any unpublished posts
// const filterUnpublished = (entitiesArray) => entitiesArray.filter(entity => entity.published)

// // remove private fields using sanitizeEntity from strapi-utils
// const sanitizePost = (entity) => sanitizeEntity(entity, { model: strapi.model.posts })

module.exports = {

  // I moved this functionality to the "service". The strapi docs don't really make clear the distinction between service/controller
  // The docs describe this functionality [here](https://strapi.io/documentation/v3.x/guides/draft.html#introduction) which customizes the controller ¯\_(ツ)_/¯

  // async find(ctx) {
  //   let entities;
  //   if (ctx.query._q) {
  //     entities = await strapi.services.restaurant.search(ctx.query);
  //   } else {
  //     entities = await strapi.services.restaurant.find(ctx.query);
  //   }

  //   return entities
  //     .filter(filterUnpublished)
  //     .map(sanitizePost);
  // },

};
