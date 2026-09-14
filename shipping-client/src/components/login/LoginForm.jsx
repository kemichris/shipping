import { useState } from "react";
import { FaUser, FaKey } from "react-icons/fa6";

import loginImg from "../../assets/loginImg.jpg";
import logo from "../../assets/shiplogo.png";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <div className="flex min-h-screen flex-col lg:flex-row">
        {/* Image */}
        <div className="order-1 h-70 w-full lg:order-2 lg:h-screen lg:w-1/2">
          <img
            src={loginImg}
            alt="shipping"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Login Form */}
        <div className="order-2 flex w-full items-center justify-center px-6 py-10 sm:px-10 lg:order-1 lg:w-1/2 lg:px-12">
          <div className="w-full max-w-170">
            {/* Logo */}
            <div className="mb-10 flex justify-center">
              <img
                src={logo}
                alt="Swift Trans Global"
                className="h-auto w-45 object-contain"
              />
            </div>

            {/* Heading */}
            <div className="mb-10 text-center">
              <h1 className="text-2xl font-semibold text-[#172033] ">
                Welcome to Swift Trans Global
              </h1>

              <p className="mt-4 text-[#172033]">
                Log in to your account and start your adventure.
              </p>
            </div>

            <form className="space-y-6">
              {/* User */}
              <div>
                <label
                  htmlFor="user"
                  className="mb-2 block text-base font-semibold text-[#172033]"
                >
                  User <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <FaUser className="absolute left-6 top-1/2 -translate-y-1/2 text-[#172033]" />

                  <input
                    id="user"
                    type="text"
                    name="user"
                    placeholder="Enter username"
                    className="h-10 w-full rounded-lg border border-[#d6dce5] bg-[#e9f0fc] pl-16 pr-5 text-base text-[#172033] outline-none transition focus:border-[#0184C7] focus:ring-2 focus:ring-[#0184C7]/20"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-base font-semibold text-[#172033]"
                >
                  Password <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <FaKey className="absolute left-6 top-1/2 -translate-y-1/2 text-[#172033]" />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter password"
                    className="h-10 w-full rounded-lg border border-[#d6dce5] bg-[#e9f0fc] pl-16 pr-16 text-base text-[#172033] outline-none transition focus:border-[#0184C7] focus:ring-2 focus:ring-[#0184C7]/20"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-sm font-medium text-[#172033]"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Remember / Forgot */}
              <div className="flex items-center justify-between gap-4">
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    className="h-3 w-3 rounded border-gray-300"
                  />

                  <span className="text-sm font-medium text-[#172033]">
                    Remember me
                  </span>
                </label>

                <button
                  type="button"
                  className="text-sm font-medium text-[#3f4d61] hover:text-[#0184C7]"
                >
                  Forgot your password?
                </button>
              </div>

              {/* Enter */}
              <button
                type="submit"
                className=" w-full py-2 rounded-xl bg-linear-to-r from-primary-dark to-primary-light text-base font-bold text-white shadow-sm transition hover:opacity-90"
              >
                ENTER
              </button>
            </form>

            {/* Sign up */}
            <p className="mt-8 text-center text-base text-[#536174]">
              Don't have an account?
              <button
                type="button"
                className="ml-3 font-bold text-[#3f4d61] hover:text-[#0184C7]"
              >
                Sign up
              </button>
            </p>

            {/* Bottom line */}
            <div className="mt-14 border-t border-gray-300" />
          </div>
        </div>
      </div>
    </div>
  );
}
