import React, { useState } from "react";

const SignupModal = ({ onClose }) => {
  const [step, setStep] = useState("signup"); // signup | otp | login
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="w-[900px] h-[520px] bg-white rounded-md overflow-hidden flex">

        {/* LEFT IMAGE */}
        <div className="w-1/2">
          <img
            src="https://images.unsplash.com/photo-1603252109303-2751441dd157"
            alt="model"
            className="h-full w-full object-cover"
          />
        </div>

        {/* RIGHT SECTION */}
        <div className="w-1/2 p-6 relative">

          {/* CLOSE */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-xl"
          >
            ✕
          </button>

          {/* ================= SIGNUP ================= */}
          {step === "signup" && (
            <>
              <h2 className="text-xl font-semibold mb-1">Sign Up</h2>
              <p className="text-sm text-gray-500 mb-4">
                Stay connected for exquisite designs and exclusive offers.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <input placeholder="First Name *" className="border-b py-2 outline-none" />
                <input placeholder="Last Name *" className="border-b py-2 outline-none" />
              </div>

              <div className="flex gap-2 mb-4">
                <input value="+91" readOnly className="w-16 border-b py-2 outline-none" />
                <input
                  placeholder="Phone Number *"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="flex-1 border-b py-2 outline-none"
                />
              </div>

              <input
                placeholder="City"
                className="w-full border-b py-2 outline-none mb-4"
              />

              <div className="flex items-start gap-2 mb-4 text-xs text-gray-600">
                <input type="checkbox" className="mt-1" />
                <p>I agree to be contacted via call, SMS, WhatsApp or email.</p>
              </div>

              <button
                onClick={() => setStep("otp")}
                className="w-full bg-black text-white py-2 rounded mb-3"
              >
                Get OTP to Proceed
              </button>

              <button
                onClick={() => setStep("login")}
                className="w-full border py-2 text-blue-600 rounded"
              >
                Already a member? Log In
              </button>
            </>
          )}

          {/* ================= OTP ================= */}
          {step === "otp" && (
            <>
              <h2 className="text-xl font-semibold mb-1">Verify OTP</h2>
              <p className="text-sm text-gray-500 mb-4">
                OTP sent to +91 {phone}
              </p>

              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full border-b py-2 outline-none mb-4 text-center tracking-widest text-lg"
              />

              <button
                className="w-full bg-black text-white py-2 rounded mb-3"
                onClick={() => alert("OTP Verified ✅")}
              >
                Verify OTP
              </button>

              <button
                onClick={() => setStep("signup")}
                className="text-sm text-blue-600"
              >
                Change Number
              </button>
            </>
          )}

          {/* ================= LOGIN ================= */}
          {step === "login" && (
            <>
              <h2 className="text-xl font-semibold mb-1">Login</h2>
              <p className="text-sm text-gray-500 mb-4">
                Welcome back! Login with your phone number.
              </p>

              <div className="flex gap-2 mb-4">
                <input value="+91" readOnly className="w-16 border-b py-2 outline-none" />
                <input
                  placeholder="Phone Number"
                  className="flex-1 border-b py-2 outline-none"
                />
              </div>

              <button
                onClick={() => setStep("otp")}
                className="w-full bg-black text-white py-2 rounded mb-3"
              >
                Get OTP
              </button>

              <button
                onClick={() => setStep("signup")}
                className="w-full border py-2 text-blue-600 rounded"
              >
                Create New Account
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignupModal;