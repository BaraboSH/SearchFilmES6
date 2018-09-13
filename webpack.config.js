const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    context: path.join(__dirname, "src/js"),
    mode: "development",
    watch: true,
    entry: "./index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ["env", "stage-0"]
                }
            }
        }]
    },
    devServer: {
        hot: true
    },
    plugins: [
        new htmlWebpackPlugin({
            template: "../../index.html"
        })
    ]
};