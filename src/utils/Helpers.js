/**
 * Reformat datetime to readable format.
 * @param {Date} inputDateTime
 */
const formatDateTime = (inputDateTime) => {
  const date = new Date(inputDateTime);
  const year = date.getFullYear(inputDateTime);
  const month = date.getMonth(inputDateTime) + 1;
  const day = String(date.getDate(inputDateTime)).padStart(1, '0');

  return `${day}.${month}.${year}`;
};

/**
 * Deep clone object to prevent mutability.
 * @param {Object} object
 */
const cloneObject = (object) => {
  return JSON.parse(JSON.stringify(object));
};

export { cloneObject, formatDateTime };
