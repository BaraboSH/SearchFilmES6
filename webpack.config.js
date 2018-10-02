const path = require("path");
const htmlPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = (env) => {
    return {
        mode: env.mode,
        context: path.join(__dirname, "src"),
        entry: {
            bundle: [
                '@babel/polyfill', './js/index'
            ]
        },
        output: {
            path: path.join(__dirname, "dist"),
            filename: "[name].js"
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/](jquery)[\\/]/,
                        name: 'vendor',
                        chunks: 'all',
                    }
                }
            }
        },
        module: {
            rules: [{
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                },
                {
                    test: /\.scss$/,
                    use: [env.mode == 'production' ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'sass-loader']
                },
                {
                    test: /\.(jpe?g|png|gif|svg)$/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            name: '[name].[ext]',
                            limit: 8000,
                            outputPath: 'img/'
                        }
                    }
                }
            ]
        },
        plugins: [
            new htmlPlugin({
                template: './index.html'
            }),
            new MiniCssExtractPlugin({
                filename: './css/style.css'
            })
        ],
        devServer: {
            contentBase: './dist'
        }
    };
}
/////////////////////