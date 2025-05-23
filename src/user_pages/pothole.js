import "../cssfiles/trash.css"
import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Aunthentication";
import axios from "axios";
import Showdialougue from "../components/showdialougue";

export default function Pothole() {

    const navigate = useNavigate();
    const {user} = useAuth();
    const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNo: "",
    pincode: "",
    address: "",
    description: "",
    image: null,
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

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    //showing image preview
    const preview = document.getElementById('preview');
    const reader = new FileReader();

    reader.onloadend = function () {
      if(file.size > 2 * 1024 * 1024) {
        alert('File size should be less than 2 MB');
        return;
      }
      setFormData({
        ...formData,
        image: reader.result
      });
        preview.src = reader.result;
        preview.style.display = 'inline-block';
        preview.style.height= "150px";
    }

    if (file) {
        reader.readAsDataURL(file);
    } else {
        preview.src = "#";
        preview.style.display = 'none';
    }
    
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post("http://localhost:80/api/pothole.php", formData)

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
      email: "",
      phoneNo: "",
      pincode: "",
      address: "",
      description: "",
      image: null,
      username: user
     })
  };

  return (
    <>
    <button onClick={back_btn} className="back_btn">
    <FontAwesomeIcon icon={faChevronLeft} />
    </button>
    <div className="trash_container">
        <div className="form-wrapper">
      <h1 className="trash_title">Pothole Repair Request</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName" className="firstLabel">Full Name</label>
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
        <div className="form-group">
            <label htmlFor="imageFile">Upload a Reference Picture (Optional)</label>
                <div className="file-input">
                    <label htmlFor="imageFile">Choose file</label>
                    <input
                    type="file"
                    id="imageFile"
                    name="image"
                    onChange={handleImageChange}
                    />
                </div>
                <img id="preview" src="#" alt="Preview" style={{display: 'none'}}></img>
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

