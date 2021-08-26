const path = require('path');

module.exports = {
    mode: 'production', // 生产模式 生成 .min.js 压缩文件
    entry: './src/index.ts',
    output: {
        filename: 'vcat-history.[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
    },
};