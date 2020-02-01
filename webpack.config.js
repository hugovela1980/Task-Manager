const path = require('path')

module.exports = {
    entry: {
        index: ['babel-polyfill', './public/js/index.js'],
        login: ['babel-polyfill', './public/js/login.js'],
        account: ['babel-polyfill', './public/js/account.js'],
        home: ['babel-polyfill', './public/js/home.js'],
        tasks: ['babel-polyfill', './public/js/tasks.js'],
        details: ['babel-polyfill', './public/js/details.js'],
        edit: ['babel-polyfill', './public/js/edit.js'],
        create: ['babel-polyfill', './public/js/create.js'],
        delete: ['babel-polyfill', './public/js/delete.js'],
        logout: ['babel-polyfill', './public/js/logout.js'],
        no_auth: ['babel-polyfill', './public/js/no-auth.js'],
        profile: ['babel-polyfill', './public/js/profile.js'],
        update: ['babel-polyfill', './public/js/update.js'],
        reset: ['babel-polyfill', './public/js/reset.js'],
        collaborate: ['babel-polyfill', './public/js/collaborate.js'],
        groups: ['babel-polyfill', './public/js/groups.js'],
        group_details: ['babel-polyfill', './public/js/group-details.js']

    },
    output: {
        path: path.resolve(__dirname, 'public/scripts'),
        filename: '[name]-bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader:'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }]
    },
    devtool: 'source-map'
}