/** @format */

import { Button, Form, Modal, Table } from "react-bootstrap";
import React, { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router";
// import { SwalCommon } from "../../constants/SwalCommon";
// import swal from "sweetalert";
// import moment from "moment";
// import { trackPromise } from "react-promise-tracker";
import { useForm } from "react-hook-form";
import { AwsService } from "../../services/AwsService";
import swal from "sweetalert";
import { SwalCommon } from "../../constants/SwalCommon";
import { BannerService } from "../../services/BannerService";
export default function RegisterModal({ show, handleCloseModal }) {
  //   const [data, setData] = useState();
  //   let { id } = useParams();
  const [image, setImage] = useState();
  //   const history = useHistory();

  //   useEffect(() => {}, []);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
    setError,
  } = useForm();

  function onSubmit(data) {
    if (getValues(`name`) && image) {
      const dataSave = {
        name: getValues(`name`),
        logo: image,
      };
      BannerService.bannerRegister(dataSave).then((res) => {
        if (res.status === 200) {
          swal(SwalCommon.ALERT_SAVE_COMPLETE).then((value) => {
            window.location.reload(true);
          });
        } else {
          swal(SwalCommon.COMMON_FAILED);
        }
      });
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
        <Modal.Title>Brand Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-center mt-4">
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-3 mt-2">Name</div>
              <div className="col-9">
                <input
                  className="form-control txtInput w-100"
                  {...register(`name`, {
                  
                  })}
                />
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-3 mt-2">Logo</div>
              <div className="col-9">
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
                          input logo
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
