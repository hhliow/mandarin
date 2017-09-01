phengqimSyllableToIPA = function(s) {
  // TODO: assert s contains no space.
  
  s = s.replace(/^gh/, 'ɦ');
  
  s = s.replace('ng', 'ŋ');
  
  s = s.replace(/^t(.?h?[rɣ])/, 'ʈ$1');
  s = s.replace(/^d(.?[rɣ])/, 'ɖ$1');
  s = s.replace(/^n([rɣ])/, 'ɳ$1');
  s = s.replace(/^(.?)s([rɣ])/, '$1ʂ$2');
  s = s.replace(/^(.?)z([rɣ])/, '$1ʐ$2');

  var apicalInitial = '^([dtsznʈɖʂʐɳ]|tsh?|dz|th|ʈh|ʈʂh?|ɖʐ)';
  var retroflexInitial = '^([ʈɖʂʐɳ]||ʈh|ʈʂh?|ɖʐ)';
  s = s.replace(new RegExp('(' + retroflexInitial + ')' + 'r(w?[aeou])'), '$1ɣ$2');
  s = s.replace(new RegExp('(' + retroflexInitial + ')' + '[rɣ](w?[iyv])'), '$1$2');
  
  s = s.replace(/^nj/, 'ȵʑ');
  s = s.replace(/^s[hc]/, 'ɕ');
  s = s.replace(/^t?c/, 'tɕ');
  s = s.replace(/^([dz])c/, '$1ʑ');
  s = s.replace(/^([dn]?)zh/, '$1ʑ');
  
  return s;
}
