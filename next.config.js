const withNextra = require('nextra')('nextra-theme-blog', './theme.config.js')
module.exports = withNextra()

module.exports = {
    webpack: (config) => {
      config.module.rules.push({
        test: /\.geojson$/,
        use: 'json-loader',
      });
  
      return config;
    },
  };
  