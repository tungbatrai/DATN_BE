/** @format */

import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { SwalCommon } from "../../constants/SwalCommon";
import { ValidationText } from "../../constants/Validation";
import { AdminService } from "../../services/AdminService";
import ValidationError from "../common/ValidationError";
import { NavLink, useHistory } from "react-router-dom";
import bcrypt from "bcryptjs";
export default function AdminRegister(props) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
    setError,
  } = useForm();
  const history = useHistory();
  const [isCreateAction, setCreateAction] = useState(true);
  const [isReset, setReset] = useState(false);
  const [role, setRole] = useState("ADMIN");
  const [data, setData] = useState({
    id: props.match.params.id,
  });

  useEffect(() => {
    let { id } = props.match.params;
    if (id) {
      setCreateAction(false);
      getData();
    }
  }, [props.match.params.id]);

  function getData() {
    AdminService.adminDetail(props.match.params.id).then((res) => {
      if (res.status === 200) {
        console.log(res.data.data);
        setData(res.data);
        if(res.data.data.length >0 ) {
          setRole(res.data.data[0].role)
        }
       
      }
    });
  }

  function onSubmit(data) {
    if (data.password === data.confirmPassword) {
      if (isCreateAction) {
        const dataRegister = {
          name: data.name,
          phone: data.phone,
          email: data.email,
          role: "ADMIN",
          password: data.password,
        };

        AdminService.adminRegister(dataRegister).then((res) => {
          if (res.status === 200) {
            swal(SwalCommon.ALERT_SAVE_COMPLETE).then((value) => {
              history.push("/admin");
            });
          }
        });
      } else {
        const dataEdit = {
          name: data.detail.name,
          phone: data.detail.phone,
          email: data.detail.email,
          role: role,
          password: data.detail.password,
        };
        AdminService.adminEdit(dataEdit).then((res) => {
          if (res.status === 200) {
            swal(SwalCommon.ALERT_SAVE_COMPLETE).then((value) => {
              history.push("/admin")
            });
          }
        });
      }
    } else {
      swal(SwalCommon.ALERT_WARNING_CFPASS);
    }
  }

  return (
    <Container>
      {isCreateAction ? (
        <h2 className="mt-4">Register Admin</h2>
      ) : (
        <h2 className="mt-4">Edit Admin</h2>
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
                        placeholder="please input ID"
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
                    <td className="td203">Email</td>
                    <td>
                      <input
                        className="form-control txtInput"
                        placeholder="please input your Name"
                        maxLength={20}
                        {...register("email", {
                          required: true,
                        })}
                      />
                      <div className="text-left">
                        {errors.email && (
                          <ValidationError text={ValidationText.Null} />
                        )}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="td203">Mobile Number</td>
                    <td>
                      <input
                        type="number"
                        className="form-control txtInput"
                        placeholder="please input mobile number"
                        maxLength={20}
                        {...register("phone", {
                          required: true,
                        })}
                      />
                      <div className="text-left">
                        {errors.phone && (
                          <ValidationError text={ValidationText.Null} />
                        )}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="td203">Password</td>
                    <td>
                      <input
                        type="password"
                        className="form-control txtInput"
                        placeholder="please input your password"
                        maxLength={20}
                        {...register("password", {
                          required: true,
                        })}
                      />
                      <div className="text-left">
                        {errors.password && (
                          <ValidationError text={ValidationText.Null} />
                        )}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="td203">Confirm Password</td>
                    <td>
                      <input
                        type="password"
                        className="form-control txtInput"
                        placeholder="please confirm password"
                        maxLength={20}
                        {...register("confirmPassword", {
                          required: true,
                        })}
                      />
                      <div className="text-left">
                        {errors.confirmPassword && (
                          <ValidationError text={ValidationText.Null} />
                        )}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </>
            ) : (
              <>
                {" "}
                <tbody>
                  <tr>
                    <td className="td203">Name</td>
                    <td>
                      {data?.data?.length > 0 && (
                        <input
                          className="form-control txtInput"
                          placeholder="please input name"
                          maxLength={20}
                          defaultValue={data.data[0].name}
                          {...register("detail.name", {
                            // value: data.data[0].name,
                            required: true,
                          })}
                        />
                      )}

                      <div className="text-left">
                        {errors.name && (
                          <ValidationError text={ValidationText.Null} />
                        )}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="td203">Email</td>
                    <td>
                      {data?.data?.length > 0 && (
                        <>
                          <input
                            className="form-control txtInput"
                            placeholder="please input your Name"
                            maxLength={30}
                            defaultValue={data.data[0].email}
                            {...register("detail.email", {
                              value: data.name,
                              required: true,
                            })}
                          />
                        </>
                      )}

                      <div className="text-left">
                        {errors.email && (
                          <ValidationError text={ValidationText.Null} />
                        )}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="td203">Mobile Number</td>
                    <td>
                      {data?.data?.length > 0 && (
                        <input
                          type="number"
                          className="form-control txtInput"
                          placeholder="please input mobile number"
                          maxLength={20}
                          defaultValue={data.data[0].phone}
                          {...register("detail.phone", {
                            // value: data.phone,
                            required: true,
                          })}
                        />
                      )}
                      <div className="text-left">
                        {errors.phone && (
                          <ValidationError text={ValidationText.Null} />
                        )}
                      </div>
                    </td>
                  </tr>
                  {isReset && (
                    <tr>
                      <td className="td203">Password</td>
                      <td>
                        <input
                          type="password"
                          className="form-control txtInput"
                          placeholder="please input your password"
                          maxLength={20}
                          {...register("detail.password", {
                            // value: data.Password,
                            required: true,
                          })}
                        />

                        <div className="text-left">
                          {errors.password && (
                            <ValidationError text={ValidationText.Null} />
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                  {isReset && (
                    <tr>
                      <td className="td203">Confirm Password</td>
                      <td>
                        <input
                          type="password"
                          className="form-control txtInput"
                          placeholder="please confirm password"
                          maxLength={20}
                          defaultValue={data.confirmPassword}
                          {...register("detail.confirmPassword", {
                            required: true,
                          })}
                        />
                        <div className="text-left">
                          {errors.confirmPassword && (
                            <ValidationError text={ValidationText.Null} />
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </>
            )}
          </table>

          <Row className="justify-content-center mt-5">
            {!isCreateAction && !isReset && (
              <Col md="2">
                <Button
                  block
                  variant="secondary"
                  onClick={() => setReset(true)}
                >
                  Reset password
                </Button>
              </Col>
            )}

            <Col md="2">
              <Button
                block
                variant="secondary"
                onClick={() => history.push("/admin")}
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
