/** @format */

import API from "../utils/API";

export const BannerService = {
  getList,
  // adminDetail,
  // adminEdit,
  bannerRegister,
  bannerUpdate,
  deleteItem,
};
const BASE_REST_API_URL = "/brand";
function getList(data) {
  return API.get(
    `${BASE_REST_API_URL}?page=${data.pageable.pageNumber}&pageSize=${data.pageable.pageSize}&name=${data.name}`
  );
}
// function adminDetail(id) {
//   return API.get(`${BASE_REST_API_URL}`);
// }
function bannerRegister(data) {
  return API.post(`${BASE_REST_API_URL}`, data);
}

// function adminEdit(data) {
//   return API.patch(`${BASE_REST_API_URL}`, data);
// }

function bannerUpdate(id, data) {
  return API.put(`${BASE_REST_API_URL}/${id}`, data);
}

function deleteItem(id) {
  return API.delete(`${BASE_REST_API_URL}/${id}`);
}
