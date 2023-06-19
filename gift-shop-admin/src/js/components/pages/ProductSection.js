import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  NavTogglerChangeMenu,
  ProductMenuChange,
} from "../../slice/Navbarslice";
import { GetAllProductAction } from "../../Actions/ProductAction";
import Loader from "../layouts/Loader";
import dateFormat from "dateformat";
import MetaData from "../layouts/MetaData";
import { useNavigate } from "react-router-dom";

export default function ProductSection() {
  const { navToogle } = useSelector((state) => state.NavbarState);
  const {
    loading,
    products = [],
    totalProducts,
    outofstock,
  } = useSelector((state) => state.ProductState);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(ProductMenuChange());
    dispatch(GetAllProductAction);
  }, [dispatch]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={'Product'} />
          <div className="d-sc-flex">
            <div className="left-gap"></div>
            <div className="right-content overflow-v mt-5 mx-md-5 mx-lg-0 h-100 mb-5">
              <div>
                <nav aria-label="breadcrumbs ">
                  <ol className="breadcrumb sc-bread-con mx-3 font-small">
                    <li className="breadcrumb-item sc-bread">Pages</li>
                    <li
                      className="breadcrumb-item active sc-bread-active"
                      aria-current="page"
                    >
                      Product
                    </li>
                  </ol>
                </nav>
                <div className="dashboarrd-head mx-3">
                  <h3 className="text-light ">Product</h3>
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
                      <h5 className="text-blue">Total Products</h5>
                      <p className="text-muted font-small"></p>
                      <span>{totalProducts}</span>
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
                      <h5 className="text-blue">Out of Stock</h5>
                      <span>{outofstock}</span>
                    </div>
                    <div className="dashboard-icon gra-purple">
                      <img src="/images/user/group.png" alt="pending-task" />
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-end mt-5 me-3 me-lg-5">
                  <div className="display-flex gap-2 product-create pointer" onClick={()=>navigate('/admin/create/product')}>
                    <i className="fi fi-rr-add"></i>
                    <span>Create</span>
                  </div>
                </div>
                {products.length > 0 ? (
                  <Fragment>
                    <div className="recent-head ms-3 my-3 ">
                      <h5 className="fw-bold">Product Details</h5>
                    </div>
                    <div className="sc-card ms-3">
                      <div className="sc-table">
                        <table>
                          <thead className="table-head">
                            <tr className="text-center">
                              <th>Product Name</th>
                              <th>Price</th>
                              <th>Stock</th>
                              <th>Created At</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {products.map((product)=>(
                                <tr key={product._id}>
                                    <td className="table-img"><img src={product.images[0].image} alt={product.name} className="img-fluid" /><span className="ms-2">{`${String(product.name).substring(0,25)}...`}</span></td>
                                    <td className="text-center">{`$${product.price}`}</td>
                                    <td className="text-center">{product.stock}</td>
                                    <td className="text-center">{dateFormat(product.createdAt,'dd,mmm yyyy')}</td>
                                    <td className="display-flex"><i className="fi fi-sr-pencil table-edit" onClick={()=>navigate(`/admin/update/${product._id}`)}></i></td>
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
