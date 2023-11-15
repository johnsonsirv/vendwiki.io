const path = require('path');

const formatNameWithGroup = (group) => ((filePath) => {
  const fileName = path.basename(filePath, path.extname(filePath));
  const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

  const capitalizedFileName = (
    fileName
      .split('-')
      .map((string) => capitalize(string))
      .join('')
  );

  return `${capitalizedFileName}${group}`;
});

module.exports = {
  formatNameWithGroup,
};
