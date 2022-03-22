/** @format */

import { Button, Form, Table } from "react-bootstrap";
import PaginationSection from "../common/PaginationSection";
import {
  useParams,
  lNavLink,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import swal from "sweetalert";
import { SwalCommon } from "../../constants/SwalCommon";
import { OrdersService } from "../../services/AdminOrder";
import DateTime from "../common/DateTime";
export default function AdminOrderShipping() {
  let { url } = useRouteMatch();
  const history = useHistory();
  const [data, setData] = useState([]);

  const [dataFill, setDataFill] = useState({
    pageable: {
      pageNumber: 1,
      pageSize: 10,
    },
    product: "",
    brand: "",
    user: "",
    category: "",
    startFillDate: "",
    endFillDate: "",
    status: "COMPLETED",
  });
  const [endDate, setendDate] = useState("");
  const [startDate, setstartDate] = useState("");
  function handleChangeStartDate(date) {
    if (endDate && endDate < date) {
      swal(SwalCommon.DATE_RULES);
    } else {
      setstartDate(date);
      if (date != null) {
        let format = date.toISOString().slice(0, 10);
        setDataFill({ ...dataFill, startFillDate: format });
      } else setDataFill({ ...dataFill, startFillDate: "" });
    }
  }
  function handleChangeEndDate(date) {
    if (startDate && startDate > date) {
      swal(SwalCommon.DATE_RULES);
    } else {
      setendDate(date);
      if (date != null) {
        let format = date.toISOString().slice(0, 10);
        setDataFill({ ...dataFill, endFillDate: format });
      } else setDataFill({ ...dataFill, endFillDate: "" });
    }
  }
  function All() {
    setendDate(null);
    setstartDate(null);
    setDataFill({ ...dataFill, endFillDate: "", startFillDate: "" });
  }

  function ToDay() {
    setendDate(new Date());
    setstartDate(new Date());
    let format = new Date().toISOString().slice(0, 10);
    setDataFill({ ...dataFill, startFillDate: format, endFillDate: format });
  }

  function OneMonth() {
    var result = new Date();
    let endDate = new Date();
    let startDate = new Date(result.setDate(result.getDate() - 30));
    setendDate(endDate);
    setstartDate(startDate);
    let startformat = startDate.toISOString().slice(0, 10);
    let endformat = endDate.toISOString().slice(0, 10);
    setDataFill({
      ...dataFill,
      startFillDate: startformat,
      endFillDate: endformat,
    });
  }

  function ThreeMonth() {
    var result = new Date();
    let endDate = new Date();
    let startDate = new Date(result.setDate(result.getDate() - 90));
    setendDate(endDate);
    setstartDate(startDate);
    let startformat = startDate.toISOString().slice(0, 10);
    let endformat = endDate.toISOString().slice(0, 10);
    setDataFill({
      ...dataFill,
      startFillDate: startformat,
      endFillDate: endformat,
    });
  }

  function SixMonth() {
    var date = new Date();
    var result = new Date(date);
    let endDate = new Date();
    let startDate = new Date(result.setDate(result.getDate() - 180));
    setendDate(endDate);
    setstartDate(startDate);
    let startformat = startDate.toISOString().slice(0, 10);
    let endformat = endDate.toISOString().slice(0, 10);
    setDataFill({
      ...dataFill,
      startFillDate: startformat,
      endFillDate: endformat,
    });
  }
  function handleChange(e) {
    const { id, value } = e.target;
    setDataFill((data) => ({ ...data, [id]: value }));
  }

  const [isChangePage, setIsChangePage] = useState(false);
  function handlePaging(number) {
    setDataFill({
      ...dataFill,
      pageable: { ...dataFill.pageable, pageNumber: number },
    });
    setIsChangePage(!isChangePage);
  }
  async function fillData() {
    setDataFill(
      {
        ...dataFill,
        pageable: { ...dataFill.pageable, pageNumber: 1 },
      },
      setIsChangePage(!isChangePage)
    );
  }
  useEffect(() => {
    getData();
  }, [isChangePage]);

  function getData() {
    OrdersService.getOrders(dataFill).then((response) => {
      if (response.status === 200) {
        setData(response.data);
      }
    });
  }
  function detail (id) {
    history.push(`/orders/edit/${id}`);
  }
  return (
    <main>
      <div className="container-fluid">
        <div className="d-block d-xl-flex">
          <div className="tcol-25 tcol-lg-100 d-flex flex-column justify-content-between">
            <h4 className="font-weight-bold mt-5"> Order completed</h4>
            <div className="font-size12">
              Total &nbsp;<span>{data.totalElements}</span>&nbsp;case
            </div>
          </div>

          <div className="tcol-75 tcol-lg-100">
            <div className="search">
              <div className="tcol-90 d-flex justify-content-center flex-column">
                <div className="row mx-0">
                  <div className="col-2 px-1 font-size11 align-self-center text-center"></div>
                  <div className="col-10 px-1 d-flex">
                    <div className="tcol-20">
                      <DatePicker
                        className="form-control border-radius4 border-black"
                        selected={startDate}
                        onChange={(date) => handleChangeStartDate(date)}
                        dateFormat="yyyy/MM/dd"
                      />
                    </div>

                    <div className="justify-content-center align-self-center">
                      ~
                    </div>

                    <div className="tcol-20 mr-2">
                      <DatePicker
                        className="form-control border-radius4 border-black"
                        selected={endDate}
                        onChange={(date) => handleChangeEndDate(date)}
                        dateFormat="yyyy/MM/dd"
                      />
                    </div>

                    <Button
                      className="ml-1 mr-1  btn-ct-light text-dark tcol-10 p-0"
                      variant="light"
                      onClick={() => All()}
                    >
                      All
                    </Button>
                    <Button
                      className="ml-1 mr-1  btn-ct-light text-dark tcol-10 p-0"
                      variant="light"
                      onClick={() => ToDay()}
                    >
                      To day
                    </Button>
                    <Button
                      className="ml-1 mr-1  btn-ct-light text-dark tcol-10 p-0"
                      variant="light"
                      onClick={() => OneMonth()}
                    >
                      1 month
                    </Button>
                    <Button
                      className="ml-1 mr-1  btn-ct-light text-dark tcol-10 p-0"
                      variant="light"
                      onClick={() => ThreeMonth()}
                    >
                      3 month
                    </Button>
                    <Button
                      className="ml-1 mr-1 btn-ct-light text-dark tcol-10 p-0"
                      variant="light"
                      onClick={() => SixMonth()}
                    >
                      6 month
                    </Button>
                  </div>
                </div>
                <div className="row mx-0">
                  <div className="col-2"></div>

                  <div className="col-3">
                    <div className="row">
                      <div className="col-3 px-1 font-size11 align-self-center text-center">
                        User
                      </div>
                      <div className="col-9 px-1 d-flex">
                        <div class="d-flex bd-highlight mb-3 w-100">
                          <div class="pt-3 bd-highlight w-100">
                            {" "}
                            <input
                              type="text"
                              className="form-control border-black "
                              id="user"
                              required
                              onChange={handleChange}
                            ></input>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mx-0">
                  <div className="col-2"></div>
                  <div className="col-3">
                    <div className="row">
                      <div className="col-3 px-1 font-size11 align-self-center text-center">
                        Product name
                      </div>
                      <div className="col-9 px-1 d-flex">
                        <div class="d-flex bd-highlight mb-3">
                          <div class="pt-3 bd-highlight">
                            {" "}
                            <input
                              type="text"
                              className="form-control border-black "
                              id="product"
                              required
                              onChange={handleChange}
                            ></input>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="row">
                      <div className="col-3 px-1 font-size11 align-self-center text-center">
                        Brand
                      </div>
                      <div className="col-9 px-1 d-flex">
                        <div class="d-flex bd-highlight mb-3">
                          <div class="pt-3 bd-highlight">
                            {" "}
                            <input
                              type="text"
                              className="form-control border-black "
                              id="brand"
                              required
                              onChange={handleChange}
                            ></input>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="row">
                      <div className="col-3 px-1 font-size11 align-self-center text-center">
                        Category
                      </div>
                      <div className="col-9 px-1 d-flex">
                        <div class="d-flex bd-highlight mb-3">
                          <div class="pt-3 bd-highlight">
                            {" "}
                            <input
                              type="text"
                              className="form-control border-black "
                              id="category"
                              required
                              onChange={handleChange}
                            ></input>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="m-auto">
                <Button
                  className="btnSearch btn-ct-light text-dark tcol-10"
                  variant="light"
                  onClick={fillData}
                >
                  Find
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <Form>
            <div className="table-responsive">
              <Table bordered>
                <thead>
                  <tr>
                    <th> </th>
                    <th>Product Name</th>
                    <th>User Name</th>
                    <th>Brand Name</th>
                    <th>Category Name</th>
                    <th>Ship code</th>
                    <th>Quantity</th>
                    <th>Status</th>
                    <th>Time order</th>
                    <th>Detail</th>
                  </tr>
                </thead>
                <tbody>
                  {data.data &&
                    data?.data?.length > 0 &&
                    data.data.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{data?.totalElements - index} </td>
                          <td>{item.product_name}</td>
                          <td>{item.user_name}</td>
                          <td>{item.brand_name}</td>
                          <td>{item.category_name}</td>
                          <td>{item.ship_code}</td>
                          <td>{item.quantity}</td>
                          <td>{item.status}</td>
                          <td>  <DateTime
                              format=""
                              type="datetime"
                              date={item?.time_order}
                            /></td>
                          <td className="text-center">
                            <Button
                              className="btn-ct-light"
                              variant="light"
                              onClick={() => detail(item.id)}
                            >
                              Detail
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </div>

            <div className="d-flex justify-content-center">
              <PaginationSection
                size={dataFill.pageable.pageSize}
                number={data.currentPage}
                totalElements={data.totalElements}
                handlePaging={handlePaging}
              />
            </div>
          </Form>
        </div>
      </div>
    </main>
  );
}
