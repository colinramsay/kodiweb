module.exports = {
  	entry: './js/main.jsx',
  	output: {
    	filename: './build/bundle.js'       
  	},
    module: {
        loaders: [
            { test: /\.jsx$/, loader: 'jsx-loader?harmony' }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx'] 
    }
};