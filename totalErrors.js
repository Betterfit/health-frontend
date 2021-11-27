module.exports = function (results) {
  let numProblems = 0;
  console.log(results);
  results.forEach(() => (numProblems += 1));
  return `${numProblems} errors`;
};
