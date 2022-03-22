/** @format */

import API from "../utils/API";

export const RattingService = {
  getList,
 
};
//http://localhost:5005/api/rating?page=1&pageSize=10&rater=1&star=1&startDate=2022-01-31&endDate=2022-05-31
const BASE_REST_API_URL = "/rating";
function getList(data) {
  return API.get(
    `${BASE_REST_API_URL}?page=${data.pageable.pageNumber}&pageSize=${data.pageable.pageSize}&star=${data.star}&startDate=${data.startFillDate}&endDate=${data.endFillDate}`
  );
}
