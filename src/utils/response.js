const response = (res, code, data) => {
  return res.status(code).json(data);
};

export default response;
