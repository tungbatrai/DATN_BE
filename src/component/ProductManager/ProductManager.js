/** @format */

import { Button, Form, Table } from "react-bootstrap";
import PaginationSection from "../common/PaginationSection";
import { NavLink, useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { SwalCommon } from "../../constants/SwalCommon";
import { OrdersService } from "../../services/AdminOrder";
import { productService } from "../../services/productService";
export default function ProductManager() {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [dataFill, setDataFill] = useState({
    pageable: {
      pageNumber: 1,
      pageSize: 10,
    },
    product: "",
    brand: "",
    category_id: "",
    category: "",
    brand_id: "",
  });

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
    productService.getProduct(dataFill).then((response) => {
      if (response.status === 200) {
        setData(response.data);
      }
    });
  }
  function deleteItem(id) {
    swal(SwalCommon.ALERT_DELETE_ALL).then((willDelete) => {
      if (willDelete) {
        // swal(SwalCommon.COMING_SOON);
        productService
          .productTypeDelete(id)
          .then((response) => {
            if (response.status === 200) {
              swal(SwalCommon.ALERT_DELETE_COMPLETE).then(() => {
                getData();
              });
            } else {
              alert("Delete fail !");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  }
  function handleCreate() {
    history.push("/product/product/register");
  }

  function handleEdit(id) {
    history.push("/product/product/edit/" + id);
  }
  function handleProType(id) {
    history.push("/product/product/product-type/" + id);
  }
  return (
    <main>
      <div className="container-fluid">
        <div className="d-block d-xl-flex">
          <div className="tcol-25 tcol-lg-100 d-flex flex-column justify-content-between">
            <h4 className="font-weight-bold mt-5">Product list</h4>
            <div className="font-size12">
              Total &nbsp;<span>{data.totalElements}</span>&nbsp;case
            </div>
          </div>

          <div className="tcol-75 tcol-lg-100">
            <div className="search">
              <div className="tcol-90 d-flex justify-content-center flex-column">
                <div className="row mx-0">
                  <div className="col-2"></div>
                  <div className="col-3">
                    <div className="row">
                      <div className="col-3 px-1 font-size11 align-self-center text-center">
                        Product
                      </div>
                      <div className="col-9 px-1 d-flex">
                        <div class="d-flex bd-highlight mb-3">
                          <div class="pt-3 bd-highlight">
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
                    <th className="text-center"></th>

                    <th>Name</th>

                    <th>Brand Name</th>
                    <th>Category Name</th>
                    <th>Quantity</th>
                    <th>image</th>
                    <th>Detail</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {data.data &&
                    data?.data?.length > 0 &&
                    data.data.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            {data.totalElements -
                              (index +
                                dataFill.pageable.pageSize *
                                  (data.currentPage - 1))}
                          </td>
                          <td>{item.name}</td>
                          <td>{item.brand_name}</td>
                          <td>{item.category_name}</td>
                          <td>{item.total_quantity}</td>
                          <td>
                            <img src={item.image} className="img-css" />
                          </td>

                          <td className="w-25 text-center">
                            <div className="row d-flex justify-content-center">
                              {" "}
                              <Button
                                className="btn-ct-light mt-2 "
                                variant="light"
                                onClick={() => handleEdit(item.id)}
                              >
                                Detail
                              </Button>
                            </div>
                            <div className="row d-flex justify-content-center">
                              {" "}
                              <Button
                                className="btn-ct-light mt-4"
                                variant="light"
                                onClick={() => handleProType(item.id)}
                              >
                                Product type
                              </Button>
                            </div>
                          </td>
                          <td className="text-center">
                            <Button
                              className="btn-ct-light"
                              variant="light"
                              onClick={() => deleteItem(item.id)}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </div>

            <div className="d-flex justify-content-between">
              <div className="float-left"></div>
              <PaginationSection
                size={dataFill.pageable.pageSize}
                number={data.currentPage}
                totalElements={data.totalElements}
                handlePaging={handlePaging}
              />
              <div className="float-right">
                <Button
                  className="btn-ct-light"
                  variant="light"
                  onClick={handleCreate}
                >
                  Register
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </main>
  );
}
