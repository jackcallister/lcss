#!/usr/bin/env node
var program = require('commander');
var fs = require('fs');
var Core = require('css-modules-loader-core');

var core = new Core();

program.version('0.0.1')
       .usage('<name>')
       .parse(process.argv);

if(!program.args.length) {
  program.help();
} else {
  var path = program.args[0];

  fs.readFile(path, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }

    core.load(data, path, null).then(function(result) {
      fs.writeFile('local.css', result.injectableSource, function (err) {
        if (err) throw err;
        console.log('CSS saved!');
      });

      fs.writeFile('local.js', JSON.stringify(result.exportTokens), function (err) {
        if (err) throw err;
        console.log('JS saved!');
      });
    });
  });
}
