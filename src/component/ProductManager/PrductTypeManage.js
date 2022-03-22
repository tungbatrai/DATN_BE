/** @format */

import { Button, Form, Table } from "react-bootstrap";
import PaginationSection from "../common/PaginationSection";
import { NavLink, useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { SwalCommon } from "../../constants/SwalCommon";
import { OrdersService } from "../../services/AdminOrder";
import { productService } from "../../services/productService";
import { AwsService } from "../../services/AwsService";
import { useForm } from "react-hook-form";
import ProductTypeRegister from "./ProductTypeRegister";
export default function ProductManager(props) {
  const history = useHistory();
  const [data, setData] = useState([]);
  const { id } = props.match.params;
  const [editItem, seteditItem] = useState();
  const [image, setImage] = useState();
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    getData();
  }, []);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
    setError,
  } = useForm();
  function getData() {
    productService.listProductType(id).then((response) => {
      if (response.status === 200) {
        setData(response.data.data);
      }
    });
  }
  function deleteItem(id) {
    swal(SwalCommon.ALERT_DELETE_ALL).then((willDelete) => {
      if (willDelete) {
        console.log(id);
         swal(SwalCommon.COMING_SOON);
        // productService
        //   .deleteProduct(id)
        //   .then((response) => {
        //     if (response.status === 200) {
        //       swal(SwalCommon.ALERT_DELETE_COMPLETE).then(() => {
        //         getData();
        //       });
        //     } else {
        //       alert("Delete fail !");
        //     }
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });
      }
    });
  }
  function handleCreate() {
    setShowModal(true);
  }

  function handleEdit(id, index, item) {
    seteditItem(index);
    setImage(item.image);
    setValue(`data.${index}.color`, item.color);
    setValue(`data.${index}.color_code`, item.color_code);
    setValue(`data.${index}.price`, item.price);
    setValue(`data.${index}.quantity`, item.quantity);
    setValue(`data.${index}.type`, item.type);
  }

  function handleSave(data, index) {
    let IdUpdate = data.id;
    let proIdUpdate = data.product_id;
    const dataSave = {
      color: getValues(`data.${index}.color`),
      color_code: getValues(`data.${index}.color_code`),
      price: getValues(`data.${index}.price`),
      quantity: getValues(`data.${index}.quantity`),
      type: getValues(`data.${index}.type`),
      image: image,
    };
    console.log(dataSave, proIdUpdate, IdUpdate);
    productService
      .productTypeUpdate(dataSave, proIdUpdate, IdUpdate)
      .then((res) => {
        if (res.status === 200) {
          swal(SwalCommon.ALERT_SAVE_COMPLETE).then((value) => {
            window.location.reload(true);
          });
        } else {
          swal(SwalCommon.COMMON_FAILED);
        }
      });
  }

  function handleMainPhotoInput(idx) {
    document.getElementById(`mainPhoto${idx}`).click();
  }

  function handleUpPhoto(e, idx) {
    var { files, id } = e.target;
    if (files && files.length > 0) {
      if (id === `mainPhoto${idx}`) {
        if (
          files[0].type === "image/jpg" ||
          files[0].type === "image/png" ||
          files[0].type === "image/jpeg"
        ) {
          if (files[0].size <= 5242880) {
            AwsService.getLinkProduct(files[0]).then((res) => {
              if (res.status === 200) {
                setImage(res.data.url);
              }
            });
          } else {
            swal(SwalCommon.ALERT_CHECK_IMAGE);
          }
        } else {
          swal(SwalCommon.ALERT_CHECK_IMAGE);
        }
      }
    }
  }

  function handleCancel() {
    seteditItem();
    setImage();
  }
  return (
    <main>
      <div className="container-fluid">
        <div className="d-block d-xl-flex">
          <div className="tcol-25 tcol-lg-100 d-flex flex-column justify-content-between">
            <h4 className="font-weight-bold mt-2">Product type list</h4>
            <div className="font-size12 mt-5">
              Total &nbsp;<span>{data.totalElements}</span>&nbsp;case
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
                    <th>Product id</th>
                    <th>Image</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Type</th>
                    <th>Color</th>
                    <th>color code</th>
                    <th>Detail</th>
                    {/* <th>Delete</th> */}
                  </tr>
                </thead>
                <tbody>
                  {data?.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <div className="mt-5">{data.length - index}</div>
                        </td>
                        <td>
                          <div className="mt-5">{item.product_id}</div>
                        </td>
                        <td>
                          {" "}
                          {editItem == index ? (
                            <>
                              <div className="">
                                <Form.File.Input
                                  hidden={true}
                                  id={`mainPhoto${index}`}
                                  onChange={(e) => handleUpPhoto(e, index)}
                                  accept=".png, .jpg, .jpeg"
                                />
                                <div className="" required>
                                  <div className="row">
                                    <div className="col-8">
                                      <img src={image} className="img-css" />
                                    </div>
                                    <div className="col-4">
                                      <div
                                        // style={{ marginRight: "1em" }}
                                        className="ml-4"
                                      >
                                        <Button
                                          className="btn-ct-light text-dark"
                                          variant="light"
                                          id="button"
                                          onClick={() =>
                                            handleMainPhotoInput(index)
                                          }
                                        >
                                          import image
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              <img src={item.image} className="img-css" />
                            </>
                          )}
                        </td>

                        <td style={{ width: "9%" }}>
                          {editItem == index ? (
                            <>
                              <input
                                className="form-control mt-5"
                                defaultValue={item.price}
                                onChange={(e) => {
                                  setValue(
                                    `data.${index}.price`,
                                    e.target.value
                                  );
                                }}
                              />
                            </>
                          ) : (
                            <div className="mt-5">{item.price} </div>
                          )}
                        </td>
                        <td style={{ width: "7%" }}>
                          {editItem == index ? (
                            <>
                              <input
                                className="form-control mt-5"
                                defaultValue={item.quantity}
                                onChange={(e) => {
                                  setValue(
                                    `data.${index}.quantity`,
                                    e.target.value
                                  );
                                }}
                              />
                            </>
                          ) : (
                            <div className="mt-5">{item.quantity} </div>
                          )}
                        </td>
                        <td style={{ width: "7%" }}>
                          {editItem == index ? (
                            <>
                              <input
                                className="form-control mt-5"
                                defaultValue={item.type}
                                onChange={(e) => {
                                  setValue(
                                    `data.${index}.type`,
                                    e.target.value
                                  );
                                }}
                              />
                            </>
                          ) : (
                            <div className="mt-5">{item.type} </div>
                          )}
                        </td>
                        <td style={{ width: "7%" }}>
                          {" "}
                          {editItem == index ? (
                            <>
                              <input
                                className="form-control mt-5"
                                defaultValue={item.color}
                                onChange={(e) => {
                                  setValue(
                                    `data.${index}.color`,
                                    e.target.value
                                  );
                                }}
                              />
                            </>
                          ) : (
                            <div className="mt-5">{item.color} </div>
                          )}
                        </td>
                        <td style={{ width: "7%" }}>
                          {editItem == index ? (
                            <>
                              <input
                                className="form-control mt-5 "
                                defaultValue={item.color_code}
                                onChange={(e) => {
                                  setValue(
                                    `data.${index}.color_code`,
                                    e.target.value
                                  );
                                }}
                              />
                            </>
                          ) : (
                            <div className="mt-5">{item.color_code} </div>
                          )}
                        </td>
                        <td className="text-center" style={{ width: "10%" }}>
                          {editItem == index ? (
                            <>
                              <div className="row   d-flex justify-content-center">
                                <Button
                                  className="btn-ct-light"
                                  variant="light"
                                  onClick={() => handleSave(item, index)}
                                >
                                  Save
                                </Button>
                              </div>
                              <div className="row   d-flex justify-content-center mt-5">
                                <Button
                                  className="btn-ct-light"
                                  variant="light"
                                  onClick={() => handleCancel()}
                                >
                                  Cancel
                                </Button>
                              </div>
                            </>
                          ) : (
                            <>
                              <Button
                                className="btn-ct-light mt-5"
                                variant="light"
                                onClick={() => handleEdit(item.id, index, item)}
                              >
                                Detail
                              </Button>
                            </>
                          )}
                        </td>
                        {/* <td className="text-center ">
                          <Button
                            className="btn-ct-light mt-5"
                            variant="light"
                            onClick={() => deleteItem(item.id)}
                          >
                            Delete
                          </Button>
                        </td> */}
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>

            <div className="d-flex justify-content-between">
              <div className="float-left"></div>

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
        <ProductTypeRegister
          id={id}
          show={showModal}
          handleCloseModal={() => setShowModal(false)}
        ></ProductTypeRegister>
      </div>
    </main>
  );
}
