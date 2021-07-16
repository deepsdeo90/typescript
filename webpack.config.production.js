const path = require('path');
const cleanplugin = require('clean-webpack-plugin');
const { CleanPlugin } = require('webpack');
module.exports = {
    mode:'production',
    entry:"./app.ts",
    output: {
        filename:'bundle.js',
        path:path.resolve(__dirname, 'dist'),
        publicPath:'dist',
    },
    devtool:'none',
    module :{
        rules:[
            {
                test:/\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve:{
        extensions:['.ts','.js']
    },
    plugins: [new CleanPlugin.CleanWebpackPlugin()],
}