const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const fs = require('fs');

function base64Encode(file) {
  const body = fs.readFileSync(file);
  return body.toString('base64');
}

module.exports = {
  // Single HTML webpack setup
  // https://stackoverflow.com/questions/58274001/vue-cli-combine-build-output-to-a-single-html-file
  css: {
    extract: false,
  },
  chainWebpack: (config) => {
    // Images and fonts have to be base64-encoded using url-loader
    config.module.rule('images').use('url-loader').loader('url-loader')
      .tap((options) => Object.assign(options, { limit: undefined }));

    config.module.rule('fonts').use('url-loader').loader('url-loader')
      .tap((options) => Object.assign(options, { limit: undefined }));
  },
  configureWebpack: {
    optimization: {
      splitChunks: false, // Generate only 1 js file (saves a bit of space)
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'output.html', // the output file name that will be created
        template: 'src/output-template.html', // this is important - a template file to use for insertion
        // favicon_raw: 'data:image/svg+xml;base64,' + base64Encode('src/assets/logo.svg'),
        // Raw bas64-encoded favicon (svg)
        favicon_raw: `data:image/x-icon;base64,${base64Encode('public/favicon.ico')}`, // Raw bas64-encoded favicon (ico)
        inlineSource: '.(js|css)$', // embed all javascript and css inline
        title: 'Vue htmlpage',
      }),
      new HtmlWebpackInlineSourcePlugin(HtmlWebpackPlugin),
    ],
  },
};
