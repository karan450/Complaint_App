import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faCircleCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';
import "../cssfiles/showdialougue.css"

export default function Showdialougue({showModal, setShowModal}) {
  
    const navigate = useNavigate();

  return (
    <Modal
          isOpen={showModal}
          onRequestClose={() => setShowModal(false)}
          className="modal"
          overlayClassName="overlay"
          >
          <button onClick={()=>navigate("/dashboard")} className="closeModal"><FontAwesomeIcon icon={faXmark} /></button>
          <h2 className="titleOfModal"><FontAwesomeIcon icon={faCircleCheck} /> Complaint Sent</h2>
          <p className="contentOfModal">We have received your complaint and will response as soon as possible.<br/><br/>You can track your progress in status menu.</p>
        <button className="buttonModal" onClick={() => navigate("/dashboard/status")}>Status</button>
        </Modal>
  );
}

