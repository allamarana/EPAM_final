const path = require('path');


module.exports = {
    devtool: 'source-map',
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/build/',
    },
    node: {
        fs: 'empty'
    },
    watch: true,
    module: {
        rules: [
            {
                test: /\.js$/, 
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env"]
                        }
                    }
                ] 
            }
        ]
    }
}