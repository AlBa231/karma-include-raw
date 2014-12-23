var reference = function (config, fileList) {
  var path = require('path'),
  fs = require('fs'),
  glob = require('glob'),
  pattern = /\/\/\/\s*<reference path=["'](.*?)['"]/g,
  includedFiles = [],
  reloadList = [],
  files = config.files;
  files.forEach(function (f) {
    var sfiles = glob.sync(f.pattern);
    sfiles.forEach(function (f) {
      var file = fs.readFileSync(f),
      paths = f.split('/'),
      skip = paths.length - 1,
      matches,
      refFile;
      while ((matches = pattern.exec(file)) != null) {
        refFile = matches[1];

        refFile = refFile.replace(new RegExp('^(\.\./){' + skip + '}'), '');
        if (refFile.indexOf('jasmine') == -1 && includedFiles.indexOf(refFile) == -1) {
          includedFiles.push(refFile);
          reloadList.push({
            pattern: path.join(config.basePath, refFile),
            included: true,
            served: true,
            watched: true
          })
        }

      }
      includedFiles.push(f);
      reloadList.push({
        pattern: f,
        included: true,
        served: true,
        watched: true
      })
    });
  });
  config.files = reloadList;
  fileList.reload(reloadList, config.exclude)
};
reference.$inject = ['config', 'fileList'];

module.exports = {
  'framework:reference-chutzpah': ['factory', reference]
};
