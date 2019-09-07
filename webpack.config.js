﻿const path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    entry: path.join(__dirname, 'app/app.js'),
    output: {
        path: path.join(__dirname, 'dist/js'),
        filename: 'bundle.js'
    },
    performance: {
        hints: false
    },
    stats: {
        warnings: false
    },
    module: {
        rules: [
           {
               test: /\.js$/,
               exclude: /node_modules/,
               loader: 'babel-loader',
               query: {
                   presets: ['react', 'es2015'],
                   plugins: ['transform-class-properties']
               }
           },
            {
                test: /\.css$/,
                loader: ['style-loader', 'css-loader']
            },
        ]
    },
    mode: 'development'

}
