const CompressionPlugin = require('compression-webpack-plugin')
const webpack = require('webpack');
//优化webpack 减小包体积 加快webview启动页面速率
module.exports = {
    outputDir:'dists',
    assetsDir: 'static',
    parallel: false,
    publicPath: './',
    lintOnSave: false, //是否开启eslint
    // devtool: '#source-map',
    chainWebpack:config=>{
        config.plugins.delete('prefetch')

        if (process.env.NODE_ENV === 'production') {
            // 启动时动态创建一个html：http://localhost:8888/report.html
            // config.plugin('webpack-bundle-analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);
            // 生成一个静态html，report.html
            config.plugin('webpack-report').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [
                {
                    analyzerMode: 'static'
                }
            ]);
            config.plugin('ignore')
                .use(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)); //忽略/moment/locale下的所有文件
        }
    },
    devServer: {
        open: true, //是否自动弹出浏览器页面
        https: false,   //是否使用https协议
        hotOnly: false, //是否开启热更新
        proxy: {
            '/api': {
                target: 'https://myjxs.youmaijiankang.com/ycysp',
                ws: false,
                changeOrigin: true,
                pathRewrite: {
                    "^/api": "" // 这个意思就是以api开头的，定向到哪里, 如果你的后边还有路径的话， 会自动拼接上
                }
            }
        }
    },
    // css: {
    //     // 是否使用css分离插件 ExtractTextPlugin
    //     extract: false,
    //     // 开启 CSS source maps?
    //     sourceMap: false,
    //     // 启用 CSS modules for all css / pre-processor files.
    //     requireModuleExtension: false,
    // },
    configureWebpack: (config) => {
        if (process.env.NODE_ENV === 'production') {// 为生产环境修改配置...
            config.mode = 'production';
            config["performance"] = {//打包文件大小配置
                "maxEntrypointSize": 10000000,
                "maxAssetSize": 30000000

            }
            return {
                plugins: [
                    new CompressionPlugin({
                    filename: '[path].gz[query]',
                    algorithm: 'gzip',
                    test: /\.(js|css)(\?.*)?$/i,
                    threshold: 10240, // 对超过10k的数据进行压缩
                    minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
                    deleteOriginalAssets: false, // 删除原文件
                }),
                ]
            }
        }
    }
}
