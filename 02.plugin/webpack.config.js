const CopyWebpackPlugin = require('./plugins/CopyWebpackPlugin');
module.exports = {
  plugins: [
    new CopyWebpackPlugin({
      from: 'public',
      to: 'public',
      ignore: ['**/index.html'],
    }),
  ],
  mode: 'development',
};
