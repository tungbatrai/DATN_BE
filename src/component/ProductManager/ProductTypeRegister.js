/** @format */

import { Button, Form, Modal, Table } from "react-bootstrap";
import React, { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router";

import { useForm } from "react-hook-form";
import { AwsService } from "../../services/AwsService";
import swal from "sweetalert";
import { SwalCommon } from "../../constants/SwalCommon";
import { productService } from "../../services/productService";
export default function ProductTypeRegister({ id, show, handleCloseModal }) {
  const [image, setImage] = useState();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
    setError,
  } = useForm();

  function onSubmit(data) {
    if (image) {
      const dataSave = {
        image: image,
        price: getValues(`price`),
        quantity: getValues(`quantity`),
        color: getValues(`color`),
        type: getValues(`type`),
        color_code: getValues(`color_code`),
      };
      productService.productTypeCreate(dataSave, id).then((res) => {
        if (res.status === 200) {
          swal(SwalCommon.ALERT_SAVE_COMPLETE).then((value) => {
            window.location.reload(true);
          });
        } else {
          swal(SwalCommon.COMMON_FAILED);
        }
      });
    } else {
      swal(SwalCommon.ALERT_IMAGE_NULL);
    }
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

  return (
    <Modal show={show} onHide={handleCloseModal} size="lg" centered>
      <Modal.Header closeButton className="background-model">
        <Modal.Title>Register product type</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-center mt-4">
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <div className="row mt-4">
              <div className="col-4 mt-2">Price</div>
              <div className="col-8">
                <input
                  type="number"
                  className="form-control txtInput w-100"
                  {...register(`price`, {
                    required: true,
                  })}
                />
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-4 mt-2">Quantity</div>
              <div className="col-8">
                <input
                  type="number"
                  className="form-control txtInput w-100"
                  {...register(`quantity`, {
                    required: true,
                    maxLength: 10,
                  })}
                />
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-4 mt-2">Type</div>
              <div className="col-8">
                <input
                  className="form-control txtInput w-100"
                  {...register(`type`, {
                    required: true,
                    maxLength: 10,
                  })}
                />
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-4 mt-2"> Color</div>
              <div className="col-8">
                <input
                  className="form-control txtInput w-100"
                  {...register(`color`, {
                    required: true,
                    maxLength: 10,
                  })}
                />
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-4 mt-2">Color code</div>
              <div className="col-8">
                <input
                  className="form-control txtInput w-100"
                  {...register(`color_code`, {
                    required: true,
                    maxLength: 10,
                  })}
                />
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-4 mt-2">Image</div>
              <div className="col-8">
                <div className="">
                  <Form.File.Input
                    hidden={true}
                    id={`mainPhoto`}
                    onChange={(e) => handleUpPhoto(e)}
                    accept=".png, .jpg, .jpeg"
                  />
                  <div className="" required>
                    <div className="row">
                      <div className="col-8">
                        <img src={image} className="img-css" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col mt-3">
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
              </div>
            </div>
            <div className="row mt-4 mb-3">
              <div className="col-6"></div>
              <div className="col-6 d-flex justify-content-end align-items-center">
                <Button
                  className="px-4 mx-3 btn-ct-light text-dark"
                  variant="light"
                  onClick={handleCloseModal}
                >
                  Close
                </Button>
                <Button
                  className="px-4 mx-3 btn-ct-light text-dark"
                  variant="light"
                  type="submit"
                >
                  Save
                </Button>
              </div>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}
