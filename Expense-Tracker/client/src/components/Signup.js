import React, { useState } from "react";
import ReactLoading from "react-loading";

export default function Signup(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    const res = await fetch("/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    console.log(data);

    if (data.errors) {
      setError(data.errors);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      props.closeModalSignup(); // Close the signup modal
      props.openModalLogin(); // Open the login modal
      alert("Signup successful! Please log in to continue.");
    }
  };

  return (
    <div>
      <div className="p-6 bg-rp-black text-white rounded-xl font-lexend">
        <h1 className="font-bold text-2xl ">Sign Up</h1>
        <p className="">Please fill this to create an account</p>
        <hr className="my-4 "></hr>

        {/* Name Field */}
        <div className="grid grid-cols-12">
          <label htmlFor="name" className="font-bold flex items-center col-span-4">
            Name
          </label>
          <input
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            type="text"
            placeholder="Enter Name"
            className="p-2 m-2 inline-block outline-none bg-jp-black col-span-8 rounded-sm placeholder-rp-yellow"
          />
          <span className="text-sm text-red-500 col-start-5 col-span-8">
            {error.name}
          </span>
        </div>

        {/* Email Field */}
        <div className="grid grid-cols-12">
          <label htmlFor="email" className="font-bold flex items-center col-span-4">
            Email
          </label>
          <input
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            type="email"
            placeholder="Enter Email"
            className="p-2 m-2 inline-block outline-none col-span-8 bg-jp-black rounded-sm placeholder-rp-yellow"
          />
          <span className="text-sm text-red-500 col-start-5 col-span-8">
            {error.email}
          </span>
        </div>

        {/* Password Field */}
        <div className="grid grid-cols-12 ">
          <label htmlFor="password" className="font-bold flex items-center col-span-4">
            Password
          </label>
          <input
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            type="password"
            placeholder="Enter Password"
            name="password"
            className="p-2 m-2 inline-block outline-none col-span-8 bg-jp-black rounded-sm placeholder-rp-yellow"
          ></input>
          <span className="text-sm text-red-500 col-start-5 col-span-8">
            {error.password}
          </span>
        </div>

        {/* Confirm Password Field */}
        <div className="grid grid-cols-12">
          <label
            htmlFor="confirm-password"
            className="font-bold flex items-center col-span-4"
          >
            Confirm Password
          </label>
          <input
            value={user.confirmPassword}
            onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
            type="password"
            placeholder="Confirm Password"
            name="Confirm-Password"
            className="p-2 m-2 inline-block outline-none bg-jp-black col-span-8 rounded-sm placeholder-rp-yellow"
          ></input>
          <span className="text-sm text-red-500 col-start-5 col-span-8">
            {error.confirmPassword}
          </span>
        </div>

        <p className="">
          By creating an account you agree to our{" "}
          <button className="text-rp-yellow">terms and conditions</button>
        </p>

        <div className="mt-4">
          {isLoading ? (
            <ReactLoading type="bubbles" color="#F5A302" height={50} width={50} />
          ) : (
            <button
              onClick={handleSignup}
              className="font-bold p-3 rounded-xl border-2 border-rp-yellow text-rp-yellow hover:border-rp-black hover:text-rp-black hover:bg-rp-yellow hover:scale-110 transition delay-150 duration-200"
            >
              Sign Up
            </button>
          )}
        </div>

        <span className="flex justify-center py-2">
          <span className="pr-1">Already have an Account, </span>
          <button
            className="text-rp-yellow cursor-pointer"
            onClick={() => {
              props.closeModalSignup();
              props.openModalLogin();
            }}
          >
            Log In
          </button>
        </span>
      </div>
    </div>
  );
}
