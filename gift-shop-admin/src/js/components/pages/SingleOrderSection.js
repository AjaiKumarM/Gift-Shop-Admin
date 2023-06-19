import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { OrderStatusAction, SingleOrderAction } from "../../Actions/OrdersActions";
import { ClearToastShow, NavTogglerChangeMenu, ToastSuccessShow, ordersMenuChane } from "../../slice/Navbarslice";
import Loader from "../layouts/Loader";
import dateFormat from "dateformat";
import { ClearOrderSuccess } from "../../slice/OrderSlice";
import MetaData from "../layouts/MetaData";

export default function SingleOrderSection() {
  const { navToogle } = useSelector((state) => state.NavbarState);
  const { singleOrder = {}, loading,success,isLoading} = useSelector(
    (state) => state.OrderState
  );

  const [orderSta,SetOrderSta] = useState('')

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  let statusOption = ['Processing',"Out of delivery","Delivered"]

  if(singleOrder && !loading){
    if(singleOrder.orderStatus.toLocaleLowerCase() === "out of delivery"){
      statusOption = statusOption.filter((status)=>status !== "Processing")
    }
  }

  const StatusSubmitFun = (e)=>{
    e.preventDefault();

    if(orderSta.length > 3 ){
      dispatch(OrderStatusAction(orderSta,id))
    }
  }

  useEffect(() => {
    dispatch(ordersMenuChane())
    dispatch(SingleOrderAction(id));
  }, [dispatch, id]);

  useEffect(()=>{
    if(success){
      dispatch(SingleOrderAction(id))
      dispatch(ToastSuccessShow('Product update Successfully'))
      setTimeout(()=>dispatch(ClearToastShow()),4000)
      setTimeout(()=>dispatch(ClearOrderSuccess()),4000)
    }
  },[dispatch,success,id])

  return (
    <Fragment>
      <MetaData title={'Order summary'} />
      {loading ? (
        <Loader />
      ) : (
        <div className="d-sc-flex">
          <div className="left-gap"></div>
          {singleOrder && (
                      <div className="right-content mt-5 mx-md-5 mx-lg-0 overflow-v h-100 mb-5">
                      <div className="">
                        <nav aria-label="breadcrumbs ">
                          <ol className="breadcrumb sc-bread-con mx-3 font-small">
                            <li className="breadcrumb-item sc-bread">Pages</li>
                            <li
                              className="breadcrumb-item sc-bread-link pointer"
                              onClick={() => navigate("/admin/orders")}
                            >
                              Orders
                            </li>
                            <li
                              className="breadcrumb-item active sc-bread-active"
                              aria-current="page"
                            >
                              Order Summary
                            </li>
                          </ol>
                        </nav>
                        <div className="dashboarrd-head mx-3">
                          <h3 className="text-light ">Order Summary</h3>
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
                        <div className="order-id mx-3 mx-md-4 mt-4 mx-lg-0 d-flex justify-content-between flex-column flex-md-row">
                          <div>
                            <h5>
                              Order Number{" "}
                              <span>{`#${String(singleOrder._id).substring(
                                0,
                                10
                              )}`}</span>
                            </h5>
                          </div>
                          {singleOrder.orderStatus === 'Delivered' ? (
                            <Fragment>
                              <div className="me-3 order-delivered mt-3 mt-md-0">
                                <h6>Delivered</h6>
                              </div>
                            </Fragment>
                          ):(
                            <div className="me-3 order-select mt-3 mt-md-0" >
                            <form onSubmit={StatusSubmitFun} action="" className="display-flex gap-2">
                              <select name="status" id="status" onChange={(e)=>SetOrderSta(e.target.value)}>
                                {statusOption.map((status)=>(
                                  <option value={status} key={status}>{status}</option>
                                ))}
                              </select>
                              <button type="submit" className="btn-sc-primary py-2 rounded-pill display-flex gap-2" disabled={isLoading}><span className="text-dark">Submit</span>{isLoading ? (<span className="loader2"></span>):null}</button>
                            </form>
                          </div>
                          )}
                        </div>
                        {singleOrder && (
                          <Fragment>
                            <div className="sc-card ms-2 mx-md-1 mt-4">
                              <div className="sc-table">
                                <table>
                                  <thead className="table-head">
                                    <tr className="text-center">
                                      <th>Item summary</th>
                                      <th>Qty</th>
                                      <th>Price</th>
                                      <th>Total Price</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {singleOrder.orderItems.map((item) => (
                                      <tr key={item.productId}>
                                        <td className="table-img">
                                          <img
                                            src={item.image}
                                            alt={item.name}
                                            className="img-fluid"
                                          />
                                          <span className="ms-3">{`${String(
                                            item.name
                                          ).substring(0, 30)}...`}</span>
                                        </td>
                                        <td className="text-center">{`x${item.quantity}`}</td>
                                        <td className="text-center">{`$${item.price}`}</td>
                                        <td className="text-center">{`$${
                                          item.price * item.quantity
                                        }`}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </Fragment>
                        )}
                        <div className="row mt-4 mx-2 mx-md-2">
                          <div className="col-md-6">
                            <div className="col-card">
                              <div className="col-card-head">
                                <h6>Order Summary</h6>
                              </div>
                              <div className="col-card-content">
                                <div className="d-flex justify-content-between ">
                                  <h6 className="font-small">Order Created</h6>
                                  <span className="font-small">
                                    {dateFormat(singleOrder.createdAt, "ddd,mmm dd,yyyy")}
                                  </span>
                                </div>
                                <div className="d-flex justify-content-between ">
                                  <h6 className="font-small">Order Time</h6>
                                  <span className="font-small">
                                    {dateFormat(singleOrder.createdAt, "hh:MM TT")}
                                  </span>
                                </div>
                                <div className="d-flex justify-content-between ">
                                  <h6 className="font-small">Subtotal</h6>
                                  <span className="font-small">{`$${singleOrder.itemsPrice}`}</span>
                                </div>
                                <div className="d-flex justify-content-between ">
                                  <h6 className="font-small">Delivery Fee</h6>
                                  <span className="font-small">{`$${singleOrder.shippingPrice}`}</span>
                                </div>
                              </div>
                            </div>
                            <div className="col-card col-card-margin">
                              <div className="d-flex justify-content-between align-items-center pt-2">
                                <h6 className="font-small fw-bold">Total</h6>
                                <span className="font-small">{`$${singleOrder.totalPrice}`}</span>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 mt-5 mt-md-0">
                            <div className="col-card">
                              <div className="col-card-head">
                                <h6>Delivery Address</h6>
                              </div>
                              <div className="col-card-content">
                                <div className="d-flex gap-2">
                                  <h6 className="font-small pts-1">Name :</h6>
                                  <span className="font-small">
                                    {singleOrder.shippingInfo.fullName}
                                  </span>
                                </div>
                                <div className="d-flex gap-2">
                                  <h6 className="font-small pts-1">Address :</h6>
                                  <span className="font-small">
                                    {singleOrder.shippingInfo.address}
                                  </span>
                                </div>
                                <div className="d-flex gap-2">
                                  <h6 className="font-small pts-1">City :</h6>
                                  <span className="font-small">
                                    {singleOrder.shippingInfo.city}
                                  </span>
                                </div>
                                <div className="d-flex gap-2">
                                  <h6 className="font-small pts-1">District :</h6>
                                  <span className="font-small">
                                    {singleOrder.shippingInfo.district}
                                  </span>
                                </div>
                                <div className="d-flex gap-2">
                                  <h6 className="font-small pts-1">State :</h6>
                                  <span className="font-small">
                                    {singleOrder.shippingInfo.state}
                                  </span>
                                </div>
                                <div className="d-flex gap-2">
                                  <h6 className="font-small pts-1">Pincode :</h6>
                                  <span className="font-small">
                                    {singleOrder.shippingInfo.postalCode}
                                  </span>
                                </div>
                                <div className="d-flex gap-2">
                                  <h6 className="font-small pts-1">Phone Number :</h6>
                                  <span className="font-small">
                                    {singleOrder.shippingInfo.phoneNo}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
          )}
        </div>
      )}
    </Fragment>
  );
}
