/** @format */

import { Button, Form, Table } from "react-bootstrap";
import PaginationSection from "../common/PaginationSection";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { SwalCommon } from "../../constants/SwalCommon";
import { CategoryService } from "../../services/CategoryService";
import { NavLink, useHistory } from "react-router-dom";
import { AwsService } from "../../services/AwsService";
import { useForm } from "react-hook-form";
import RegisterModal from "./RegisterModal";

const initialSelect = new Array(10).fill(false);

export default function CategoryManager() {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [image, setImage] = useState();
  const [dataFill, setDataFill] = useState({
    pageable: {
      pageNumber: 1,
      pageSize: 10,
    },
    name: "",
  });
  const [showModal, setShowModal] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
    setError,
  } = useForm();
  const [selected, setSelected] = useState(initialSelect);
  const [selectAllCheckBox, setSelectAllCheckBox] = useState(false);

  function handleSelected(index) {
    setSelected(
      selected.map((item, idx) => {
        if (item) {
          setSelectAllCheckBox(false);
        }
        return idx === index ? !item : item;
      })
    );
  }

  function handleSelectAll(e) {
    const checked = e.target.checked;
    setSelectAllCheckBox(checked);
    if (checked) {
      setSelected(data.data.map(() => true));
    } else {
      setSelected(data.data.map(() => false));
    }
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
    seteditItem();
    setImage();
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
    CategoryService.getList(dataFill).then((response) => {
      if (response.status === 200) {
        setData(response.data);
      }
    });
  }

  function deleteData(id) {
    swal(SwalCommon.ALERT_DELETE_ALL).then((willDelete) => {
      if (willDelete) {
        // swal(SwalCommon.COMING_SOON);
        CategoryService.deleteItem(id)
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
    setShowModal(true);
  }
  const [editItem, seteditItem] = useState();
  function handleEdit(id, index, image, name) {
    seteditItem(index);
    setImage(image);
    setValue(`data.${index}.name`, name);
  }

  function handleSave(data, index) {
    let IdUpdate = data.id;
    const dataSave = {
      name: getValues(`data.${index}.name`),
      image: image,
    };
    CategoryService.categoryUpdate(IdUpdate, dataSave).then((res) => {
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
            AwsService.getLink(files[0]).then((res) => {
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
        <div className="d-block d-xl-flex" style={{ height: "150px" }}>
          <div className="tcol-50 tcol-lg-100 d-flex flex-column justify-content-between">
            <h4 className="font-weight-bold mt-5">Category list</h4>
            <div className="font-size12">
              Total &nbsp;<span>{data.totalElements}</span>&nbsp;case
            </div>
          </div>
          <div className="tcol-50 tcol-lg-100">
            <div className="category">
              <div
                className="w-50  d-flex justify-content-center flex-column"
                style={{ height: "126px" }}
              >
                <div className="row mx-0">
                  <div className="col-1"></div>
                  <div className="col-10">
                    <div className="row">
                      <div className="col-3 px-1 font-size11 align-self-center text-center">
                        Name
                      </div>
                      <div className="col-9 px-1 d-flex">
                        <div class="d-flex bd-highlight mb-3">
                          <div class="pt-3 bd-highlight">
                            <input
                              type="text"
                              className="form-control border-black "
                              id="name"
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
                    <th>Image</th>
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
                          <td className="text-center">
                            {data.totalElements -
                              (index +
                                dataFill.pageable.pageSize *
                                  (data.currentPage - 1))}
                          </td>
                          <td>
                            {editItem == index ? (
                              <>
                                <input
                                  className="form-control mt-5"
                                  defaultValue={item.name}
                                  onChange={(e) => {
                                    setValue(
                                      `data.${index}.name`,
                                      e.target.value
                                    );
                                  }}
                                />
                              </>
                            ) : (
                              <div className="mt-5">{item.name} </div>
                            )}
                          </td>
                          <td className="text-left tcol-40">
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
                                          style={{ marginRight: "1em" }}
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
                                            input image
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
                          <td className="text-center">
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
                                  onClick={() =>
                                    handleEdit(
                                      item.id,
                                      index,
                                      item.image,
                                      item.name
                                    )
                                  }
                                >
                                  Detail
                                </Button>
                              </>
                            )}
                          </td>
                          <td>
                            <Button
                              className="btn-ct-light mt-5"
                              variant="light"
                              onClick={() => deleteData(item.id)}
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
          <RegisterModal
            show={showModal}
            handleCloseModal={() => setShowModal(false)}
          ></RegisterModal>
        </div>
      </div>
    </main>
  );
}
