const winston = require('winston');

const { format, transports } = winston;
const { combine, json, timestamp } = format;
const { Console } = transports;

module.exports = ({ config: { log } }) => {
  const {
    env, name, version, level,
  } = log;

  /**
   * Factory function, returns a function to create json replacer
   * used to filter log messages
   * @param {*} fieldsToIgnore
   * @returns {object}
   */
  const createErrorReplacer = (fieldsToIgnore = []) => (_, value) => {
    if (value instanceof Error) {
      return (
        Object
          .getOwnPropertyNames(value)
          .filter((field) => !fieldsToIgnore.includes(field))
          .reduce((acc, key) => ({ ...acc, key: value[key] }), {})
      );
    }

    return value;
  };

  return winston.createLogger({
    level,
    format: combine(
      timestamp(),
      json({
        replacer: createErrorReplacer(['output', 'isBoom', 'isServer', 'data']),
      }),
    ),
    defaultMeta: {
      env,
      name,
      version,
    },
    transports: [new Console()],
  });
};
