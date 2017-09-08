// Reads key-value pairs from a tab-separated string, where each line represents one key-value pair.
readMapFromTsvString = function(s) {
  var result = new Map();
  var lines = s.match(/[^\r\n]+/g);
  for (var i = 0; i < lines.length; i++) {
    var pair = lines[i].split('\t');
    result.set(pair[0], pair[1]);
  }
  return result;
}

// Reads from a file at the specified url and push the content string to the array dest.
function readStringFromFile(url, dest) {
  var x = new XMLHttpRequest();
  x.open('GET', s);
  x.onload = function() {
    dest.push(x.responseText);
    setTimeout(readStringFromFile, 5000);
  };
  x.send();
}
