const formatDateTime = (inputDateTime) => {
  const date = new Date(inputDateTime);
  const year = date.getFullYear(inputDateTime);
  const month = date.getMonth(inputDateTime) + 1;
  const day = String(date.getDate(inputDateTime)).padStart(1, '0');

  return `${day}.${month}.${year}`;
};

export { formatDateTime };
