const HtmlWebpackPlugin = require("html-webpack-plugin");
// const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");

const globalChunks = ["style"];

module.exports = {
    entry: {
        /**
         * Views
         */
        index: "./src/js/views/index.js",
        tables: "./src/js/views/tables.js",
        /**
         * Styles
         */
        style: "./src/css/style.css",
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    "style-loader",
                    "css-loader",
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/templates/index.html",
            filename: "index.html",
            chunks: [...globalChunks, "index"],
        }),
        new HtmlWebpackPlugin({
            template: "./src/templates/tables.html",
            filename: "tables.html",
            chunks: [...globalChunks, "tables"],
        }),
    ],
}