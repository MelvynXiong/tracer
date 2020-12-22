const path = require('path');

module.exports = {
  entry: './test/index.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    alias: {
      shared: path.resolve(__dirname, 'packages/shared'),
      'react-dom': path.resolve(__dirname, 'packages/react-dom'),
      react: path.resolve(__dirname, 'packages/react'),
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
