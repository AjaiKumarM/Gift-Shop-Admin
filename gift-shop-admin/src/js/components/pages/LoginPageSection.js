import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClearToastShow, LoginMenuChane, NavTogglerChangeMenu, ToastDangerShow, ToastSuccessShow } from "../../slice/Navbarslice";
import MetaData from "../layouts/MetaData";
import { LoginAction } from "../../Actions/AuthenticationAction";
import { ClearUserData } from "../../slice/AuthenticationSlice";
import { useNavigate } from "react-router-dom"

export default function LoginPageSection() {
  const { navToogle } = useSelector((state) => state.NavbarState);
  const {loading ,userData={}} = useSelector((state)=>state.AuthState)

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const LoginSubmitFun = (e)=>{
    e.preventDefault();
    dispatch(LoginAction(email,password))
  }

  useEffect(() => {
    dispatch(LoginMenuChane());

  }, [dispatch]);

  useEffect(()=>{

    if(userData.role === 'user'){
      dispatch(ToastDangerShow('Sorry! you have not access this Admin pages'))
      setTimeout(()=>(dispatch(ClearToastShow())),4000)
      setTimeout(()=>(dispatch(ClearUserData())),4000)
    }
    if(userData.role === 'admin'){
      dispatch(ToastSuccessShow(`Welcome Back Mr ${userData.name}`))
      setTimeout(()=>dispatch(ClearToastShow()),4000)
      navigate('/')
    }

  },[dispatch,userData,navigate])

  return (
    <Fragment>
      <MetaData title={"Login"} />
      <div className="d-sc-flex">
        <div className="left-gap"></div>
        <div className="right-content mt-5 mx-md-5 mx-lg-0">
          <div className="">
            <nav aria-label="breadcrumbs ">
              <ol className="breadcrumb sc-bread-con mx-3 font-small">
                <li className="breadcrumb-item sc-bread">Pages</li>
                <li
                  className="breadcrumb-item active sc-bread-active"
                  aria-current="page"
                >
                  Login
                </li>
              </ol>
            </nav>
            <div className="dashboarrd-head mx-3">
              <h3 className="text-light ">Login</h3>
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
          </div>
          <div className="mt-5 display-flex">
            <div className="login-card me-lg-5 display-flex flex-column py-4">
              <div className="login-header">
                <h5>Sign In</h5>
              </div>
              <form action="" onSubmit={LoginSubmitFun} className="w-85">
                <div >
                  <label htmlFor="email">Email</label>
                  <input required value={email} onChange={(e)=>setEmail(e.target.value)} type="email" name="email" id="email" placeholder="Enter your Email" className="form-sc-control" />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input required type="password" value={password} onChange={(e)=>setPassword(e.target.value)} name="password" id="password" placeholder="Enter your password"  className="form-sc-control"/>
                </div>
                <div className="mt-3">
                    <button disabled={loading} type="submit" className="btn-sc-primary w-100 rounded-pill display-flex gap-3"><span>Submit</span>{loading ? (<span className="loader2"></span>):null}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
