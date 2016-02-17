/**
 * StringUtils
 * @class
 * @classdesc String utilities.
 */
class StringUtils {
  /**
   * @method toRFC3986
   * @description Encodes the string in RFC3986
   *
   * @param {String}
   * @return {String}
   */
  static toRFC3986(s) {
    let tmp = encodeURIComponent(s);
    tmp.replace(/[!'()*]/g, function(c) {
      return `%${c.charCodeAt(0).toString(16)}`;
    });
  }

  /**
   * @method capFLetter
   * @description Returns a capitalized version of the string
   *
   * @param {String}
   * @return {String}
   */
  static capFLetter(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
}

export default StringUtils;
