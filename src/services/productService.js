/** @format */

import API from "../utils/API";

export const productService = {
  getProduct,
  productDetail,
  productRegister,
  productUpdate,
  deleteProduct,
  getCategoryMenu,
  getBrandMenu,
  listProductType,
  productTypeUpdate,
  productTypeCreate,
  productTypeDelete,
};
//http://localhost:5005/api/product?page=1&pageSize=10&product=1&brand=1&category=1&category_id=1&brand_id=1
const BASE_REST_API_URL = "/product";
const BASE_CATEGORY_API_URL = "/category";
const BASE_BRAND_API_URL = "/brand";
const BASE_PRO_TYPE_API_URL = "/productType";
function getProduct(data) {
  return API.get(
    `${BASE_REST_API_URL}?page=${data.pageable.pageNumber}&pageSize=${data.pageable.pageSize}&product=${data.product}&brand=${data.brand}&category=${data.category}&category_id=${data.category_id}&brand_id=${data.brand_id}`
  );
}
function productDetail(id) {
  return API.get(`${BASE_REST_API_URL}/${id}`);
}
function productRegister(data) {
  return API.post(`${BASE_REST_API_URL}`, data);
}

function productUpdate(data, id) {
  return API.put(`${BASE_REST_API_URL}/${id}`, data);
}

function deleteProduct(id) {
  return API.delete(`${BASE_REST_API_URL}/${id}`);
}
function getCategoryMenu() {
  return API.get(`${BASE_CATEGORY_API_URL}`);
}

function getBrandMenu() {
  return API.get(`${BASE_BRAND_API_URL}`);
}

function listProductType(id) {
  return API.get(`${BASE_PRO_TYPE_API_URL}/${id}`);
}

function productTypeUpdate(data, pid,id) {
  return API.put(`${BASE_PRO_TYPE_API_URL}/${pid}/${id}`, data);
}
function productTypeCreate(data, id) {
  return API.post(`${BASE_PRO_TYPE_API_URL}/${id}`, data);
}
function productTypeDelete(id) {
  return API.delete(`${BASE_PRO_TYPE_API_URL}/${id}`);
}