import fetch from "node-fetch";

const makeRequest = async (endpoint, body = {}, headers = {}, reqType = "") => {
  try {
    const requestOptions = {
      method: reqType,
      headers: headers,
    };

    // Add body only if the request type is not "GET" or "HEAD"
    if (reqType.toUpperCase() !== "GET" && reqType.toUpperCase() !== "HEAD") {
      requestOptions.body = JSON.stringify(body);
    }

    const response = await fetch(endpoint, requestOptions);

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw error;
  }
};

export default makeRequest;
