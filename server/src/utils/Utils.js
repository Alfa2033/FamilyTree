class Utils {
    static StringEmpty = () => ''
    static StringIsNullOrEmpty = (contentString) => contentString === null || String(contentString) === this.StringEmpty()
    static IsNullOrUndefined = (value) => value === undefined || value === null
  }
  
  module.exports = Utils