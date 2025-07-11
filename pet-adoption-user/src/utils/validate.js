/**
 * 邮箱
 * @param {*} s
 */
export function isEmail (s) {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
}

/**
 * 手机号码
 * @param {*} s
 */
export function isMobile (s) {
  return /^1[0-9]{10}$/.test(s)
}

/**
 * 电话号码
 * @param {*} s
 */
export function isPhone (s) {
  return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s)
}

/**
 * URL地址
 * @param {*} s
 */
export function isURL (s) {
  return /^http[s]?:\/\/.*/.test(s)
}

/**
 * 匹配数字，可以是小数，不可以是负数,可以为空
 * @param {*} s 
 */
export function isNumber(s){
  return  /(^-?[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$)|(^$)/.test(s);
}
/**
 * 匹配整数，可以为空
 * @param {*} s 
 */
export function isIntNumer(s){
  return  /(^-?\d+$)|(^$)/.test(s);
}
/**
 * 身份证校验
 */
export function checkIdCard(idcard) {
  const regIdCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  if (!regIdCard.test(idcard)) {
      return false;
  } else {
      return true;
  }
}

/**
 * 登录密码校验
 * 
 */
export function validatePassword(password) {
  // 正则表达式匹配6-20个字符，只包含英文字母、数字或符号（除空格）
  const regex = /^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{6,20}$/;
  
  // 检查密码是否匹配正则表达式
  if (!regex.test(password)) {
      return false;
  }
  
  // 正则表达式匹配字母
  const letterRegex = /[a-zA-Z]/;
  
  // 正则表达式匹配数字
  const numberRegex = /[0-9]/;
  
  // 正则表达式匹配标点符号
  const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
  
  // 检查是否至少包含一种字母、一种数字或一种标点符号
  const hasLetter = letterRegex.test(password);
  const hasNumber = numberRegex.test(password);
  const hasSymbol = symbolRegex.test(password);
  
  // 确保至少包含两种类型的字符
  const typesCount = [hasLetter, hasNumber, hasSymbol].filter(Boolean).length;
  
  return typesCount >= 2;
}

// 测试
// const testPasswords = [
//   "abcdef",          // 只包含字母，不满足
//   "123456",          // 只包含数字，不满足
//   "!@#$%^&*",       // 只包含符号，不满足
//   "abcdef123",       // 包含字母和数字，满足
//   "abcdef@!",        // 包含字母和符号，满足
//   "123456@",         // 包含数字和符号，满足
//   "abcdef123@",      // 包含字母、数字和符号，满足
//   "a b c d e f",     // 包含空格，不满足（但正则已排除空格）
//   "abcdefg",         // 长度不足6，不满足（但正则已确保长度）
//   "abcdefghijklmnopqrstuvwxyz", // 长度超过20，不满足（但正则已确保长度）
// ];

// testPasswords.forEach(password => {
//   console.log(`${password}: ${validatePassword(password)}`);
// });