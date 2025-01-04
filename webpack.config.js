const path = require('path');

module.exports = {
  // ... diğer yapılandırmalar
  resolve: {
    fallback: {
      "path": require.resolve("path-browserify"),
      "os": require.resolve("os-browserify/browser"),
      "fs": false
    }
  }
}; 