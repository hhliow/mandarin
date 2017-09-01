MiddleChineseRomanizationConverter.phengqimSyllableToIPA = function(s) {
  // TODO: might or might not compile, debug as necessary.
  // TODO: maybe assert s contains no space?

  var apicalInitial = '^([dtsznʈɖʂʐɳ]|tsh?|dz|th|ʈh|ʈʂh?|ɖʐ)';
  var retroflexInitial = '^([ʈɖʂʐɳ]||ʈh|ʈʂh?|ɖʐ)';
  var velarOrGlottalInitial = '^([gk]h?|ng|[ŋxhɦ])';
  
  // Initials.

  s = s.replace(/^['q]/, 'ʔ');  
  s = s.replace(/^gh/, 'ɦ');
  
  s = s.replace('ng', 'ŋ');
  
  s = s.replace(/^t(.?h?[rɣ])/, 'ʈ$1');
  s = s.replace(/^d(.?[rɣ])/, 'ɖ$1');
  s = s.replace(/^n([rɣ])/, 'ɳ$1');
  s = s.replace(/^(.?)s([rɣ])/, '$1ʂ$2');
  s = s.replace(/^(.?)z([rɣ])/, '$1ʐ$2');

  s = s.replace(new RegExp(retroflexInitial + '[rɣ](w?[iyv])'), '$1$2');
  
  s = s.replace(/^nj/, 'ȵʑ');
  s = s.replace(/^t?c/, 'tɕ');
  s = s.replace(/^dc/, 'dʑ');
  s = s.replace(/^s[hcj]/, 'ɕ');
  s = s.replace(/^z[cj]/, 'ʑ');
  s = s.replace(/^([dn]?)zh/, '$1ʑ');
  
  // Medials.

  s = s.replace(new RegExp('(' + apicalInitial + ')' + 'r([wu]?[aeou])'), '$1ɣ$2');
  s = s.replace(/yi/, 'wi');
  
  // Syllabics.
  
  s = s.replace(/([^rɣji(([rɣj][wu])])a([^e]|[xq'h]|($))/, '$1ɑ$2');
  s = s.replace(new RegExp(velarOrGlottalInitial + '(w?i)a([xq\'h]?$)'), '$1$2ɑ$3');
  s = s.replace(/'(w?i)a([ntmpŋkiwu])'/, '$1ɑ$2');
  s = s.replace('ae', 'a');
  
  s = s.replace('ea', 'ɛ');
  s = s.replace(/([rɣ][wu]?)e/, '$1ɛ');
  
  s = s.replace('v', 'ɨ');
  s = s.replace(/y((ng)?[xq'hk]?)$/, 'ɨ$1');
  
  s.replace(/eo([^xq'h($)])/, 'ə$1');
  s.replace(/ieo([^xq'h($)])/, 'iɨ$1');  
  
  s.replace(/([^w]i)o([xq'h]?)$/, '$1ʌ$2');
  
  s.replace('([rɣ])o', '$1ɔ');
  
  // Tones.
  
  s = s.replace(/[xq']$/, 'ˀ');
  s = s.replace(/[hɦ]$/, 'ʱ');

  return s;  
}
