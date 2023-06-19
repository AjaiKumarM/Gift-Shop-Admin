import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavTogglerChangeMenu, ordersMenuChane } from "../../slice/Navbarslice";
import { OrderDetailsAction } from "../../Actions/OrdersActions";
import Loader from "../layouts/Loader";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import MetaData from "../layouts/MetaData";

export default function OrdersSection() {
  const { navToogle } = useSelector((state) => state.NavbarState);
  const {
    loading,
    totalOrders,
    penOrders,
    newOrders,
    delOrders,
    penOrdersList = [],
  } = useSelector((state) => state.OrderState);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ordersMenuChane());
    dispatch(OrderDetailsAction);
  }, [dispatch]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Orders"} />
          <div className="d-sc-flex">
            <div className="left-gap"></div>
            <div className="right-content overflow-v mt-5 mx-md-5 mx-lg-0 h-100">
              <div>
                <nav aria-label="breadcrumbs ">
                  <ol className="breadcrumb sc-bread-con mx-3 font-small">
                    <li className="breadcrumb-item sc-bread">Pages</li>
                    <li
                      className="breadcrumb-item active sc-bread-active"
                      aria-current="page"
                    >
                      Orders
                    </li>
                  </ol>
                </nav>
                <div className="dashboarrd-head mx-3">
                  <h3 className="text-light ">Orders</h3>
                  <div
                    onClick={() =>
                      navToogle
                        ? dispatch(NavTogglerChangeMenu(false))
                        : dispatch(NavTogglerChangeMenu(true))
                    }
                    className={`navbars-toggle d-flex d-lg-none ${
                      navToogle ? "active-tog" : ""
                    }`}
                  >
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
                <div className="dashboard-card-con mx-2 mx-md-2 mx-lg-4 row justify-content-around">
                  <div className="dashboard-card col-11 col-sm-5 ">
                    <div className="dashboard-content">
                      <h5 className="text-blue">New Orders</h5>
                      <p className="text-muted font-small">
                        last <span className="text-success">+24 hours</span>
                      </p>
                      <span>{newOrders}</span>
                    </div>
                    <div className="dashboard-icon gra-yellow">
                      <img
                        src="/images/order/order-delivery.png"
                        alt="pending-task"
                      />
                    </div>
                  </div>
                  <div className="dashboard-card col-11 col-sm-5">
                    <div className="dashboard-content">
                      <h5 className="text-blue">Pending orders</h5>
                      <span className="mt-3">{penOrders}</span>
                    </div>
                    <div className="dashboard-icon gra-red">
                      <img src="/images/order/box.png" alt="pending-task" />
                    </div>
                  </div>
                  <div className="dashboard-card col-11 col-sm-5">
                    <div className="dashboard-content">
                      <h5 className="text-blue">Deliverd Orders</h5>
                      <span>{delOrders}</span>
                    </div>
                    <div className="dashboard-icon gra-green">
                      <img src="/images/order/cargo.png" alt="custommers" />
                    </div>
                  </div>
                  <div className="dashboard-card col-11 col-sm-5">
                    <div className="dashboard-content">
                      <h5 className="text-blue">Total orders</h5>
                      <span>{totalOrders}</span>
                    </div>
                    <div className="dashboard-icon gra-purple">
                      <img src="/images/order/boxes.png" alt="total earnings" />
                    </div>
                  </div>
                </div>
                <div className="mt-5 mb-4 ms-2">
                  {penOrdersList.length > 0 ? (
                    <Fragment>
                      <div className="recent-head">
                        <h5 className="fw-bold">Pending Orders</h5>
                      </div>
                      <div className="sc-card">
                        <div className="sc-table">
                          <table>
                            <thead className="table-head">
                              <tr>
                                <th>Product</th>
                                <th>Tracking ID</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              {penOrdersList.map((order) => (
                                <tr key={order._id}>
                                  <td>{`${String(
                                    order.orderItems[0].name
                                  ).substring(0, 25)}...`}</td>
                                  <td>{`OD${String(order._id).substring(
                                    0,
                                    10
                                  )}`}</td>
                                  <td>
                                    {dateFormat(
                                      order.createdAt,
                                      "dd mmmm yyyy"
                                    )}
                                  </td>
                                  <td
                                    className={`${
                                      order.orderStatus === "Delivered"
                                        ? "table-status-green"
                                        : "table-status-yellow"
                                    }`}
                                  >
                                    <span>{order.orderStatus}</span>
                                  </td>
                                  <td>
                                    <Link
                                      to={`/admin/order/details/${order._id}`}
                                    >
                                      details
                                    </Link>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </Fragment>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
