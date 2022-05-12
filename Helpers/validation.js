

const checkLowerCaseAlphabets = (str) => {
  let regx = /[^a-z]/;
  if(!regx.test(str)){
    return true;
  }else{
    return false;
  }
}

const checkSpecialChar = (str) => {
  let regx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/

  if(regx.test(str)){
    return true;
  }else{
    return false;
  }
}

const checkValidLowerUpperCase = (str) => {
  let regex = /^[a-zA-Z]*$/
  if(regex.test(str)){
    return true;
  }else{
    return false;
  }
}

module.exports = {
  checkLowerCaseAlphabets,
  checkSpecialChar,
  checkValidLowerUpperCase
};
