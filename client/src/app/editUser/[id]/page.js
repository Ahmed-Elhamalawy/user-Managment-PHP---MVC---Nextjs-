"use client";
import Footer from "@/components/footer";
import NavBar from "@/components/navbar";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const PostID = () => {
  const [inputs, setInputs] = useState({});
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const getUser = () => {
    axios.get(`http://localhost:8080/api/users/${id}`).then((res) => {
      setInputs(res.data);
      console.log(res.data);
    });
  };
  useEffect(() => {
    getUser();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8080/api/users/${id}/edit`, inputs)
      .then((res) => {
        console.log(res.data);
      });
    router.push("/");
    console.log(inputs);
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  return (
    <>
      <section className="h-screen bg-[#5956e9] rounded-b-[10%]">
        {/* ******************************  NavBar ****************************** */}
        <NavBar />
        {/* ******************************  Hero Section ****************************** */}

        <div className="flex flex-col w-full items-center  h-full gap-5 justify-start translate-y-10 ">
          <h1 className="text-7xl text-white w-1/2 flex text-center font-bold">
            Update
          </h1>
          <form className="flex flex-col gap-5 w-1/3 " onSubmit={handleSubmit}>
            <label className="text-white text-xl" htmlFor="name">
              Name
            </label>
            <input
              className="border-2 border-[white] rounded-xl w-full h-16 text-md px-4 bg-[#5956e9] text-white"
              type="text"
              value={inputs.name}
              id="name"
              name="name"
              placeholder="Enter your name"
              onChange={handleChange}
            />
            <label className="text-white text-xl" htmlFor="email">
              Email
            </label>
            <input
              className="border-2 border-[white] rounded-xl w-full h-16 text-md px-4 bg-[#5956e9] text-white"
              type="email"
              value={inputs.email}
              id="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
            />
            <label className="text-white text-xl" htmlFor="password">
              Mobile
            </label>
            <input
              className="border-2 border-[white] rounded-xl w-full h-16 text-md px-4 bg-[#5956e9] text-white"
              type="text"
              value={inputs.mobile}
              name="mobile"
              placeholder="Enter your mobile number"
              onChange={handleChange}
            />

            <button
              className="border-2 border-[white] rounded-xl w-full h-16 text-md mt-9 bg-white text-black font-semibold hover:bg-[#5956e9]"
              type="submit"
            >
              Update
            </button>
          </form>
        </div>

        <Footer />
      </section>
    </>
  );
};

export default PostID;
