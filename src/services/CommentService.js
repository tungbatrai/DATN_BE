/** @format */

import API from "../utils/API";

export const CommentService = {
  getList,
  deleteItem,
};
const BASE_REST_API_URL = "/comment";
function getList(data) {
  return API.get(
    `${BASE_REST_API_URL}?page=${data.pageable.pageNumber}&pageSize=${data.pageable.pageSize}&product=${data.product}&commenter=${data.commenter}&startDate=${data.startFillDate}&endDate=${data.endFillDate}`
  );
}
function deleteItem(id) {
    return API.delete(`${BASE_REST_API_URL}/${id}`);
  
}
