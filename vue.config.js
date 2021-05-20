// https://stackoverflow.com/questions/58325548/how-to-execute-my-own-script-after-every-webpacks-auto-build-in-watch-mode-of-v <3
const ArbitraryCodeAfterReload = function (callback) {
  this.apply = function (compiler) {
    if (compiler.hooks && compiler.hooks.done) {
      compiler.hooks.done.tap('webpack-arbitrary-code', callback);
    }
  };
};

const myCallback = function () {
  const fs = require('fs');
  const cssFile = fs.readdirSync('./dist/css').find((file) => /app\.\w+\.css/.test(file));

  const jsFile = fs.readdirSync('./dist/js').find((file) => /app\.\w+\.js/.test(file));

  fs.createReadStream(`./dist/css/${cssFile}`).pipe(fs.createWriteStream(`./css/${cssFile}`));
  fs.createReadStream(`./dist/js/${jsFile}`).pipe(fs.createWriteStream(`./js/${jsFile}`));

  const headFile = './_includes/head.html';
  const head = fs.readFileSync(headFile, 'utf8');
  headLines = head.split('\n');

  const prodCssLineIndex = headLines.findIndex((line) => line.indexOf('<!-- PRODCSS -->') > -1) + 1;
  headLines[prodCssLineIndex] = `      <link rel="stylesheet" href="/css/${cssFile}">`;
  fs.writeFileSync(headFile, headLines.join('\n'));

  const bodyEndFile = './_includes/body_end.html';
  const bodyEnd = fs.readFileSync(bodyEndFile, 'utf8');
  bodyEndLines = bodyEnd.split('\n');

  const prodJsLineIndex = bodyEndLines.findIndex((line) => line.indexOf('<!-- PRODJS -->') > -1) + 1;
  bodyEndLines[prodJsLineIndex] = `      <script src="/js/${jsFile}"></script>`;
  fs.writeFileSync(bodyEndFile, bodyEndLines.join('\n'));
};

const plugins = [];
const isProd = process.env.NODE_ENV === 'production';
if (isProd) {
  plugins.push(new ArbitraryCodeAfterReload(myCallback));
}

module.exports = {
  configureWebpack: {
    devtool: 'source-map',
    plugins: plugins,
  },
  chainWebpack: (config) => {
    // https://forum.vuejs.org/t/disable-code-splitting-in-vue-cli-3/36295/8
    config.optimization.splitChunks(false);

    // https://www.fabiofranchino.com/blog/inject-svg-in-dom-with-vue/
    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    svgRule
      .use('vue-svg-loader')
      .loader('vue-svg-loader');

    config.devtool('source-map');
  },
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/css/design-system.scss";
        `,
      },
    },
  },
};
