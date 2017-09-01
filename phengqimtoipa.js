phengqimSyllableToIPA = function(s) {
  // TODO: assert s contains no space.
  s.replace('ng', 'ŋ');
  s.replace(/^gh/, 'ɦ');
  
  s.replace(/^t(.?h?r)/, 'ʈ$1');
  s.replace(/^d(.?r)/, 'ɖ$1');
  s.replace(/^nr/, 'ɳ');
  s.replace(/^(.?)sr/, '$1ʂr');
  s.replace(/^(.?)zr/, '$1ʐr');

  var apicalInitial = '^([dtsznʈɖʂʐɳ]|tsh?|dz|th|ʈh|ʈʂh?|ɖʐ)';
  var retroflexInitial = '^([ʈɖʂʐɳ]||ʈh|ʈʂh?|ɖʐ)';
  s.replace(new RegExp(retroflexInitial + 'r(w?[aeou])'), '$1ɣ$2');
  s.replace(new RegExp(retroflexInitial + 'r(w?[iyv])'), '$1$2');

  s.replace(/^nj/, 'ȵʑ');
  s.replace(/^([dz])c/, '$1ʑ');
  s.replace(/^([dn]?)zh/, '$1ʑ');
}
