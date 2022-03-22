/** @format */

import API from "../utils/API";

export const OrdersService = {
  getOrders,
  OrdersDetail,
  OrdersRegister,
  OrdersEdit,
  OrdersDeleteList,
  OrderShip,
  getProductDetail,
};
const BASE_REST_API_URL = "/order";
const BASE_DETAIL_API_URL = "/productType/detail";
function getOrders(data) {
  return API.get(
    `${BASE_REST_API_URL}?page=${data.pageable.pageNumber}&pageSize=${data.pageable.pageSize}&product=${data.product}&brand=${data.brand}&user=${data.user}&category=${data.category}&status=${data.status}&startDate=${data.startFillDate}&endDate=${data.endFillDate}`
  );
}
function OrdersDetail(id) {
  return API.get(`${BASE_REST_API_URL}/${id}`);
}
function OrdersRegister(data) {
  return API.post(`${BASE_REST_API_URL}`, data);
}

function OrdersEdit(data) {
  return API.patch(`${BASE_REST_API_URL}`, data);
}

function OrdersDeleteList(id) {
  return API.delete(`${BASE_REST_API_URL}/${id}`);
}
function OrderShip(id, setToStatus) {
  return API.put(`${BASE_REST_API_URL}/${id}`, setToStatus);
}
function getProductDetail (id) {
  return API.get(`${BASE_DETAIL_API_URL}/${id}`);
}

