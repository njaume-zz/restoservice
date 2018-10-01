export function randomString (length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
  
  export function truncateDecimals (number) {
      return Math[number < 0 ? 'ceil' : 'floor'](number);
  };
  
  export function format(value){
    if (isNaN(value)) value = value.replace(/\D/g,'');
    return value;
  }
  
  export function removeAccents(str) {
    let accents = 'ÀÁÂÃÄÅàáâãäåßÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž';
    let accentsOut = "AAAAAAaaaaaaBOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz";
    str = str.split('');
    str.forEach((letter, index) => {
      let i = accents.indexOf(letter);
      if (i != -1) {
        str[index] = accentsOut[i];
      }
    })
    return str.join('');
  }