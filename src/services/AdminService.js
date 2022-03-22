/** @format */

import API from "../utils/API";

export const AdminService = {
  getAdmin,
  adminDetail,
  adminRegister,
  adminEdit,
  deleteItem,
};

const BASE_REST_API_URL = "/user";
function getAdmin(data) {
  return API.get(
    `${BASE_REST_API_URL}?page=${data.pageable.pageNumber}&pageSize=${data.pageable.pageSize}&name=${data.name}&email=${data.email}&phone=${data.phone}&role=${data.role}`
  );
}
function adminDetail(id) {
  return API.get(`${BASE_REST_API_URL}/${id}`);
}
function adminRegister(data) {
  return API.post(`${BASE_REST_API_URL}/signup`, data);
}

function adminEdit(data) {
  return API.put(`${BASE_REST_API_URL}`, data);
}

function deleteItem(id) {
  return API.delete(`${BASE_REST_API_URL}/${id}`);
}
