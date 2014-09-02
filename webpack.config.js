module.exports = {
  	entry: './js/main.jsx',
  	output: {
    	filename: './build/bundle.js'       
  	},
    module: {
        loaders: [
            { test: /\.jsx$/, loader: 'jsx-loader?harmony' },
            { test: /\.css$/, loader: 'style-loader!css-loader' }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx'] 
    }
};