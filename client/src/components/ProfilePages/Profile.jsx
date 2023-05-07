import React, { useContext, useEffect, useState, useRef } from "react";
import { UserContext } from "../../Context";
import axios from "axios";
import Card from "../Pages/AllProducts/Card";
import Term from "./Term";

const Profile = () => {
  const { user } = useContext(UserContext);
  const [term, setTerm] = useState("");
  const [product, setProduct] = useState([]);
  const isEmpty = useRef(true);

  const handleClick = (e) => {
    isEmpty.current = true;
    axios
      .get(`/api/getProductUser/${user.userId}`)
      .then((res) => {
        setProduct(res.data.products);
      })
      .catch((err) => console.log(err));
    if (e.target.name === "pending") {
      setTerm("pending");
    }
    if (e.target.name === "active") {
      setTerm("active");
    }
    if (e.target.name === "reject") {
      setTerm("reject");
    }
  };

  useEffect(() => {
    console.log(user);
  }, [product]);

  console.log(product);

  return (
    <>
      <Term />
      <div>
        <div className="md:ml-14 md:mr-14 mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  gap-20 ">
          <div className="border shadow-xl ">
            <img
              name="pending"
              src="../../../assets/pending.png"
              alt="pending image"
              className="h-[15.75rem] m-auto hover:cursor-pointer"
              onClick={(e) => handleClick(e)}
            />
            <div className="text-center my-2 text-xl text-whatsapp font-medium">
              View your pending add{" "}
            </div>
          </div>
          <div className="border shadow-xl  ">
            <img
              name="active"
              src="../../../assets/active.png"
              alt="active image"
              className="h-[15.75rem] m-auto hover:cursor-pointer"
              onClick={(e) => handleClick(e)}
            />
            <div className="text-center my-2 text-xl text-whatsapp font-medium">
              View your active add
            </div>
          </div>
          <div className="border shadow-xl  ">
            <img
              name="reject"
              src="../../../assets/reject.png"
              alt="reject image"
              className="h-[15.75rem] m-auto hover:cursor-pointer"
              onClick={(e) => handleClick(e)}
            />
            <div className="text-center my-2 text-xl text-whatsapp font-medium">
              View your rejected add
            </div>
          </div>
        </div>
      </div>
      <div className=" mt-10 ">
        {(term === "pending" && (
          <div className="text-center text-3xl"> Your Pending adds are </div>
        )) ||
          (term === "active" && (
            <div className="text-center text-3xl"> Your Active adds are </div>
          )) ||
          (term === "reject" && (
            <div className="text-center text-3xl"> Your Rejected adds are </div>
          ))}
      </div>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 b11:grid-cols-4 gap-6">
        {(term === "pending" &&
          product &&
          product.map((p, index) => {
            if (p.isPending === true) {
              isEmpty.current = false;
              return <Card key={index} product={p} />;
            }
          })) ||
          (term === "active" &&
            product &&
            product.map((p, index) => {
              if (p.isPending === false && p.adminApproved === true) {
                isEmpty.current = false;
                return <Card key={index} product={p} />;
              }
            })) ||
          (term === "reject" &&
            product &&
            product.map((p, index) => {
              if (p.isPending === false && p.adminRejected === true) {
                isEmpty.current = false;
                return <Card key={index} product={p} />;
              }
            }))}
      </div>
      {term === "pending" && isEmpty.current && (
        <div className="text-center text-4xl text-gray-400 mb-20">
          {" "}
          There are no pending adds...{" "}
        </div>
      )}
      {term === "active" && isEmpty.current && (
        <div className="text-center text-4xl text-gray-400 mb-20">
          {" "}
          There are no active adds...{" "}
        </div>
      )}
      {term === "reject" && isEmpty.current && (
        <div className="text-center text-4xl text-gray-400 mb-20">
          {" "}
          There are no reject adds...{" "}
        </div>
      )}
    </>
  );
};

export default Profile;
