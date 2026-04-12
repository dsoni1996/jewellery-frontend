import React, { useState, useRef } from "react";
import { icons } from "../../../public/icons";
import "../styles/Header.css";
import { Gem, Store, Heart, User, ShoppingBag, Gift } from "lucide-react";
import OtpPopup from "../auth/Otppopup";

const Header = () => {
  const [openUserPopover, setOpenUserPopover] = useState(false);
  const [openRegisterPopup, setopenRegisterPopup] = useState(false)

  const userIcon = () => {
    return (
      <div
        className="user-wrapper"
        onMouseEnter={() => setOpenUserPopover(true)}
        onMouseLeave={() => setOpenUserPopover(false)}
      >
        <User />
        {openUserPopover && (
          <div className="userPopover">
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              <li onClick={()=>{setopenRegisterPopup(!openRegisterPopup)}}>
                <Gift /> Login / Sign up
              </li>
            </ul>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
    
    <div className="root">
      <div className="header-inner">
        <div className="left">
          {/* <img src="/logo.png" alt="Manas Jewellers" className="logo" /> */}
        </div>
        <div className="header-icons">
          <Gem />
          <Store />
          <Heart />
          {userIcon()}
          <div className="cart">
            <ShoppingBag />
            <span className="badge">0</span>
          </div>
        </div>
      </div>
    </div>
    {openRegisterPopup && <OtpPopup />}
    </>
  );
};

export default Header;
