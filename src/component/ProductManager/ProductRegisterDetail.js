/** @format */

import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { SwalCommon } from "../../constants/SwalCommon";
import { ValidationText } from "../../constants/Validation";
import { AdminService } from "../../services/AdminService";
import ValidationError from "../common/ValidationError";
import { NavLink, useHistory } from "react-router-dom";
import { AwsService } from "../../services/AwsService";
import { CategoryService } from "../../services/CategoryService";
import { productService } from "../../services/productService";
export default function ProductRegisterDetail(props) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
    setError,
  } = useForm();
  const [image, setImage] = useState();
  const history = useHistory();
  const [isCreateAction, setCreateAction] = useState(true);
  const [data, setData] = useState({});
  const { id } = props.match.params;
  const [categoryData, setCategoryData] = useState([]);
  const [brandData, setBrandData] = useState([]);

  const [categorySelect, setCategorySelect] = useState([]);
  const [brandSelect, setBrandSelect] = useState([]);
  useEffect(() => {
    if (id) {
      setCreateAction(false);
    }
  }, [props.match.params.id]);

  useEffect(() => {
    getCategory();
  }, []);
  function getCategory() {
    productService.getCategoryMenu().then((response) => {
      if (response.status === 200) {
        setCategoryData(response.data.data);
        getBrand();
      }
    });
  }
  function getBrand() {
    productService.getBrandMenu().then((response) => {
      if (response.status === 200) {
        setBrandData(response.data.data);
        if (id) {
          setCreateAction(false);
          getData();
        }
      }
    });
  }
  function getData() {
    productService.productDetail(props.match.params.id).then((res) => {
      if (res.status === 200) {

        setData(res.data.data[0]);
        setImage(res.data.data[0].image);
        setValue(`detail_name`, res.data.data[0].name);
        setValue(`detail_digital`, res.data.data[0].digital_detail);
        setValue(`detail_description`, res.data.data[0].description);
        setValue(`detail_brand_id`, res.data.data[0].brand_id);
        setValue(`detail_cate_id`, res.data.data[0].cate_id);
        document.getElementById("detail_category").value =
          res.data.data[0].cate_id;

        document.getElementById("detail_brand").value =
          res.data.data[0].brand_id;
      }
    });
  }

  function onSubmit(data) {
    if (image) {
      if (isCreateAction) {
        if (data.cate_id && data.brand_id) {
          const dataRegister = {
            name: data.name,
            image: image,
            cate_id: data.cate_id,
            brand_id: data.brand_id,
            digital_detail: data.digital_detail,
            description: data.description,
          };
          productService.productRegister(dataRegister).then((res) => {
            if (res.status === 200) {
              swal(SwalCommon.ALERT_SAVE_COMPLETE).then((value) => {
                history.push("/product/product");
              });
            }
          });
        } else {
          swal(SwalCommon.ALERT_WARNING_SELECT);
        }
      } else {
        if (data.detail_cate_id && data.detail_brand_id) {
          const dataDetail = {
            name: data.detail_name,
            image: image,
            cate_id: data.detail_cate_id,
            brand_id: data.detail_brand_id,
            digital_detail: data.detail_digital,
            description: data.detail_description,
          };
          productService.productUpdate(dataDetail, id).then((res) => {
            if (res.status === 200) {
              swal(SwalCommon.ALERT_SAVE_COMPLETE).then((value) => {
                 history.push("/product/product");
              });
            }
          });
        } else {
          swal(SwalCommon.ALERT_WARNING_SELECT);
        }
      }
    } else {
      swal(SwalCommon.ALERT_IMAGE_NULL);
    }
  }

  function handleSelectCategory(e) {
    setCategorySelect(e);
  }
  function handleSelectBrand(e) {
    setBrandSelect(e)
  }
  function handleMainPhotoInput() {
    document.getElementById(`mainPhoto`).click();
  }

  function handleUpPhoto(e) {
    var { files, id } = e.target;

    if (files && files.length > 0) {
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
  return (
    <Container>
      {isCreateAction ? (
        <h2 className="mt-4">Register product</h2>
      ) : (
        <h2 className="mt-4">Edit product</h2>
      )}
      <div className="mt-5">
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <table className="table table-bordered">
            {isCreateAction ? (
              <>
                {" "}
                <tbody>
                  <tr>
                    <td className="td203">Name</td>
                    <td>
                      <input
                        className="form-control txtInput"
                        placeholder="please input name"
                        maxLength={20}
                        {...register("name", {
                          required: true,
                        })}
                      />
                      <div className="text-left">
                        {errors.name && (
                          <ValidationError text={ValidationText.Null} />
                        )}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="td203">Image </td>
                    <td>
                      <div className="">
                        <Form.File.Input
                          hidden={true}
                          id={`mainPhoto`}
                          onChange={(e) => handleUpPhoto(e)}
                          accept=".png, .jpg, .jpeg"
                        />
                        <div className="" required>
                          <div className="row d-flex justify-content-start">
                            <div className=" ml-3">
                              <img src={image} className="img-css" />
                            </div>
                          </div>
                          <div className="row">
                            <div className="ml-5 mt-3">
                              <Button
                                className="btn-ct-light text-dark"
                                variant="light"
                                id="button"
                                onClick={() => handleMainPhotoInput()}
                              >
                                Import image
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="td203">Category</td>
                    <td>
                      <select
                        className="form-control w-25 mx-1 text-center"
                        id="category"
                        {...register(`cate_id`, {})}
                        onChange={(e) => handleSelectCategory(e.target.value)}
                      >
                        <option value="">Select </option>
                        {categoryData &&
                          categoryData.length > 0 &&
                          categoryData.map((item, index) => {
                            return (
                              <option key={index} value={item.id}>
                                {item.name}
                              </option>
                            );
                          })}
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td className="td203">brand</td>
                    <td>
                      <select
                        className="form-control w-25 mx-1 text-center"
                        id="category"
                        {...register(`brand_id`, {})}
                        onChange={(e) => handleSelectBrand(e.target.value)}
                      >
                        <option value="">Select </option>
                        {brandData &&
                          brandData.length > 0 &&
                          brandData.map((item, index) => {
                            return (
                              <option key={index} value={item.id}>
                                {item.name}
                              </option>
                            );
                          })}
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td className="td203">Digital detail</td>
                    <td>
                      <Form.Control
                        as="textarea"
                        placeholder="Digital input "
                        style={{ height: "100px" }}
                        // maxLength={1000}
                        {...register("digital_detail", {
                          required: true,
                        })}
                      />

                      <div className="text-left">
                        {errors.digital_detail && (
                          <ValidationError text={ValidationText.Null} />
                        )}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="td203">description</td>
                    <td>
                      <Form.Control
                        as="textarea"
                        placeholder="description input "
                        style={{ height: "100px" }}
                        // maxLength={1000}
                        {...register("description", {
                          required: true,
                        })}
                      />

                      <div className="text-left">
                        {errors.description && (
                          <ValidationError text={ValidationText.Null} />
                        )}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </>
            ) : (
              <>
                <tbody>
                  <tr>
                    <td className="td203">Name </td>
                    <td>
                      <input
                        className="form-control txtInput"
                        defaultValue={data.name}
                        placeholder="name input "
                        maxLength={20}
                        {...register("detail_name", {})}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="td203">Image </td>
                    <td>
                      <div className="">
                        <Form.File.Input
                          hidden={true}
                          id={`mainPhoto`}
                          onChange={(e) => handleUpPhoto(e)}
                          accept=".png, .jpg, .jpeg"
                        />
                        <div className="" required>
                          <div className="row d-flex justify-content-start">
                            <div className=" ml-3">
                              <img src={image} className="img-css" />
                            </div>
                          </div>
                          <div className="row">
                            <div className="ml-5 mt-3">
                              <Button
                                className="btn-ct-light text-dark"
                                variant="light"
                                id="button"
                                onClick={() => handleMainPhotoInput()}
                              >
                                 Import image
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="td203">Category</td>
                    <td>
                      <select
                        className="form-control w-25 mx-1 text-center"
                        id="detail_category"
                        {...register(`detail_cate_id`, {
                          value: data.cate_id,
                        })}
                        onChange={(e) => handleSelectCategory(e.target.value)}
                      >
                        <option value="">Select </option>
                        {categoryData &&
                          categoryData.length > 0 &&
                          categoryData.map((item, index) => {
                            return (
                              <option key={index} value={item.id}>
                                {item.name}
                              </option>
                            );
                          })}
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td className="td203">brand</td>
                    <td>
                      <select
                        className="form-control w-25 mx-1 text-center"
                        id="detail_brand"
                        {...register(`detail_brand_id`, {})}
                        onChange={(e) => handleSelectBrand(e.target.value)}
                      >
                        <option value="">Select </option>
                        {brandData &&
                          brandData.length > 0 &&
                          brandData.map((item, index) => {
                            return (
                              <option key={index} value={item.id}>
                                {item.name}
                              </option>
                            );
                          })}
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td className="td203">Digital detail</td>
                    <td>
                      <Form.Control
                        as="textarea"
                        placeholder="Digital input "
                        style={{ height: "100px" }}
                        // maxLength={1000}
                        defaultValue={data.digital_detail}
                        {...register("detail_digital", {})}
                      />

                      <div className="text-left"></div>
                    </td>
                  </tr>
                  <tr>
                    <td className="td203">description</td>
                    <td>
                      <Form.Control
                        as="textarea"
                        placeholder="description input "
                        style={{ height: "100px" }}
                        // maxLength={1000}
                        defaultValue={data.description}
                        {...register("detail_description", {})}
                      />
                    </td>
                  </tr>
                </tbody>
              </>
            )}
          </table>

          <Row className="justify-content-center mt-5">
            <Col md="2">
              <Button
                block
                variant="secondary"
                onClick={() => history.push("/product")}
              >
                Cancel
              </Button>
            </Col>
            <Col md="2">
              <Button block variant="primary" type="submit">
                Save
              </Button>
            </Col>
          </Row>
        </form>
      </div>
    </Container>
  );
}
