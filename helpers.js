// Reads key-value pairs from a tab-separated string, where each line represents one key-value pair.
readMapFromTsvString = function(s) {
  var table = readArrayFromTsvString(s);
  var result = new Map();
  for (var i = 0; i < table.length; i++) {
    var key = table[i][0];
    if (/^\/.*\/$/.test(key)) {
         key = new RegExp(key.replace(/^\/(.*)\/$/, '$1'));
    }
    result.set(key, table[i][1]);
  }
  return result;
};

readArrayFromTsvString = function(s) {
  var result = [];
  var lines = s.match(/[^\r\n]+/g);
  for (var i = 0; i < lines.length; i++) {
    result.push(lines[i].split('\t'));
  }
  return result;
};

// Executes the function callback on the content of the file as a string.
readStringFromFile = function(url, callback) {
  var x = new XMLHttpRequest();
  x.open('GET', url);
  x.onload = function() {
    callback(x.responseText);
    setTimeout(readStringFromFile, 5000);
  };
  x.send();
};

// Reads from a file at the specified url and push the content string to the array dest.
pushFileContentToArray = function(url, dest) {
  var x = new XMLHttpRequest();
  x.open('GET', url);
  x.onload = function() {
    dest.push(x.responseText);
    setTimeout(readStringFromFile, 5000);
  };
  x.send();
};

getCumulativeRegexApplication = function(map) {
  return function(s) {
    var result = '';
    map.forEach(
        function(value, key) {
          if (key.test(s)) {
            result += value;
          }
        }
    );
    return result;
  };
};

getReplacementChain = function(map) {
  return function(s) {
    var result = '';
    map.forEach((value, key) => result.replace(key, value));
    return result;
  };
};

getReverseMappingObject = function(keys, f) {
  var r = new Object(null);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var value = f(key);
    if (r.hasOwnProperty(value)) {
      console.warn(key + ' and ' + r[value] + ' both map to ' + value);
    } else {
      r[value] = key;
    }
  }
  return r;
};

getReverseFunction = function(keys, f) {
  var obj = getReverseMappingObject(keys, f);
  return function(x) {
    return obj[x];
  };
};

readCumulativeRegexpApplicationFromFile = function(url, dest) {
  readStringFromFile(
      url,
      function(s) {
        dest[0] = getCumulativeRegexApplication(readMapFromTsvString(s));
      });
};

readReplacementChainFromFile = function(url, dest) {
  readStringFromFile(
      url,
      s => (dest[0] = getReplacementChain(readMapFromTsvString(s))));
};
