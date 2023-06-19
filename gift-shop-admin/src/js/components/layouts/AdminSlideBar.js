import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClearToastShow, CustommersMenuChane, DashBoardChange, LoginMenuChane, NavTogglerChangeMenu, ProductMenuChange, ToastSuccessShow, ordersMenuChane } from "../../slice/Navbarslice";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { AdminLogutAction } from "../../Actions/AuthenticationAction";
import { ClearUserData } from "../../slice/AuthenticationSlice";




export default function AdminSideBar(){

    const {customers,dashboard,product,orders,navToogle ,login} = useSelector((state)=>state.NavbarState);
    const {isAuthentication,success,loading} = useSelector((state)=>state.AuthState)

    const [change,SetChange] = useState(false)

    const navigate = useNavigate()

    const dispatch = useDispatch()

    useEffect(()=>{
        if(success){
            dispatch(ClearUserData())
            dispatch(ToastSuccessShow('Logout Successfully'))
            setTimeout(()=>dispatch(ClearToastShow()),4000)
            navigate("/admin/login")
        }
    },[success,navigate,dispatch])
    return(
        <Fragment>
            <div className="bacground-blue"></div>
            <div className={`sidebar-container ${navToogle ? 'active-sidebar': ''}`}>
                <div className="sidebar-top">
                <div className="sidebar-head">
                    <h2>Gift</h2>
                    <h2>Shop</h2>
                </div>
                <div className="mt-2 d-flex d-lg-none">
                    <i onClick={()=>dispatch(NavTogglerChangeMenu(false))} className="fi fi-sr-circle-xmark pointer"></i>
                </div>
                </div>
                <ul className="sidebar-list">
                    <li className={`${dashboard ? "sidebar-list-active":""}`} onClick={()=>{dispatch(DashBoardChange());navigate('/')}}><i className="fi fi-rs-computer purple"></i><span>Dashboard</span></li>
                    <li className={`${product ? "sidebar-list-active":""}`} onClick={()=>{dispatch(ProductMenuChange());navigate('/admin/products')}}><i className="fi fi-rr-memo-pad light-red"></i><span>Product</span></li>
                    <li className={`${orders ? "sidebar-list-active":""}`} onClick={()=>{dispatch(ordersMenuChane());navigate('/admin/orders')}}><i className="fi fi-rr-box-open light-green"></i><span>Orders</span></li>
                    <li className={`${customers ? "sidebar-list-active":""}`} onClick={()=>{dispatch(CustommersMenuChane());navigate('/admin/customers')}}><i className="fi fi-rr-users light-blue"></i><span>Customers</span></li>
                    {isAuthentication ? (<li onClick={()=>SetChange(true)}><i className="fi fi-bs-sign-out-alt text-orange"></i><span>Logout</span></li>):(<li className={`${login ? "sidebar-list-active":""}`} onClick={()=>{dispatch(LoginMenuChane());navigate('/admin/login')}}><i className="fi fi-ss-sign-in-alt text-orange"></i><span>Login</span></li>)}
                </ul>
            </div>
            <Modal size="md" backdrop='static' centered show={change}>
                <Modal.Body>
                    <div className="logout">
                    <div className="logout-content">
                        <p>Are you sure,<br />You want to logout?</p>
                    </div>
                    <div className="display-flex gap-3 pt-2">
                        <button onClick={()=>SetChange(false)} className="btn-sc-primary-outline rounded-pill">Cancel</button>
                        <button onClick={()=>{dispatch(AdminLogutAction);SetChange(false)}}  className="btn-sc-primary rounded-pill display-flex"><span>Logout</span>{loading ? (<span className="loader2"></span>):null}</button>
                    </div>
                    </div>
                </Modal.Body>
            </Modal>
        </Fragment>
    )
}