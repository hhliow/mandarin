/*
 * Author: hhliow https://github.com/hhliow/
 */

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

// Converts Phjong's Middle Chinese Romanization systems to IPA. Does not do sanity check, may attempt to convert all contiguous
// Latin-alphabetical blocks as Middle Chinese.
MiddleChineseRomanizationConverter.phengqimToIPA = function(s) {
  return s.split(/([^A-Za-z']+)/).map(MiddleChineseRomanizationConverter.phengqimSyllableToIPA).join('');
}

// Converts Polyhedron's Middle Chinese romanization to IPA. Does not do exhaustive sanity check, may attempt to convert all contiguous
// Latin-alphabetical blocks as Polyhedron Middle Chinese.
MiddleChineseRomanizationConverter.polyhedronToIPA = function(s) {
  return s.split(/\b/).map(MiddleChineseRomanizationConverter.polyhedronSyllableToIPA).join('');
}

MiddleChineseRomanizationConverter.phengqimSyllableToIPA = function(s) {
  if (!/^[A-Za-z']+$/.test(words[i])) {
    // Obviously not pheng qim, return the string without conversion.
    return s;
  }
  
  s = s.toLowerCase();
 
  // Initials

  s = s.replace(/^['q]/, 'ʔ');  
  s = s.replace(/^gh/, 'ɦ');
  
  s = s.replace('ng', 'ŋ');
  
  s = s.replace(MiddleChineseRomanizationConverter.retroFlexT, 'ʈ');
  s = s.replace(MiddleChineseRomanizationConverter.retroFlexD, 'ɖ');
  s = s.replace(MiddleChineseRomanizationConverter.retroFlexN, 'ɳ');
  s = s.replace(MiddleChineseRomanizationConverter.retroFlexS, 'ʂ');
  s = s.replace(MiddleChineseRomanizationConverter.retroFlexZ, 'ʐ');

  // After converting all retroflex initials to IPA, remove r markers from division III syllables.
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
  
  // Medials

  // Division II
  s = s.replace(/r(?=[wu]?[aeou])/, 'ɣ');
  s = s.replace(/yi/, 'wi');
  // Division III-B
  s = s.replace(/^(([gkŋhxbpmqʔ']|kh|ph|ng)w?)i(?=a?e(?:[^o]|(?:$))|[^aeiouw])/, '$1ɣi');  
  
  // Syllabics
  
  if (!/(?:[rɣji]|[rɣj][wu])a/.test(s)) {
    s = s.replace(/a(?!e)/, 'ɑ');
  }
  s = s.replace(new RegExp('^(' + MiddleChineseRomanizationConverter.velarOrGlottalInitial + 'w?i)a(?=[xq\'h]?$)'), '$1ɑ');
  s = s.replace(/(w?i)a(?=[ntmpŋkiwu])/, '$1ɑ');
  // 庚三
  s = s.replace(/(w?i)ae(?=ng|k|ŋ)/, '$1æ');
  s = s.replace('ae', 'a');
  
  s = s.replace('ea', 'ɛ');
  s = s.replace(/([rɣ][wu]?)e/, '$1ɛ');
  
  s = s.replace('v', 'ɨ');
  s = s.replace(/y(?=(?:ng|[mpŋk])?[xq'h]?$)/, 'ɨ');
  
  // 欣云微
  s = s.replace(/ieo(?![xq'h]?$)/, 'iɨ');  
  s = s.replace(/eo(?![xq'h]?$)/, 'ə');
  
  // 魚
  s = s.replace(/([^w]i)o(?=[xq'h]?$)/, '$1ʌ');
  
  // 江
  s = s.replace(/([rɣ])o/, '$1ɔw');

  // Tones
  
  // 上
  s = s.replace(/[xq']$/, 'ˀ');
  // 去
  s = s.replace(/[hɦ]$/, 'ʱ');

  return s;  
}

MiddleChineseRomanizationConverter.polyhedronSyllableToIPA = function(s) {
  if (!/^[A-Za-z]+$/.test(s)) {
    // Obviously not a Polyhedron Middle Chinese syllable, return the string literally.
    return s;
  }
  
  var lowerCased = s.toLowerCase(s);
  var converted = '';
  var polyhedronPartialConverters =
      [
        MiddleChineseRomanizationConverter.getIPAInitialFromPolyhedronSyllable,
        MiddleChineseRomanizationConverter.getIPAMedialFromPolyhedronSyllable,
        MiddleChineseRomanizationConverter.getIPASyllabicFromPolyhedronSyllable,
        MiddleChineseRomanizationConverter.getIPAFinalFromPolyhedronSyllable,
        MiddleChineseRomanizationConverter.getTonalSuperscriptFromPolyhedronSyllable
      ];
  
  for (i = 0; i < polyhedronPartialConverters.length; i++) {
    var appendum = polyhedronPartialConverters[i](lowerCased);
    if (appendum == null) {
      // Obviously not a Polyhedron Middle Chinese syllable, return the string literally.
      return s;
    }
    converted += appendum;
  }
  
  return converted;
}

MiddleChineseRomanizationConverter.matchAndMap = function(s, mappings) {
  for(var i = 0; i < mappings.length; i++) {
    if (mappings[i][0].test(s)) {
      return mappings[i][1];
    }
  }
  
  return null;  
}

MiddleChineseRomanizationConverter.polyhedronToIPAInitialNonLiteralMapping =
    [[/^ng/, 'ŋ'],
     [/^(?:gh|i|y)/, 'ɦ'],
     [/^chj/, 'tɕh'],
     [/^chr/, 'ʈʂh'],
     [/^cj/, 'tɕ'],
     [/^cr/, 'ʈʂ'],
     [/^ch/, 'tsh'],
     [/^c/, 'ts'],
     [/^zsj/, 'ʑ'],
     [/^zsr/, 'ʐ'],
     [/^zs/, 'z'],
     [/^zj/, 'dʑ'],
     [/^zr/, 'ɖʐ'],
     [/^z/, 'dz'],    
     [/^sj/, 'ɕ'],
     [/^sr/, 'ʂ'],
     [/^tr/, 'ʈ'],
     [/^thr/, 'ʈh'],
     [/^dr/, 'ɖ'],
     [/^nr/, 'ɳ'],
     [/^nj/, 'ȵʑ'],
     [/^qj/, 'ʔj'],
     [/^q/, 'ʔ']];

MiddleChineseRomanizationConverter.getIPAInitialFromPolyhedronSyllable = function(s) {
  var initial =
      MiddleChineseRomanizationConverter.matchAndMap(s, MiddleChineseRomanizationConverter.polyhedronToIPAInitialNonLiteralMapping);
  
  return initial || (s.match(/^[^aeiouyr]+/) || [null])[0];  
}

MiddleChineseRomanizationConverter.getIPAMedialFromPolyhedronSyllable = function(s) {
  var medial = '';
  
  if (/r[aeou]/.test(s) || // Divsion II
      /^(?:[kghbpmq]|ng|kh|gh|ph)[yi](?:e|[impnt][xh]?$)/.test(s)) { // Divsion III-B
    medial += 'ɣ';
  }  
  
  if (/y[aeiknt]|yo[xh]?$|u[aeo]/.test(s)) {
    medial += 'w';
  }
  
  if (/[ijy][aeou]/.test(s)) {
    medial += 'i';
  }

  return medial;
}

MiddleChineseRomanizationConverter.getIPASyllabicFromPolyhedronSyllable = function(s) {
  var syllabic;

  // Polyhedron a
  syllabic =
      MiddleChineseRomanizationConverter.matchAndMap(
          s,
          [[/ru?ai/, 'ɛ'], // 皆
           [/uai/, 'o'], // 灰
           [/ai/, 'ə'], // 咍
           [/ru?a/, 'a'], // Division II excluding 皆
           [/^n?[kgqh]h?[iy]a[xh]?$/, 'ɑ'], // 戈三
           [/[jiy]a[xh]?$/, 'a'], // 麻三
           [/a/, 'ɑ']]);
  if (syllabic != null) {
    return syllabic;
  }

  // Polyhedron e
  syllabic =
      MiddleChineseRomanizationConverter.matchAndMap(
          s,
          [[/ru?e/, 'ɛ'], // e in Divsion II
           [/^n?[kgqhpbm]h?[iy]e(?:k|ng)/, 'æ'], // 庚三
           [/e/, 'e']]); // Division IV
  if (syllabic != null) {
    return syllabic;
  }
  
  // Polyhedron o
  syllabic =
      MiddleChineseRomanizationConverter.matchAndMap(
          s,
          [[/io[int]/, 'ɨ'], // 欣微開
           [/yo[int]/, 'u'], // 云微合
           [/[ji]o/, 'ʌ'], // 魚
           [/uo[nt][xh]?$/, 'o'], // 魂
           [/y?o[xh]?$/, 'o'], // 模虞
           [/o/, 'ə']]);
  if (syllabic != null) {
    return syllabic;
  }
  
  // Polyhedron u
  syllabic =
      MiddleChineseRomanizationConverter.matchAndMap(
          s,
          [[/[yu]u(?:ng|k)/, 'o'], // 冬鍾
           [/ru/, 'ɔ'], // 江
           [/u/, 'u']]);
  if (syllabic != null) {
    return syllabic;
  }
  
  // Polyhedron i
  syllabic =
      MiddleChineseRomanizationConverter.matchAndMap(
          s,
          [[/(?:(?:^)|[^aeiouy])i(?:k|ng)?[xh]?$/, 'ɨ'], // 之蒸開
           [/i/, 'i']]);
  if (syllabic != null) {
    return syllabic;
  }

  // Polyhedron y
  syllabic =
      MiddleChineseRomanizationConverter.matchAndMap(
          s,
          [[/y[xh]?$/, 'i'], // 幽
           [/yk|yng/, 'ɨ'], // 職合
           [/y[tn]/, 'i']]); // 真合臻合
  if (syllabic != null) {
    return syllabic;
  }

  return null;
}

MiddleChineseRomanizationConverter.getIPAFinalFromPolyhedronSyllable = function(s) {
  var final = 
      MiddleChineseRomanizationConverter.matchAndMap(
          s,
          [[/[aeo][id]/, 'i'],
           [/[aeo]u[xh]?$/, 'w'],
           [/y[xh]?$/, 'w'], // 幽
           [/[ru]ung/, 'wŋ'], // 冬江
           [/ng[xh]?$/, 'ŋ'],
           [/[ru]uk/, 'wk']]); // 沃覺
  if (final != null) {
    return final;
  }
  
  // Literal consonantal finals
  var matched = s.match(/[mnptk]+(?=[xh]?$)/);
  if (matched != null) {
    return matched[0];
  }
 
  // No finals
  if (/[aeiouy][xh]?$/.test(s)) {
    return '';
  }
  
  return null;
}

MiddleChineseRomanizationConverter.getTonalSuperscriptFromPolyhedronSyllable = function(s) {
  if (/x$/.test(s)) {
    // 上
    return 'ˀ';
  }
  
  if (/[hd]$/.test(s)) {
    // 去
    return 'ʱ';
  }
  
  // 平入
  return '';
}
