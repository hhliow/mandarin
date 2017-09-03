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
  var words = s.split(/([^A-Za-z']+)/);
  for (var i = 0; i < words.length; i++) {
    if (/^[A-Za-z']+$/.test(words[i])) {
      words[i] = MiddleChineseRomanizationConverter.phengqimSyllableToIPA(words[i].toLowerCase());
    }
  }
  return words.join('');
}

// Converts Polyhedron's Middle Chinese romanization to IPA. Does not do exhaustive sanity check, may attempt to convert all contiguous
// Latin-alphabetical blocks as Polyhedron Middle Chinese.
MiddleChineseRomanizationConverter.polyhedronToIPA = function(s) {
  var words = s.split(/\b/);
  for (var i = 0; i < words.length; i++) {
    if (/^[A-Za-z]+$/.test(words[i])) {
      var converted = MiddleChineseRomanizationConverter.polyhedronSyllableToIPA(words[i].toLowerCase());
      if (converted != null) {
        words[i] = converted;
      }
    }
  }
  return words.join('');
}

MiddleChineseRomanizationConverter.phengqimSyllableToIPA = function(s) {
  // TODO: debug, maybe write tests.
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
  
  // Medials.

  // Division II
  s = s.replace(/r(?=[wu]?[aeou])/, 'ɣ');
  s = s.replace(/yi/, 'wi');
  // Division III-B
  s = s.replace(/^(([gkŋhxbpmqʔ']|kh|ph|ng)w?)i(?=a?e(?:[^o]|(?:$))|[^aeiouw])/, '$1ɣi');  
  
  // Syllabics.
  
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
  
  // Tones.
  
  // 上
  s = s.replace(/[xq']$/, 'ˀ');
  // 去
  s = s.replace(/[hɦ]$/, 'ʱ');

  return s;  
}

MiddleChineseRomanizationConverter.polyhedronSyllableToIPA = function(s) {
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
    var appendum = polyhedronPartialConverters[i](s);
    if (appendum == null) {
      return null;
    }
    converted += appendum;
  }
  
  return converted;
}

MiddleChineseRomanizationConverter.getIPAInitialFromPolyhedronSyllable = function(s) {
  if (/^ng/.test(s)) {
    return 'ŋ';
  } 
  
  if (/^chj/.test(s)) {
    return 'tɕh';
  } else if (/^chr/.test(s)) {
    return 'ʈʂh';
  } else if (/^cj/.test(s)) {
    return 'tɕ';
  } else if (/^cr/.test(s)) {
    return 'ʈʂ';
  } else if (/^ch/.test(s)) {
    return 'tsh';
  } else if (/^c/.test(s)) {
    return 'ts';
  }
    
  if (/^zsj/.test(s)) {
    return 'ʑ';
  } else if (/^zsr/.test(s)) {    
    return 'ʐ';
  } else if (/^zs/.test(s)) {
    return 'z';
  } else if (/^zj/.test(s)) {
    return 'dʑ';
  } else if (/^zr/.test(s)) {
    return 'ɖʐ';
  } else if (/^z/.test(s)) {
    return 'dz';
  }
  
  if (/^sj/.test(s)) {
    return 'ɕ';
  } else if (/^sr/.test(s)) {
    return 'ʂ';
  }
    
  if (/^tr/.test(s)) {
    return 'ʈ';
  }
    
  if (/^thr/.test(s)) {
    return 'ʈh';
  }
   
  if (/^dr/.test(s)) {
    return 'ɖ';
  }
    
  if (/^nr/.test(s)) {
    return 'ɳ';
  }
    
  if (/^nj/.test(s)) {
    return 'ȵʑ';
  }
  
  if (/^qj/.test(s)) {
    return 'ʔj';
  } else if (/^q/.test(s)) {
    return 'ʔ';
  }
    
  if (/^(?:gh|i|y)/.test(s)) {
    return 'ɦ';
  }

  // Default to literal initials.
  return (s.match(/^[^aeiouyr]+/) || [null])[0];
}

MiddleChineseRomanizationConverter.getIPAMedialFromPolyhedronSyllable = function(s) {
  var medial = '';
  
  // Divsion III-B.
  if (/^(n?[kghbpmq]h?w?)[yi](?:e|(?:[impnt][xh]?$))/.test(s)) {
    medial = 'ɣ';
  }

  // Divsion II.
  if (/r(?![iy])/.test(s)) {
    medial = 'ɣ';
  }  
  
  if (/y[ae]/.test(s)) {
    return medial + 'wi';
  }

  // 云微合
  if (/yo[nti]/.test(s)) {
    return medial + 'i';
  }
  
  // 虞
  if (/yo[xh]?$/.test(s)) {
    return medial + 'wi';
  }  
  
  // 脂合真合臻合職合
  if (/y[iknt]/.test(s)) {
    return medial + 'w';
  }
  
  if (/yu/.test(s)) {
    // 鍾
    return medial + 'i'
  }  
  if (/[ij](?=[aeou])/.test(s)) {
    return medial + 'i';
  }
  
  // Division I/II/IV rounded.
  if (/u(?=[aeo])/.test(s)) {
    medial = medial + 'w';
  }
  
  return medial;
}

MiddleChineseRomanizationConverter.getIPASyllabicFromPolyhedronSyllable = function(s) {
  // Polyhedron a
  if (/ru?ai/.test(s)) {
    // 皆
    return 'ɛ';    
  } else if (/uai/.test(s)) {
    // 灰
    return 'o';
  } else if (/ai/.test(s)) {
    // 咍
    return 'ə';
  } else if (/ru?a/.test(s)) {
    return 'a';
  } else if (/^n?[kgqh]h?[iy]a[xh]?$/.test(s)) {
    // 戈三
    return 'ɑ';    
  } else if (/[jiy]a[xh]?$/.test(s)) {
    // 麻三
    return 'a';
  } else if (/a/.test(s)) {
    return 'ɑ';
  }
  
  // Polyhedron e
  if (/ru?e/.test(s)) {
    return 'ɛ';
  } else if (/^n?[kgqhpbm]h?[iy]e(?:k|ng)/.test(s)) {
    // 庚三
    return 'æ';
  } else if (/e/.test(s)) {
    // Division IV
    return 'e';
  }
  
  // Polyhedron o
  if (/io[int]/.test(s)) {
    // 欣微開
    return 'ɨ';
  } else if (/yo[int]/.test(s)) {
    // 云微合
    return 'u';
  } else if (/[ji]o/.test(s)) {
    // 魚
    return 'ʌ';
  } else if (/uo[nt][xh]?$/.test(s)) {
    // 魂
    return 'o';
  } else if (/y?o[xh]?$/.test(s)) {
    // 模虞
    return 'o';
  } else if (/o/.test(s)) {
    return 'ə';
  }
  
  // Polyhedron u
  if (/[yu]u(?:ng|k)/.test(s)) {
    // 冬鍾
    return 'o';
  } else if (/ru/.test(s)) {
    // 江
    return 'ɔ';    
  } else if (/u/.test(s)) {
    return 'u';
  }
    
  // Polyhedron i
  if (/(?:(?:^)|[^aeiouy])i(?:k|ng)?[xh]?$/.test(s)) {
    // 之蒸開
    return 'ɨ';
  } else if (/i/.test(s)) {
    return 'i';
  }  

  // Polyhedron y
  if (/y[xh]?$/.test(s)) {
    // 幽
    return 'i';
  }    
  if (/yk|yng/.test(s)) {
    // 職合
    return 'ɨ';
  } else if (/y[tn]/.test(s)) {
    // 真合臻合
    return 'i';
  }
  
  return null;
}

MiddleChineseRomanizationConverter.getIPAFinalFromPolyhedronSyllable = function(s) {
  if (/[aeo][id]/.test(s)) {
    return 'i';
  }
  
  if (/[aeo]u[xh]?$/.test(s)) {
    return 'w';
  }
  
  if (/y[xh]?$/.test(s)) {
    // 幽
    return 'w';
  }
  
  if (/[ru]ung/.test(s)) {
    // 冬江
    return 'wŋ';
  } else if (/ng[xh]?$/.test(s)) {
    return 'ŋ';
  }
  
  if (/[ru]uk/.test(s)) {
    // 沃角
    return 'wk';
  }
  
  // Default to literal finals
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
  // 上
  if (/x$/.test(s)) {
    return 'ˀ';
  }
  
  // 去  
  if (/[hd]$/.test(s)) {
    return 'ʱ';
  }
  
  // 平入
  return '';
}
