'use strict';

/**
 * These differ from the defaults only in that they exclude unpublished posts
 * 
 */

module.exports = {
  find(params, populate) {
    // ensure only published posts are returned
    params.published = true;
    return strapi.query('posts').find(params, populate);
  },
  findOne(params, populate) {
    // ensure only a published post is returned
    params.published = true;
    return strapi.query('posts').findOne(params, populate);
  },
  count(params) {
    // ensure only a published post is counted
    params.published = true;
    return strapi.query('posts').count(params);
  },
};
