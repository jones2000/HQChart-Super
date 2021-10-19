const resolve = require('path').resolve
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const url = require('url')
const publicPath = ''

module.exports = (options = {}) => ({
  entry: {
    vendor: './src/vendor',
    index: './src/main.js'
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: options.dev ? '[name].js' : '[name].js?[chunkhash]',
    chunkFilename: '[id].js?[chunkhash]',
    publicPath: options.dev ? '/assets/' : publicPath
  },
  module: {
    rules: [{
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.less$/,
        loader: "style-loader!css-loader!less-loader"
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }]
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ],
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src')
    }
  },
  devServer: 
  {
      host: '127.0.0.1',
      port: 8080,
      proxy: 
      {
        '/web_ifzq_gtimg_cn/': 
        {
            target: 'https://web.ifzq.gtimg.cn',
            changeOrigin: true,
            pathRewrite: 
            {
              '^/web_ifzq_gtimg_cn': ''
            },

        },
        
        '/proxy_finance_qq_com/': 
        {
            target: 'https://proxy.finance.qq.com',
            changeOrigin: true,
            pathRewrite: 
            {
              '^/proxy_finance_qq_com': ''
            },

        },
        '/ifzq_gtimg_cn/': 
        {
            target: 'https://ifzq.gtimg.cn',
            changeOrigin: true,
            pathRewrite: 
            {
              '^/ifzq_gtimg_cn': ''
            },

        }
      },
      historyApiFallback: {
        index: url.parse(options.dev ? '/assets/' : publicPath).pathname
      }
  },
  devtool: options.dev ? '#eval-source-map' : '#source-map'
})
