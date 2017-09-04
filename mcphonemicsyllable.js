function MCPhonemicSyllable(canonicalForm, rimeDublet) {
  if (canonicalForm.length != 6) {
    throw new Error('Unknown canonical form');
  }
  if (!/^[ABab]?$/.test(rimeDublet)) {
    throw new Error('Unknown rime dublet form: ' + rimeDublet + '; not one of A, B, a, b, or empty string.');
  }
  
  this.canonicalForm = canonicalForm;  
  this.rimeDublet = rimeDublet.toUpperCase();
  
  this.getCanonicalForm = function() {
    return this.canonicalForm;
  }

  this.getClass = function() {
    return this.canonicalForm.charAt(0);
  }

  this.getRoundedness = function() {
    return this.canonicalForm.charAt(1);
  }
  
  this.getDivsion = function() {
    return this.canonicalForm.charAt(2);
  }
  
  this.getTone = function() {
    return this.canonicalForm.charAt(3);
  }

  this.getTonelessRhyme = function() {
    return this.canonicalForm.charAt(4);
  }

  this.getInitial = function() {
    return this.canonicalForm.charAt(5);
  }
  
  this.getRimeDublet = function() {
    return this.rimeDublet;
  }  
  
  // TODO(hliow): implement getTonedRhyme if necessary

  return this;
}
