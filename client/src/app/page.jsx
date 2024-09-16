"use client";
import { AiOutlineEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";

import Footer from "@/components/footer";
import NavBar from "@/components/navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
export default function Home() {
  const [users, setUsers] = useState([]);
  const getAllUsers = () => {
    axios.get("http://localhost:8080/api/users").then((res) => {
      setUsers(res.data);
      console.log(res);
    });
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:8080/api/users/${id}`)
      .then((res) => {
        getAllUsers();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <section className="h-screen bg-[#5956e9] rounded-b-[10%]">
        {/* ******************************  NavBar ****************************** */}
        <NavBar />
        <div className="font-bold text-xl w-[90%] grid grid-cols-7 text-center mx-auto mt-10 bg-white h-24 justify-center items-center rounded-t-lg">
          <h1>id</h1>
          <h1>name</h1>
          <h1>email</h1>
          <h1>mobile</h1>
          <h1>created_at</h1>
          <h1>updated_at</h1>
          <h1>Delete/edit</h1>
        </div>
        {users.map((user) => (
          <div
            key={user.id}
            className="border-t-2 font-bold text-md w-[90%] grid grid-cols-7 text-center mx-auto  bg-white h-24 justify-center items-center "
          >
            <h1>{user.id}</h1>
            <h1> {user.name}</h1>
            <h1> {user.email}</h1>
            <h1> {user.mobile}</h1>
            <h1> {user.created_at}</h1>
            <h1> {user.updated_at}</h1>
            <div className="flex flex-row gap-10 items-center justify-center">
              <button onClick={() => deleteUser(user.id)}>
                <BsTrash className="text-3xl text-red-500" />
              </button>
              <Link href={`/editUser/${user.id}`}>
                <AiOutlineEdit className="text-3xl text-blue-500" />
              </Link>
            </div>
          </div>
        ))}

        {/* ******************************  Hero Section ****************************** */}
      </section>
      <Footer />
    </>
  );
}
