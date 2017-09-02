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

  s = s.replace(/r(?=[wu]?[aeou])/, 'ɣ');
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
  s = s.replace(/y(?=(?:ng|[mŋk])?[xq'h]?$)/, 'ɨ');
  
  s.replace(/eo(?![xq'h]?$)/, 'ə');
  s.replace(/ieo(?![xq'h]?$)/, 'iɨ');  
  
  s.replace(/([^w]i)o(?=[xq'h]?$)/, '$1ʌ');
  
  s.replace('([rɣ])o', '$1ɔ');
  
  // Tones.
  
  s = s.replace(/[xq']$/, 'ˀ');
  s = s.replace(/[hɦ]$/, 'ʱ');

  return s;  
}

MiddleChineseRomanizationConverter.polyhedronToIPA = function(s) {
  // Initials.
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
    
  if (/^zj/.test(s)) {
    return 'dʑ';
  } else if (/^zr/.test(s)) {
    return 'ɖʐ';
  } else if (/^z/.test(s)) {
    return 'dz';
  }

  if (/^zsj/.test(s)) {
  } else if (/^zsr/.test(s)) {    
    return 'ʐ';
  } else if (/^zs/.test(s)) {
    return 'z';
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
    
  if (/^q/.test(s)) {
    return 'ʔ';
  }
    
  if (/^(?:gh|i|y)/.test(s)) {
    return 'ɦ';
  }
  
  return s.match(/^[^aeiouyr]+/)[0];
}

MiddleChineseRomanizationConverter.getIPAMedialFromPolyhedronSyllable = function(s) {
  if (/y[aeo]/.test(s)) {
    return 'wi';
  }
  
  if (/y[int]/.test(s)) {
    return 'w';
  }
  
  if (/yu/.test(s)) {
    return 'i'
  }
  if (/[ij](?=[aeou])/.test(s)) {
    return 'i';
  }
  
  var medial = '';
  
  if (/r(?![iy])/.test(s)) {
    medial = medial + 'ɣ';
  }

  if (/u(?=[aeo])/.test(s)) {
    medial = medial + 'w';
  }
  
  return medial;
}

MiddleChineseRomanizationConverter.getIPASyllabicFromPolyhedronSyllable = function(s) {
  if (/^((?![rjiy]|ru).)a(?!i)/.test(s)) {
    return 'ɑ';
  } else if (/^n?[kgqh]h?[iy]a[xh]?$/.test(s)) {
    return 'ɑ';    
  } else if (/[yi]a[ntmpkd])/.test(s)) {
    return 'ɑ';    
  } else if (/ru?ai/.test(s)) {
    return 'ɛ';    
  } else if (/ai/.test(s)) {
    return 'ə';
  } else if (/a/.test(s)) {
    return 'a';
  }
  
  if (/ru?e/.test(s)) {
    return 'ɛ';
  } else if (/^n?[kgqhpbm]h?[iy]e(?:k|ng)/.test(s)) {
    return 'a';
  } else if (/e/.test(s)) {
    return 'e';
  }
  
  if (/io[nt]/.test(s)) {
    return 'ɨ';
  } else if (/yo[nt]/.test(s)) {
    return 'u';
  } else if (/io/.test(s)) {
    return 'ʌ';
  } else if (/uo[nt][xh]?$/.test(s)) {
    return 'o';
  } else if (/y?o[xh]?$/.test(s)) {
    return 'o';
  } else if (/o/.test(s)) {
    return 'ə';
  }
  
  if (/[y|u]u(?:ng|k)/.test(s)) {
    return 'o';
  } else if (/u/.test(a)) {
    return 'u';
  }
    
  if (/(?:(?:^)|[^aeiouy])i(?:k|ng)?[xh]?$/.test(s)) {
    return 'ɨ';
  } else if (/i/.test(s)) {
    return 'i';
  }  
  
  if (/y[xh]?$/.test(s)) {
    return 'i';
  }
    
  if (/yk|yng/.test(s)) {
    return 'ɨ';
  }
}
