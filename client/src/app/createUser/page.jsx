"use client";
import Footer from "@/components/footer";
import NavBar from "@/components/navbar";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const router = useRouter();

  const createUser = () => {
    axios
      .post("http://localhost:8080/api/users", {
        name,
        email,
        mobile,
      })
      .then((res) => {
        console.log(res);
        router.push("/");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser();
  };
  return (
    <>
      <section className="h-screen bg-[#5956e9] rounded-b-[10%]">
        {/* ******************************  NavBar ****************************** */}
        <NavBar />
        {/* ******************************  Hero Section ****************************** */}

        <div className="flex flex-col w-full items-center  h-full gap-5 justify-start translate-y-10 ">
          <h1 className="text-7xl text-white w-1/2 flex text-center font-bold">
            Create
          </h1>
          <form className="flex flex-col gap-5 w-1/3 " onSubmit={handleSubmit}>
            <label className="text-white text-xl" htmlFor="name">
              Name
            </label>
            <input
              className="border-2 border-[white] rounded-xl w-full h-16 text-md px-4 bg-[#5956e9] text-white"
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
            />
            <label className="text-white text-xl" htmlFor="email">
              Email
            </label>
            <input
              className="border-2 border-[white] rounded-xl w-full h-16 text-md px-4 bg-[#5956e9] text-white"
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="text-white text-xl" htmlFor="password">
              Mobile
            </label>
            <input
              className="border-2 border-[white] rounded-xl w-full h-16 text-md px-4 bg-[#5956e9] text-white"
              type="text"
              name="mobile"
              placeholder="Enter your mobile number"
              onChange={(e) => setMobile(e.target.value)}
            />
            <input
              className="hidden border-2 border-[white] rounded-xl w-full h-16 text-md px-4 bg-[#5956e9] text-white"
              type="text"
              id="text"
              name="books"
            />
            <button
              className="border-2 border-[white] rounded-xl w-full h-16 text-md mt-9 bg-white text-black font-semibold hover:bg-[#5956e9]"
              type="submit"
            >
              Create
            </button>
          </form>
        </div>

        <Footer />
      </section>
    </>
  );
}
