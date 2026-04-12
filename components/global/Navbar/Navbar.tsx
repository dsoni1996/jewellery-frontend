import { Gem, Store, Heart, User, ShoppingBag, Gift } from "lucide-react";
import React, { useState } from "react";
import { Menu } from "lucide-react";
import MobileSidebar from "../Mobilesidebar/MobileSidebar";
import SignupModal from "../../Models/SignupModel";

const menuData = [
  {
    title: "BY CATEGORY",
    items: ["Earrings", "Rings", "Necklaces", "Bangles", "Mangalsutras"],
  },
  {
    title: "",
    items: ["Pendants", "Bracelets", "Chains", "Coins", "All Jewellery"],
    highlightLast: true,
  },
  {
    title: "BY METAL",
    items: ["Gold Jewellery", "Diamond Jewellery", "Polki Jewellery"],
  },
  {
    title: "BY KARATAGE",
    items: ["14KT", "18KT", "22KT", "24KT"],
  },
];

const menuItems = [
  { name: "Brand" },
  { name: "Masterpieces" },
  { name: "Jewellery", hasMegaMenu: true },
  { name: "Weddings" },
  { name: "Occasions" },
  { name: "Golden Programs" },
  { name: "Store" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openModel, setOpenModel] = useState(false);

  return (
    <div className="bg-[#fff] fixed top-0 left-0 w-full z-50">
      <div className="flex justify-between items-center px-5 md:px-10 py-4">
        {/* LOGO */}
        <h1 className="text-2xl font-semibold tracking-wide">MANAS</h1>

        {/* DESKTOP MENU */}
        <div className="hidden md:block">
          <NavMenu />
        </div>

        {/* DESKTOP ICONS */}
        <div className="hidden md:flex ">
          <NavIcons onUserClick={() => setOpenModel(true)} />
        </div>

        {/* MOBILE MENU BUTTON */}
        <div className="md:hidden mr-5">
          <Menu onClick={() => setIsOpen(true)} className="cursor-pointer" />
        </div>
      </div>

      {/* 🔥 MOBILE SIDEBAR CALL */}
      <MobileSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      {openModel && (
        <SignupModal
          onClose={() => {
            setOpenModel(false);
          }}
        />
      )}
    </div>
  );
};

const NavMenu = () => {
  return (
    <div className="flex gap-8 text-[15px] font-medium">
      {menuItems.map((item, index) => {
        // 🔥 Jewellery case (MegaMenu)
        if (item.hasMegaMenu) {
          return (
            <div key={index} className="relative group">
              <span className="cursor-pointer pb-1 border-b-2 border-transparent group-hover:border-orange-500 transition-all duration-200">
                {item.name}
              </span>

              <MegaMenu />
            </div>
          );
        }

        // 🔥 Normal menu item
        return (
          <span
            key={index}
            className="cursor-pointer pb-1 border-b-2 border-transparent hover:border-orange-500 transition-all duration-200"
          >
            {item.name}
          </span>
        );
      })}
    </div>
  );
};

const MegaMenu = () => {
  return (
    <div
      className="fixed left-1/2 -translate-x-1/2 w-screen 
      bg-[#f5ede3] shadow-xl
      opacity-0 invisible group-hover:opacity-100 group-hover:visible
      transition-all duration-300 z-50"
    >
      <div className="max-w-[1400px] mx-auto px-20 py-10 grid grid-cols-5 gap-10">
        {menuData.map((col, index) => (
          <div key={index}>
            {col.title && (
              <p className="text-orange-500 text-xs mb-3 tracking-wide">
                {col.title}
              </p>
            )}

            <ul className="space-y-2 text-gray-700">
              {col.items.map((item, i) => (
                <li
                  key={i}
                  className={`cursor-pointer ${
                    col.highlightLast && i === col.items.length - 1
                      ? "font-medium underline"
                      : ""
                  }`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* 🔥 Images */}
        <div className="flex gap-4 items-center">
          {["1", "2"].map((img, i) => (
            <img
              key={i}
              src={`https://picsum.photos/150/250?${img}`}
              className="rounded-md"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const NavIcons = ({onUserClick} : {onUserClick: () => void}) => {
  return (
    <div className="flex gap-5 text-lg">
       <User className="cursor-pointer" onClick={onUserClick} />
      <Heart className="cursor-pointer" />
    </div>
  );
};

export default Navbar;
