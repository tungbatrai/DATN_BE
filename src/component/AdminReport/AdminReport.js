/** @format */

import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { render } from "react-dom";
// import Hello from './Hello';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  RadialBarChart,
  BarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
  Bar,
} from "recharts";
import { OrdersService } from "../../services/AdminOrder";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center",
};

export default function AdminOrderDetail(props) {
  const [isChangePage, setIsChangePage] = useState(false);
  const [data, setData] = useState([]);

  const [sWatting, setsWatting] = useState(0);
  const [sPaid, setsPaid] = useState(0);
  const [sConfirm, setsConfirm] = useState(0);
  const [sShipping, setsShipping] = useState(0);
  const [sCompleted, setsCompleted] = useState(0);
  const [total, setTotal] = useState(0);
  const [totalStatus, setTotalStatus] = useState(0);
  const [m1, setM1] = useState(0);
  const [m2, setM2] = useState(0);
  const [m3, setM3] = useState(0);
  const [m4, setM4] = useState(0);
  const [m5, setM5] = useState(0);
  const [m6, setM6] = useState(0);
  const [m7, setM7] = useState(0);
  const [m8, setM8] = useState(0);
  const [m9, setM9] = useState(0);
  const [m10, setM10] = useState(0);
  const [m11, setM11] = useState(0);
  const [m12, setM12] = useState(0);

  const [n1, setN1] = useState(0);
  const [n2, setN2] = useState(0);
  const [n3, setN3] = useState(0);
  const [n4, setN4] = useState(0);
  const [n5, setN5] = useState(0);
  const [n6, setN6] = useState(0);
  const [n7, setN7] = useState(0);
  const [n8, setN8] = useState(0);
  const [n9, setN9] = useState(0);
  const [n10, setN10] = useState(0);
  const [n11, setN11] = useState(0);
  const [n12, setN12] = useState(0);

  const [p1, setP1] = useState(0);
  const [p2, setP2] = useState(0);
  const [p3, setP3] = useState(0);
  const [p4, setP4] = useState(0);
  const [p5, setP5] = useState(0);
  const [p6, setP6] = useState(0);
  const [p7, setP7] = useState(0);
  const [p8, setP8] = useState(0);
  const [p9, setP9] = useState(0);
  const [p10, setP10] = useState(0);
  const [p11, setP11] = useState(0);
  const [p12, setP12] = useState(0);
  const [dataFill, setDataFill] = useState({
    pageable: {
      pageNumber: 1,
      pageSize: 100,
    },
    product: "",
    brand: "",
    user: "",
    category: "",
    startFillDate: "",
    endFillDate: "",
    status: "",
  });
  const fdata = [
    { name: "Month 1", quantity: m1, price: p1, number: n1 },
    { name: "Month 2", quantity: m2, price: p2, number: n2 },
    { name: "Month 3", quantity: m3, price: p3, number: n3 },
    { name: "Month 4", quantity: m4, price: p4, number: n4 },
    { name: "Month 5", quantity: m5, price: p5, number: n5 },
    { name: "Month 6", quantity: m6, price: p6, number: n6 },
    { name: "Month 7", quantity: m7, price: p7, number: n7 },
    { name: "Month 8", quantity: m8, price: p8, number: n8 },
    { name: "Month 9", quantity: m9, price: p9, number: n9 },
    { name: "Month 10", quantity: m10, price: p10, number: n10 },
    { name: "Month 11", quantity: m11, price: p11, number: n11 },
    { name: "Month 12", quantity: m12, price: p12, number: n12 },
  ];
  const data2 = [
    {
      name: "Waittng",
      quantity: sWatting,
    },
    {
      name: "Confirm",
      quantity: sPaid,
    },
    {
      name: "Paid",
      quantity: sConfirm,
    },
    {
      name: "Shipping",
      quantity: sShipping,
    },
    {
      name: "Completed",
      quantity: sCompleted,
    },
  ];
  useEffect(() => {
    getData();
  }, [isChangePage]);
  function getData() {
    OrdersService.getOrders(dataFill).then((res) => {
      if (res.status === 200) {
        console.log(res.data);
        setData(res.data);
        var mm1 = 0;
        var mm2 = 0;
        var mm3 = 0;
        var mm4 = 0;
        var mm5 = 0;
        var mm6 = 0;
        var mm7 = 0;
        var mm8 = 0;
        var mm9 = 0;
        var mm10 = 0;
        var mm11 = 0;
        var mm12 = 0;

        var nm1 = 0;
        var nm2 = 0;
        var nm3 = 0;
        var nm4 = 0;
        var nm5 = 0;
        var nm6 = 0;
        var nm7 = 0;
        var nm8 = 0;
        var nm9 = 0;
        var nm10 = 0;
        var nm11 = 0;
        var nm12 = 0;

        var pm1 = 0;
        var pm2 = 0;
        var pm3 = 0;
        var pm4 = 0;
        var pm5 = 0;
        var pm6 = 0;
        var pm7 = 0;
        var pm8 = 0;
        var pm9 = 0;
        var pm10 = 0;
        var pm11 = 0;
        var pm12 = 0;

        var sW = 0;
        var sC = 0;
        var sP = 0;
        var sS = 0;
        var SCd = 0;
        res.data.data.map((item) => {
          var lastFive = Number(item.time_order.substr(5, 2));
          if (item.status == "WAITING") {
            sW++;
          } else if (item.status == "CONFIRM") {
            sC++;
          } else if (item.status == "PAID") {
            sP++;
          } else if (item.status == "SHIPPING") {
            sS++;
          } else {
            SCd++;
          }
          switch (lastFive) {
            case 1:
              return (
                mm1++,
                (pm1 = pm1 + item.price * item.quantity),
                (nm1 = nm1 + item.quantity)
              );
            case 2:
              return (
                mm2++,
                (pm2 = pm2 + item.price * item.quantity),
                (nm2 = nm12 + item.quantity)
              );
            case 3:
              return (
                mm3++,
                (pm3 = pm3 + item.price * item.quantity),
                (nm3 = nm3 + item.quantity)
              );
            case 4:
              return (
                mm4++,
                (pm4 = pm4 + item.price * item.quantity),
                (nm4 = nm4 + item.quantity)
              );
            case 5:
              return (
                mm5++,
                (pm5 = pm5 + item.price * item.quantity),
                (nm5 = nm5 + item.quantity)
              );
            case 6:
              return (
                mm6++,
                (pm6 = pm6 + item.price * item.quantity),
                (nm6 = nm6 + item.quantity)
              );
            case 7:
              return (
                mm7++,
                (pm7 = pm7 + item.price * item.quantity),
                (nm7 = nm7 + item.quantity)
              );
            case 8:
              return (
                mm8++,
                (pm8 = pm8 + item.price * item.quantity),
                (nm8 = nm8 + item.quantity)
              );
            case 9:
              return (
                mm9++,
                (pm9 = pm9 + item.price * item.quantity),
                (nm9 = nm9 + item.quantity)
              );
            case 10:
              return (
                mm10++,
                (pm10 = pm10 + item.price * item.quantity),
                (nm10 = nm10 + item.quantity)
              );
            case 11:
              return (
                mm11++,
                (pm1 = pm11 + item.price * item.quantity),
                (nm11 = nm11 + item.quantity)
              );

            default:
              return (
                mm12++,
                (pm12 = pm12 + item.price * item.quantity),
                (nm12 = nm1 + item.quantity)
              );
          }
        });

        setM1(mm1);
        setM2(mm2);
        setM3(mm3);
        setM4(mm4);
        setM5(mm5);
        setM6(mm6);
        setM7(mm7);
        setM8(mm8);
        setM9(mm9);
        setM10(mm10);
        setM11(mm11);
        setM12(mm12);

        setN1(nm1);
        setN2(nm2);
        setN3(nm3);
        setN4(nm4);
        setN5(nm5);
        setN6(nm6);
        setN7(nm7);
        setN8(nm8);
        setN9(nm9);
        setN10(nm10);
        setN11(nm11);
        setN12(nm12);

        setP1(pm1 / 10000000);
        setP2(pm2 / 10000000);
        setP3(pm3 / 10000000);
        setP4(pm4 / 10000000);
        setP5(pm5 / 10000000);
        setP6(pm6 / 10000000);
        setP7(pm7 / 10000000);
        setP8(pm8 / 10000000);
        setP9(pm9 / 10000000);
        setP10(pm10 / 10000000);
        setP11(pm11 / 10000000);
        setP12(pm12 / 10000000);

        setTotal(
          pm1 +
            pm2 +
            pm3 +
            pm4 +
            pm5 +
            pm6 +
            pm7 +
            pm8 +
            pm9 +
            pm10 +
            pm11 +
            pm12
        );
        setsWatting(sW);
        setsConfirm(sC);
        setsPaid(sP);
        setsShipping(sS);
        setsCompleted(SCd);
        setTotalStatus(sW + sC + sP + sS + SCd);
      }
    });
    // setIsChangePage(!isChangePage);
  }
  const handleSelect = (e) => {
    console.log(e.target.value)
  }
  const formatPrice = (value) => {
    if (value && value > 0) {
      return value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
    }
  };
  return (
    <div style={styles}>
      {/* <Hello name="CodeSandbox for graph testing" /> */}

      <main>
        <div className="container-fluid">
          <div className="d-block d-xl-flex">
            <div className="tcol-25 tcol-lg-100 d-flex flex-column justify-content-between">
              <h4 className="font-weight-bold mt-5"> Report </h4>
            </div>
          </div>
          <h4 className="mt-5 ">
            <strong>Profit statistics chart in 1 year </strong>
          </h4>
          <div className="row">
            <div className="col-1"></div>
            <div className="col-2">
              <select
                class="form-select form-control border-radius4 border-black w-75"
                aria-label="Default select example"
                onChange={(value) => handleSelect(value)}
              >
                <option value="0">This year</option>
                {/* <option value="1">1 year ago</option>
                <option value="2">2 year ago</option>
                <option value="3">3 year ago</option> */}
              </select>
              <div className="text-left w-100 mt-3 ml-3">
               O Unit : price*10,000,000.00đ <br />
               O Total price : {formatPrice(total)}đ
              </div>
            </div>
          </div>

          <div className="mt-5 mb-5 d-flex justify-content-center">
            <LineChart
              width={1500}
              height={500}
              data={fdata}
              margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
              <Line type="monotone" dataKey="number" stroke="#8884d8" />
              <Line type="monotone" dataKey="price" stroke="#82ca9d" />
              <Line type="monotone" dataKey="quantity" stroke="#800000" />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <Bar dataKey="number" fill="#8884d8" barSize={30} />
              <XAxis dataKey="number" />
              <YAxis />
              <Tooltip />
              <Legend />
            </LineChart>
          </div>
          <h4>
            <strong>Order status chart in 1 year </strong>
          </h4>
          <div className="row">
            <div className="col-1"></div>
            <div className="col-2">
            
              <div className="text-left w-100 mt-3 ml-3">
              
               O Total orders : {totalStatus}
              </div>
            </div>
          </div>
          <div className="mt-5 mb-5 d-flex justify-content-center">
            <BarChart width={1500} height={500} data={data2}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="quantity" fill="#8884d8" />
            </BarChart>
          </div>
        </div>
      </main>
    </div>
  );
}
