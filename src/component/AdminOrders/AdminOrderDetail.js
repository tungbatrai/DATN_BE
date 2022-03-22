/** @format */

import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { SwalCommon } from "../../constants/SwalCommon";
import { ValidationText } from "../../constants/Validation";
import { AdminService } from "../../services/AdminService";
import ValidationError from "../common/ValidationError";
import { NavLink, useHistory } from "react-router-dom";
import { OrdersService } from "../../services/AdminOrder";
import DateTime from "../common/DateTime";
export default function AdminOrderDetail(props) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
    setError,
  } = useForm();
  const history = useHistory();
  const [data, setData] = useState([]);
  const [product, setProduct] = useState([]);
  const id = props.match.params.id;

  useEffect(() => {
    getData(id);
  }, []);

  function getData() {
    OrdersService.OrdersDetail(id).then((res) => {
      if (res.status === 200) {
        setData(res.data.data[0]);
      }
    });
  }

  function onSubmit(data) {
    // const dataEdit = {
    //   name: data.detail.name,
    //   phone: data.detail.phone,
    //   email: data.detail.email,
    //   role: "ADMIN",
    //   password: data.detail.password,
    // };
    // AdminService.adminEdit(dataEdit).then((res) => {
    //   if (res.status === 200) {
    //     swal(SwalCommon.ALERT_SAVE_COMPLETE).then((value) => {
    //       history.push("/admin")
    //     });
    //   }
    // });
  }

  return (
    <Container>
      <h2 className="mt-4">Edit Order</h2>

      <div className="mt-5">
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <table className="table table-bordered">
            <>
              {" "}
              <tbody>
                <tr>
                  <td className="td203">Ship code</td>
                  <td>
                    <div className="text-left pl-3">{data?.ship_code}</div>
                    <div className="text-left"></div>
                  </td>
                </tr>
                <tr>
                  <td className="td203">time order</td>
                  <td>
                    <div className="text-left pl-3">
                      {" "}
                      <DateTime
                        format=""
                        type="datetime"
                        date={data?.time_order}
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="td203">status</td>
                  <td>
                    <div className="text-left pl-3">{data?.status}</div>
                  </td>
                </tr>
                <tr>
                  <td className="td203">Address</td>
                  <td>
                    <div className="text-left pl-3">{data?.address}</div>
                  </td>
                </tr>
              </tbody>
            </>
          </table>
          <Table bordered>
            <thead>
              <tr>
                <th>Điện thoại - APPLE </th>
                <th>Color</th>
                <th>Image</th>
                <th>Price</th>

                <th>Type</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              <td> Iphone 12</td>
              <td>{data?.color}</td>

              <td>
                {" "}
                <img src={data?.image} className="img-css" />
              </td>
              <td>{data?.price}</td>
              <td>{data?.type}</td>
              <td>{data?.quantity}</td>
            </tbody>
          </Table>
        </form>
      </div>
    </Container>
  );
}
