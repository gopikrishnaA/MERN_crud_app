import store from "../store";
import { showLoader, hideLoader } from "../reducers/loading";
import { baseUrl } from "./urls";

const invokeService = ({ serviceUrl, method = "GET", requestData }) => {
  console.log("serviceName is ", serviceUrl);
  console.log("requestData is ", requestData);

  const data = requestData ? JSON.stringify(requestData) : {};

  // Show loading icon
  store.dispatch(showLoader());

  // sent body object based on method
  const body = method !== "GET" && method !== "DELETE" ? { body: data } : {};

  // sent headers based on serviceUrl
  const headers =
    serviceUrl !== baseUrl
      ? {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      : { Accept: "application/json" };
  return fetch(
    serviceUrl, // eslint-disable-line
    {
      method,
      headers,
      ...body
    }
  )
    .then(response => {
      store.dispatch(hideLoader());
      console.log("response :::: ", response);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .catch(error => {
      store.dispatch(hideLoader());
      console.log("fetch error ::: ", error);
    });
};
export default invokeService;
