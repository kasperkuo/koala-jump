module.exports = {
  entry: './lib/koala_jump.js',
  output: {
    path: __dirname,
    filename: 'bundle.js',
    module: {
      loaders: [
        {
          test: /\.css$/,
          loader: 'style!css',
        },
      ]
    }
  }
};
