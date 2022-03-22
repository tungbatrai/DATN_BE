/** @format */

import API from "../utils/API";

export const CategoryService = {
  getList,
  categoryRegister,
  categoryUpdate,
  deleteItem,
};
const BASE_REST_API_URL = "/category";
function getList(data) {
  return API.get(
    `${BASE_REST_API_URL}?page=${data.pageable.pageNumber}&pageSize=${data.pageable.pageSize}&name=${data.name}`
  );
}

function categoryRegister(data) {
  return API.post(`${BASE_REST_API_URL}`, data);
}

function categoryUpdate(id,data) {
  return API.put(`${BASE_REST_API_URL}/${id}`, data);
}

function deleteItem(id) {
  return API.delete(`${BASE_REST_API_URL}/${id}`);
}
