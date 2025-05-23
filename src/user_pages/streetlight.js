import "../cssfiles/trash.css"
import React, { useState } from "react";
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from "../Aunthentication";
import Showdialougue from "../components/showdialougue";
import axios from "axios";

export default function Streetlight() {

    const navigate = useNavigate();
    const {user} = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
    fullName: "",
    streetlightno: "",
    email: "",
    phoneNo: "",
    pincode: "",
    address: "",
    description: "",
    username: user
  });

  function back_btn(){
    navigate(-1);
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post("http://localhost:80/api/streetlight.php", formData)

    .then(res=>{
      if(res.data.status === "1"){
        setShowModal(true)
      }else if(res.data.status === "2"){
        navigate("/");
      }else{
        console.log(res.data);
        navigate("/error",{
          state: {
            error : res.data.result
          }
        })
      }
    } )

    .catch(error => {
      console.log(error)
      navigate("/error", {
          state : {
            error : error.message
          }
        })
     })

     setFormData({
      fullName: "",
      streetlightno: "",
      email: "",
      phoneNo: "",
      pincode: "",
      address: "",
      usertime: "",
      description: "",
      username: user
     })
  }

  return (
    <>
    <button onClick={back_btn} className="back_btn">
    <FontAwesomeIcon icon={faChevronLeft} />
    </button>
    <div className="trash_container">
        <div className="form-wrapper">
      <h1 className="trash_title">Streetlight Maintenance Request Form</h1>
      <hr/>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="streetlight-number" className="firstLabel">
            Streetlight Identification Number{" "}
            <span className="tooltip">
            <FontAwesomeIcon icon={faInfoCircle} />
            <span className="tooltiptext">
                Enter the identification number found on the streetlight pole.
            </span>
            </span>
        </label>
            <input
                type="text"
                id="streetlight-number"
                name="streetlightno"
                value={formData.streetlightno}
                className="form-control"
                onChange={handleInputChange}
                maxLength={10}
                required
            />
        </div>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            className="form-control"
            id="fullName"
            name="fullName"
            maxLength={20}
            value={formData.fullName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            maxLength={20}
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNo">Phone Number</label>
          <input
            type="tel"
            className="form-control"
            id="phoneNo"
            name="phoneNo"
            minLength={10}
            maxLength={10}
            value={formData.phoneNo}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="pincode">Pincode</label>
          <input
            type="text"
            className="form-control"
            id="pincode"
            name="pincode"
            maxLength={10}
            value={formData.pincode}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <textarea
            className="form-control"
            id="address"
            name="address"
            maxLength={200}
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            maxLength={200}
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <Showdialougue showModal={showModal} setShowModal={setShowModal}/>
      </form>
      </div>
    </div>
    </>
  );
}

