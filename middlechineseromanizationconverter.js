MiddleChineseRomanizationConverter = {};

MiddleChineseRomanizationConverter.apicalInitial = '(?:[dtsznʈɖʂʐɳ]|tsh?|dz|th|ʈh|ʈʂh?|ɖʐ)';

MiddleChineseRomanizationConverter.retroflexInitial = '(?:[ʈɖʂʐɳ]||ʈh|ʈʂh?|ɖʐ)';

MiddleChineseRomanizationConverter.velarOrGlottalInitial = '(?:[gk]h?|ng|[ŋxhɦqʔ\'])';

MiddleChineseRomanizationConverter.tonalSuffix = '(?:[xq\'h]?$)';

MiddleChineseRomanizationConverter.divisionTwoMedial = '[rɣ]';

MiddleChineseRomanizationConverter.roundingMedial = '(?:w|u(?=[aeo]))';

MiddleChineseRomanizationConverter.retroFlexT = new RegExp('^t(?=s?h?' + MiddleChineseRomanizationConverter.divisionTwoMedial + ')');

MiddleChineseRomanizationConverter.retroFlexD = new RegExp('^d(?=z?' + MiddleChineseRomanizationConverter.divisionTwoMedial + ')');

MiddleChineseRomanizationConverter.retroFlexN = new RegExp('^n(?=' + MiddleChineseRomanizationConverter.divisionTwoMedial + ')');

MiddleChineseRomanizationConverter.retroFlexS = new RegExp('s(?=' + MiddleChineseRomanizationConverter.divisionTwoMedial + ')');

MiddleChineseRomanizationConverter.retroFlexZ = new RegExp('z(?=' + MiddleChineseRomanizationConverter.divisionTwoMedial + ')');

MiddleChineseRomanizationConverter.phengqimSyllableToIPA = function(s) {
  // TODO: might or might not compile, debug as necessary.
  // TODO: maybe assert s contains no space?
 
  // Initials.

  s = s.replace(/^['q]/, 'ʔ');  
  s = s.replace(/^gh/, 'ɦ');
  
  s = s.replace('ng', 'ŋ');
  
  s = s.replace(MiddleChineseRomanizationConverter.retroFlexT, 'ʈ');
  s = s.replace(MiddleChineseRomanizationConverter.retroFlexD, 'ɖ');
  s = s.replace(MiddleChineseRomanizationConverter.retroFlexN, 'ɳ');
  s = s.replace(MiddleChineseRomanizationConverter.retroFlexS, 'ʂ');
  s = s.replace(MiddleChineseRomanizationConverter.retroFlexZ, 'ʐ');

  s =
      s.replace(
           new RegExp(
               '^(' + MiddleChineseRomanizationConverter.retroflexInitial + ')' +
                   MiddleChineseRomanizationConverter.divisionTwoMedial +
                   '(?=w?[iyv])'),
           '$1');
  
  s = s.replace(/^nj/, 'ȵʑ');
  s = s.replace(/^t?c/, 'tɕ');
  s = s.replace(/^dc/, 'dʑ');
  s = s.replace(/^s[hcj]/, 'ɕ');
  s = s.replace(/^z[cj]/, 'ʑ');
  s = s.replace(/^([dn]?)zh/, '$1ʑ');
  
  // Medials.

  s = s.replace(new RegExp('^(' + MiddleChineseRomanizationConverter.apicalInitial + ')' + 'r(?=[wu]?[aeou])'), '$1ɣ');
  s = s.replace(/yi/, 'wi');
  s = s.replace(/^(([gkŋhxbpmqʔ']|kh|ph|ng)w?)i/, '$1ɨi');  
  
  // Syllabics.
  
  s = s.replace(/^((?![rɣji]|[rɣj][wu]).)a(?=[^e]|(?:$))/, '$1ɑ');
  s = s.replace(new RegExp('^(' + MiddleChineseRomanizationConverter.velarOrGlottalInitial + 'w?i)a(?=[xq\'h]?$)'), '$1ɑ');
  s = s.replace(/(w?i)a(?=[ntmpŋkiwu])/, '$1ɑ');
  s = s.replace('ae', 'a');
  
  s = s.replace('ea', 'ɛ');
  s = s.replace(/([rɣ][wu]?)e/, '$1ɛ');
  
  s = s.replace('v', 'ɨ');
  s = s.replace(/y(?=(ng)?[xq'hk]?$)/, 'ɨ');
  
  s.replace(/eo(?![xq'h]?$)/, 'ə');
  s.replace(/ieo(?![xq'h]?$)/, 'iɨ');  
  
  s.replace(/([^w]i)o(?=[xq'h]?$)/, '$1ʌ');
  
  s.replace('([rɣ])o', '$1ɔ');
  
  // Tones.
  
  s = s.replace(/[xq']$/, 'ˀ');
  s = s.replace(/[hɦ]$/, 'ʱ');

  return s;  
}
