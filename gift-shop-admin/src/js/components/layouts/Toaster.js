import { Fragment } from "react";
import { useSelector } from "react-redux";

export default function Toaster() {

  const {toastSuccessShow,toastDangerShow,toasteConetnt} = useSelector((state)=> state.NavbarState)
  return (
    <Fragment>
      <div className={`toast-containers ${toastSuccessShow ?'toast-succ':""} ${toastDangerShow?"toast-dan":""}`}>
        <div className="toast-cont">
          <div className="toast-logo">
                <img src="/images/icons/logo.png" alt="gift-shop logo" />
          </div>
          <div className="toast-content">
            {toasteConetnt}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
