const babel                 = require('babel-loader');
const HtmlWebpackPlugin     = require('html-webpack-plugin');
const webpack               = require('webpack');
const path                  = require('path');
const WebpackNotifierPlugin = require('webpack-notifier');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin        = require('uglifyjs-webpack-plugin');

const publicURL = process.env.PUBLIC;
const port = process.env.PORT;
const proxyUrl = process.env.PROXY_URL;
const DEBUG = process.env.NODE_ENV !== 'production';

let config = {
    distPath     : path.join(__dirname, 'dist'),
    srcPath      : path.join(__dirname, 'src')
};

let appEntries = [
    `${config.srcPath}/index.tsx`
];

if(process.env.NODE_ENV !== 'production') {
    [].unshift.apply(appEntries, [
        'webpack/hot/only-dev-server'
    ])
} else {
    console.log(process.env.NODE_ENV)
}

const plugins = [
    new CleanWebpackPlugin([config.distPath], {verbose:true}),
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
        debug: true
    }),
    new HtmlWebpackPlugin({
        // favicon: './node_modules/itrexio-front-react-core/images/favicon.ico',
        template: path.join(config.srcPath, 'index.html')
    }),
    new WebpackNotifierPlugin({alwaysNotify: true})
];

if (!DEBUG) {
    plugins.push(
        new UglifyJSPlugin({
            uglifyOptions: {
                compress: true,
                warnings: false,
                comments: false
            }
        })
    )
}

module.exports = {
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', 'scss']
    },
    entry  : {
        app: appEntries
    },
    output : {
        filename         : '[name].bundle-[hash:4].js',
        sourceMapFilename: '[name].bundle-[hash:4].map',
        path             :  config.distPath
    },

    devServer: {
        port: port,
        host: 'localhost',
        open: true,
        proxy: [{
            context: ['/api/**'],
            changeOrigin: true,
            target: proxyUrl,
            secure: false
        }]
    },

    devtool: 'source-map',

    module: {
        loaders: [
            {
                loaders : DEBUG ? ['react-hot-loader/webpack', 'babel-loader', 'ts-loader'] : [ 'babel-loader', 'ts-loader' ],
                test   : /\.tsx?$/,
                exclude: /(node_modules)/
            },
            {
                loader: 'html-loader',
                test  : /\.html?$/
            },
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader'
            },
            {
                test: /\.(jpe?g|png|gif|svg|ico)$/i,
                loaders: [
                    'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack-loader'
                ]
            }
        ]
    },
    plugins: plugins
};
