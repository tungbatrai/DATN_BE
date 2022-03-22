/** @format */

import API from "../utils/API";
export const AwsService = {
  getLink,
  getLinkProduct,
};

const BASE_URL = "/category/uploadUrl";
const BASE_URL_PRODUCT = "/product/uploadUrl";
function getLink(file) {
  const formData = new FormData();
  formData.append("image", file);

  return API.post(`${BASE_URL}`, formData);
}
function getLinkProduct(file) {
  const formData = new FormData();
  formData.append("image", file);

  return API.post(`${BASE_URL_PRODUCT}`, formData);
}
