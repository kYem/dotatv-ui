const cssnano = require('cssnano')

module.exports = {
  plugins: [
    cssnano({
      preset: ['advanced', {
        discardComments: {
          removeAll: true,
        },
        autoprefixer: {
          add: true,
          remove: true,
        },
        discardUnused: false,
        mergeIdents: false,
        reduceIdents: false,
        safe: true,
      }]
    })
  ],
};
