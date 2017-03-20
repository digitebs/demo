module.exports = {
    entry: './src/main/js/app.js',
    devtool: 'sourcemaps',
    cache: true,
    debug: true,
    output: {
        path: __dirname,
        filename: './src/main/resources/static/built/bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js/,
                exclude: /(node_modules)/,
                loader: 'babel',
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'react']
                }
            },
            {
              test: /\.css$/,
              loader: 'style!css'
            },
            {
              test: /\.(woff2?|ttf|eot|svg|png|jpe?g|gif)$/,
              loader: 'file'
            }
        ]
    }
};