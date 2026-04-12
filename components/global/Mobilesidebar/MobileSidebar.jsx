import { X, ChevronDown } from "lucide-react";
import { useState } from "react";


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

const MobileSidebar = ({ isOpen, setIsOpen }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      {/* OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full w-[280px] bg-white z-50 shadow-lg 
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Menu</h2>
          <X onClick={() => setIsOpen(false)} className="cursor-pointer" />
        </div>

        {/* MENU */}
        <div className="flex flex-col p-4">
          {menuItems.map((item, index) => (
            <div key={index} className="border-b">

              {/* 🔥 MENU ITEM */}
              <div
                className="flex justify-between items-center py-3 cursor-pointer"
                onClick={() =>
                  item.hasMegaMenu
                    ? toggleDropdown(index)
                    : setIsOpen(false)
                }
              >
                <span>{item.name}</span>

                {/* Arrow only if dropdown */}
                {item.hasMegaMenu && (
                  <ChevronDown
                    className={`transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                )}
              </div>

              {/* 🔥 DROPDOWN (Jewellery) */}
              {item.hasMegaMenu && (
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? "max-h-[500px]" : "max-h-0"
                  }`}
                >
                  <div className="pl-3 pb-3">
                    {menuData.map((col, i) => (
                      <div key={i} className="mb-3">
                        
                        {col.title && (
                          <p className="text-xs text-orange-500 mb-1">
                            {col.title}
                          </p>
                        )}

                        <ul className="space-y-1 text-sm text-gray-700">
                          {col.items.map((subItem, j) => (
                            <li key={j} className="cursor-pointer">
                              {subItem}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          ))}
        </div>
      </div>
    </>
  );
};


export default MobileSidebar