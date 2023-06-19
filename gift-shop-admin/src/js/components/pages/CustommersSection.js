import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CustommersMenuChane,
  NavTogglerChangeMenu,
} from "../../slice/Navbarslice";
import { GetAllUserAction } from "../../Actions/CustomersAction";
import Loader from "../layouts/Loader";
import dateFormat from "dateformat";
import MetaData from "../layouts/MetaData";

export default function CustommerSection() {
  const { navToogle } = useSelector((state) => state.NavbarState);
  const {
    loading,
    totalUsers,
    newUsers,
    Users = [],
  } = useSelector((state) => state.CustomerState);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CustommersMenuChane());
    dispatch(GetAllUserAction);
  }, [dispatch]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={'Customer'} />
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
                      Customers
                    </li>
                  </ol>
                </nav>
                <div className="dashboarrd-head mx-3">
                  <h3 className="text-light ">Customers</h3>
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
                      <h5 className="text-blue">New Customers</h5>
                      <p className="text-muted font-small">
                        last <span className="text-success">+24 hours</span>
                      </p>
                      <span>{newUsers}</span>
                    </div>
                    <div className="dashboard-icon gra-green">
                      <img
                        src="/images/user/add-group.png"
                        alt="pending-task"
                      />
                    </div>
                  </div>
                  <div className="dashboard-card col-11 col-sm-5 ">
                    <div className="dashboard-content">
                      <h5 className="text-blue">Total Customers</h5>
                      <span>{totalUsers}</span>
                    </div>
                    <div className="dashboard-icon gra-purple">
                      <img src="/images/user/group.png" alt="pending-task" />
                    </div>
                  </div>
                </div>
                {Users.length > 0 ? (
                  <Fragment>
                    <div className="recent-head ms-3 ms-md-0 ms-md-0 mt-5">
                      <h5 className="fw-bold">Total users</h5>
                    </div>
                    <div className="sc-card ms-3 ms-md-0">
                      <div className="sc-table">
                        <table>
                          <thead className="table-head">
                            <tr className="text-center">
                              <th>Name</th>
                              <th>Email ID</th>
                              <th>Joined At</th>
                              <th>Role</th>
                              <th>Total buy products</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Users.map((user)=>(
                                <tr key={user._id} className="text-center">
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{dateFormat(user.createdAt,"dd,mmm yyyy")}</td>
                                    <td>{user.role}</td>
                                    <td>{user.userOrders.length}</td>
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
        </Fragment>
      )}
    </Fragment>
  );
}
