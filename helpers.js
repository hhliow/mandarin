// Reads key-value pairs from a tab-separated string, where each line represents one key-value pair.
readMapFromTsvString = function(s) {
  var table = readArrayFromTsvString(s);
  for (var i = 0; i < table.length; i++) {
    var key = table[i][0];
    if (/^\/.*\/$/.test(key)) {
         key = new RegExp(key.replace(/^\/(.*)\/$/, '$1'));
    }
    result.set(key, table[i][1]);
  }
  return result;
}

readArrayFromTsvString = function(s) {
  var result = [];
  var lines = s.match(/[^\r\n]+/g);
  for (var i = 0; i < lines.length; i++) {
    result.push(lines[i].split('\t'));
  }
  return result;
}

// Reads from a file at the specified url and push the content string to the array dest.
function readStringFromFile(url, dest) {
  var x = new XMLHttpRequest();
  x.open('GET', url);
  x.onload = function() {
    dest.push(x.responseText);
    setTimeout(readStringFromFile, 5000);
  };
  x.send();
}

applyRegexCumulativeLy = function(s, map) {
  var result = '';
  map.forEach(
      function(value, key) {
        if (key.test(s)) {
          result += value;
        }
      }
  ); 
  return result;
}
