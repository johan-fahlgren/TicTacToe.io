/**
 * @method getObjekt
 * @param {string} key - localStorage store key
 * @returns {object} parsed object
 */
Storage.prototype.getObjekt = function (key) {
  return JSON.parse(this.getItem(key));
};

/**
 * @method copyContent
 * @returns {Array.<string, any>} parsed object
 */
Storage.prototype.copyContent = function () {
  const keyValuePairs = Object.entries(this);
  this.clear();
  return keyValuePairs;
};
//let savedContent = localStorage.copyContent();

/**
 * @method restoreContent
 * @param {Array.<string, string>} content - Array of keys and values
 * in string format.
 */
Storage.prototype.restoreContent = function (content) {
  this.clear();
  for (let [key, value] of content) {
    this.setItem(key, value);
  }
};
// localStorage.restoreContent(savedContent);
