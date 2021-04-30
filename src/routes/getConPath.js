module.exports = getConPath = route => {
  const routePath = `${__dirname}/${route}Controllers`;
  return conName => {
    return `${routePath}/${conName}`;
  };
};
