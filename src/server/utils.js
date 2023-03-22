const getRequestIdFromRequest = (request) => (
  request.headers.requestid || request.info.id
);

module.exports = {
  getRequestIdFromRequest,
};
