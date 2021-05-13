// https://stackoverflow.com/questions/58325548/how-to-execute-my-own-script-after-every-webpacks-auto-build-in-watch-mode-of-v <3
const ArbitraryCodeAfterReload = function(callback) {
  this.apply = function(compiler) {
    if (compiler.hooks && compiler.hooks.done) {
      compiler.hooks.done.tap("webpack-arbitrary-code", callback);
    }
  };
};

const myCallback = function() {
  const fs = require("fs");
  const cssFile = fs.readdirSync("./dist/css").find(file => {
    return /app\.\w+\.css/.test(file);
  });

  const jsFile = fs.readdirSync("./dist/js").find(file => {
    return /app\.\w+\.js/.test(file);
  });

  fs.createReadStream(`./dist/css/${cssFile}`).pipe(fs.createWriteStream(`./css/${cssFile}`));
  fs.createReadStream(`./dist/js/${jsFile}`).pipe(fs.createWriteStream(`./js/${jsFile}`));

  const layoutFile = "./_layouts/default.html";

  let layout = fs.readFileSync(layoutFile, "utf8");
  layoutLines = layout.split("\n");

  const prodCssLineIndex = layoutLines.findIndex(line => line.indexOf("<!-- PRODCSS -->") > -1) + 1;
  layoutLines[prodCssLineIndex] = `      <link rel="stylesheet" href="/css/${cssFile}">`;

  const prodJsLineIndex = layoutLines.findIndex(line => line.indexOf("<!-- PRODJS -->") > -1) + 1;
  layoutLines[prodJsLineIndex] = `      <script src="/js/${jsFile}"></script>`;

  fs.writeFileSync(layoutFile, layoutLines.join("\n"));
};

const plugins = [];
const isProd = process.env.NODE_ENV === "production";
if (isProd) {
  plugins.push(new ArbitraryCodeAfterReload(myCallback));
};

module.exports = {
  configureWebpack: {
    plugins
  },
  chainWebpack: config => {
    config.optimization.splitChunks().clear();
  }
};
