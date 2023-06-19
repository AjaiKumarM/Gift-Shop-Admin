import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DashBoardChange, NavTogglerChangeMenu } from "../../slice/Navbarslice";
import { Link } from "react-router-dom";
import { DashboardAction } from "../../Actions/DashBoardAction";
import dateFormat from "dateformat";
import Loader from "../layouts/Loader";
import MetaData from "../layouts/MetaData";

export default function DashboardSection() {
  const { navToogle } = useSelector((state) => state.NavbarState);
  const {
    penOrder,
    outStock,
    order = [],
    user,
    loading,
    totalEarnings
  } = useSelector((state) => state.DashState);


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(DashBoardChange());
    dispatch(DashboardAction);
  }, [dispatch]);

  return (
    <Fragment>
        <MetaData title={'Dashboard'} />
        {loading ? (<Loader/>):(
                  <div className="d-sc-flex">
                  <div className="left-gap"></div>
                  <div className="dashboard right-content mt-5 mx-md-5 mx-lg-0">
                    <div>
                      <nav aria-label="breadcrumbs ">
                        <ol className="breadcrumb sc-bread-con mx-3 font-small">
                          <li className="breadcrumb-item sc-bread">Pages</li>
                          <li
                            className="breadcrumb-item active sc-bread-active"
                            aria-current="page"
                          >
                            Dashboard
                          </li>
                        </ol>
                      </nav>
                      <div className="dashboarrd-head mx-3">
                        <h3 className="text-light ">Dashboard</h3>
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
                            <h5 className="text-blue">Orders</h5>
                            <p className="text-muted">Pending orders</p>
                            <span>{penOrder}</span>
                          </div>
                          <div className="dashboard-icon gra-purple">
                            <img
                              src="/images/icons/pending-tasks.png"
                              alt="pending-task"
                            />
                          </div>
                        </div>
                        <div className="dashboard-card col-11 col-sm-5">
                          <div className="dashboard-content">
                            <h5 className="text-blue">Products</h5>
                            <p className="text-muted">Out of stock</p>
                            <span>{outStock}</span>
                          </div>
                          <div className="dashboard-icon gra-red">
                            <img src="/images/icons/product.png" alt="pending-task" />
                          </div>
                        </div>
                        <div className="dashboard-card col-11 col-sm-5">
                          <div className="dashboard-content">
                            <h5 className="text-blue">Customers</h5>
                            <p className="text-muted">Total users</p>
                            <span>{user}</span>
                          </div>
                          <div className="dashboard-icon gra-green">
                            <img src="/images/icons/group.png" alt="custommers" />
                          </div>
                        </div>
                        <div className="dashboard-card col-11 col-sm-5">
                          <div className="dashboard-content">
                            <h5 className="text-blue">Earnings</h5>
                            <p className="text-muted">total sales</p>
                            <span>${totalEarnings}</span>
                          </div>
                          <div className="dashboard-icon gra-yellow">
                            <img src="/images/icons/invoice.png" alt="total earnings" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 mb-4 ms-2">
                      <div className="recent-head">
                        <h5 className="fw-bold">Recent Orders</h5>
                      </div>
                      {order.length > 0 ? (
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
                                {order.map((ord) => (
                                  <tr key={ord._id}>
                                    <td>{`${String(ord.orderItems[0].name).substring(0,25)}...`}</td>
                                    <td>{`OD${String(ord._id).substring(0,10)}`}</td>
                                    <td>{dateFormat(ord.createdAt,"dd mmmm yyyy")}</td>
                                    <td className={`${ord.orderStatus === "Delivered" ? "table-status-green" :'table-status-yellow'}`}>
                                      <span>{ord.orderStatus}</span>
                                    </td>
                                    <td>
                                      <Link to={`/admin/order/details/${ord._id}`}>details</Link>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
        )}
    </Fragment>
  );
}
