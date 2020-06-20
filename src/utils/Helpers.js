/**
 * Deep clone object to prevent mutability.
 * @param {Object} object
 */
const cloneObject = (object) => {
  return JSON.parse(JSON.stringify(object));
};

export { cloneObject };
