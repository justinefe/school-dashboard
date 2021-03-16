import axios from "axios";

const baseurl = "http://localhost:2019";
//   process.env.NODE_ENV === "production"
//     ? "http://localhost:2019"
//     : "https://stagging-paxinfy.herokuapp.com";

export const axiosInstance = axios.create({
  baseURL: `${baseurl}/api/v1`,
  timeout: 10000,
  withCredentials: true,
});

export const axiosCall = async ({ path, payload, method, contentType }) => {
  const url = `${baseurl}${path}`;
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": contentType || "application/json",
  };
  const axiosdata = {
    method,
    url,
    data: payload,
    headers,
    json: true,
  };

  try {
    const result = await axios(axiosdata);
    const data = result && result.data;
    return data;
  } catch (error) {
    throw error;
  }
};
