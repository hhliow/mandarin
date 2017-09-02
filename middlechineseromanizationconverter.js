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

MiddleChineseRomanizationConverter.phengqimToIPA = function(s) {
  var words = s.split(/(\s+)/);
  for (var i = 0; i < words.length; i++) {
    if (/^[A-Za-z']+$/.test(words[i])) {
      words[i] = MiddleChineseRomanizationConverter.phengqimSyllableToIPA(words[i].toLowerCase());
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
  s = s.replace(/^(([gkŋhxbpmqʔ']|kh|ph|ng)w?)i(?=a?e|[^aouw])/, '$1ɣi');  
  
  // Syllabics.
  
  if (!/(?:[rɣji]|[rɣj][wu])a/.test(s)) {
    s = s.replace(/a(?!e)/, 'ɑ');
  }
  s = s.replace(new RegExp('^(' + MiddleChineseRomanizationConverter.velarOrGlottalInitial + 'w?i)a(?=[xq\'h]?$)'), '$1ɑ');
  s = s.replace(/(w?i)a(?=[ntmpŋkiwu])/, '$1ɑ');
  s = s.replace('ae', 'a');
  
  s = s.replace('ea', 'ɛ');
  s = s.replace(/([rɣ][wu]?)e/, '$1ɛ');
  
  s = s.replace('v', 'ɨ');
  s = s.replace(/y(?=(?:ng|[mŋk])?[xq'h]?$)/, 'ɨ');
  
  s = s.replace(/eo(?![xq'h]?$)/, 'ə');
  s = s.replace(/ieo(?![xq'h]?$)/, 'iɨ');  
  
  s = s.replace(/([^w]i)o(?=[xq'h]?$)/, '$1ʌ');
  
  s = s.replace(/([rɣ])o/, '$1ɔ');
  
  // Tones.
  
  s = s.replace(/[xq']$/, 'ˀ');
  s = s.replace(/[hɦ]$/, 'ʱ');

  return s;  
}

MiddleChineseRomanizationConverter.polyhedronToIPA = function(s) {
  var words = s.split(/\b/);
  for (var i = 0; i < words.length; i++) {
    if (/^[A-Za-z]+$/.test(words[i])) {
      words[i] = MiddleChineseRomanizationConverter.polyhedronSyllableToIPA(words[i].toLowerCase());
    }
  }
  return words.join('');
}
  
MiddleChineseRomanizationConverter.polyhedronSyllableToIPA = function(s) {
  var converted =
    MiddleChineseRomanizationConverter.getIPAInitialFromPolyhedronSyllable(s) +
        MiddleChineseRomanizationConverter.getIPAMedialFromPolyhedronSyllable(s) +
        MiddleChineseRomanizationConverter.getIPASyllabicFromPolyhedronSyllable(s) +
        MiddleChineseRomanizationConverter.getIPAFinalFromPolyhedronSyllable(s) +
        MiddleChineseRomanizationConverter.getTonalSuperscriptFromPolyhedronSyllable(s);

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
  
  return (s.match(/^[^aeiouyr]+/) || [''])[0];
}

MiddleChineseRomanizationConverter.getIPAMedialFromPolyhedronSyllable = function(s) {
  var medial = '';
  
  if (/^(n?[kghbpmq]h?w?)[yi](?:e|(?:[impnt][xh]?$))/.test(s)) {
    medial = 'ɣ';
  }

  if (/r(?![iy])/.test(s)) {
    medial = 'ɣ';
  }  
  
  if (/y[ae]/.test(s)) {
    return medial + 'wi';
  }

  if (/yo[nti]/.test(s)) {
    return medial + 'i';
  }
  
  if (/yo[xh]?$/.test(s)) {
    return medial + 'wi';
  }  
  
  if (/y[int]/.test(s)) {
    return medial + 'w';
  }
  
  if (/yu/.test(s)) {
    return medial + 'i'
  }
  if (/[ij](?=[aeou])/.test(s)) {
    return medial + 'i';
  }
  
  if (/u(?=[aeo])/.test(s)) {
    medial = medial + 'w';
  }
  
  return medial;
}

MiddleChineseRomanizationConverter.getIPASyllabicFromPolyhedronSyllable = function(s) {
  // Polyhedron a
  if (/ru?ai/.test(s)) {
    return 'ɛ';    
  } else if (/uai/.test(s)) {
    return 'o';
  } else if (/ai/.test(s)) {
    return 'ə';
  } else if (/ru?a/.test(s)) {
    return 'a';
  } else if (/^n?[kgqh]h?[iy]a[xh]?$/.test(s)) {
    return 'ɑ';    
  } else if (/[jiy]a[xh]?$/.test(s)) {
    return 'a';
  } else if (/a/.test(s)) {
    return 'ɑ';
  }
  
  // Polyhedron e
  if (/ru?e/.test(s)) {
    return 'ɛ';
  } else if (/^n?[kgqhpbm]h?[iy]e(?:k|ng)/.test(s)) {
    return 'æ';
  } else if (/e/.test(s)) {
    return 'e';
  }
  
  // Polyhedron o
  if (/io[int]/.test(s)) {
    return 'ɨ';
  } else if (/yo[int]/.test(s)) {
    return 'u';
  } else if (/[ji]o/.test(s)) {
    return 'ʌ';
  } else if (/uo[nt][xh]?$/.test(s)) {
    return 'o';
  } else if (/y?o[xh]?$/.test(s)) {
    return 'o';
  } else if (/o/.test(s)) {
    return 'ə';
  }
  
  // Polyhedron u
  if (/[yu]u(?:ng|k)/.test(s)) {
    return 'o';
  } else if (/ru/.test(s)) {
    return 'ɔ';    
  } else if (/u/.test(s)) {
    return 'u';
  }
    
  // Polyhedron i
  if (/(?:(?:^)|[^aeiouy])i(?:k|ng)?[xh]?$/.test(s)) {
    return 'ɨ';
  } else if (/i/.test(s)) {
    return 'i';
  }  

  // Polyhedron y
  if (/y[xh]?$/.test(s)) {
    return 'i';
  }    
  if (/yk|yng/.test(s)) {
    return 'ɨ';
  }
  if (/y[t|n]/.test(s)) {
    return 'i';
  }  
}

MiddleChineseRomanizationConverter.getIPAFinalFromPolyhedronSyllable = function(s) {
  if (/[aeo][id]/.test(s)) {
    return 'i';
  }
  
  if (/[aeo]u[xh]?$/.test(s)) {
    return 'w';
  }
  
  if (/y[xh]?$/.test(s)) {
    return 'w';
  }
  
  if (/[ru]ung/.test(s)) {
    return 'wŋ';
  } else if (/ng[xh]?$/.test(s)) {
    return 'ŋ';
  }
  
  if (/[ru]uk/.test(s)) {
    return 'wk';
  }
  
  return (s.match(/[mnptk]+(?=[xh]?$)/) || [''])[0];
}

MiddleChineseRomanizationConverter.getTonalSuperscriptFromPolyhedronSyllable = function(s) {
  if (/x$/.test(s)) {
    return 'ˀ';
  }
  
  if (/[hd]$/.test(s)) {
    return 'ʱ';
  }
  
  return '';
}
