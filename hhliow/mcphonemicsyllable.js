// Constructs a phonemic representation of a syllable in Early Middle Chinese from its canonical form in rhyme table, namely a string
// specifying 攝 呼 等 調 韻系 聲紐 重紐類 in the that particular order. 重紐 should and should only be specified for Division III syllables
// with initial from 見組 幫組 曉母 or 影母 and with rhyme from a 韻系 that is capable of 重紐 contrast.
// e.g. 通開一去東心 for syllable 送 or 止開三上支疑B for syllable 蟻.
function MCPhonemicSyllable(canonicalForm) {
  if (canonicalForm.length < 6 || canonicalForm.length > 7 || (canonicalForm.length == 7 && !/[ABab]$/.test(canonicalForm))) {
    throw new Error('Unknown canonical form: ' + canonicalForm);
  }
  
  this.canonicalForm = canonicalForm;  
  
  this.getCanonicalForm = function() {
    return this.canonicalForm;
  }

  // 攝
  this.getRhymeClass = function() {
    return this.canonicalForm.charAt(0);
  }
  
  // 呼: '開' or '合'
  this.getRoundedness = function() {
    return this.canonicalForm.charAt(1);
  }
  
  // 等  
  this.getDivsion = function() {
    return this.canonicalForm.charAt(2);
  }
  
  // 調
  this.getTone = function() {
    return this.canonicalForm.charAt(3);
  }

  // 韻系
  this.getTonelessRhyme = function() {
    return this.canonicalForm.charAt(4);
  }

  // 聲紐
  this.getInitial = function() {
    return this.canonicalForm.charAt(5);
  }
  
  // 重紐 status: 'A', B', or ''
  this.getRimeDoubletType = function() {
    return this.canonicalForm.length == 7 ? this.canonicalForm.charAt(6) : '';
  }  

  return this;
}
