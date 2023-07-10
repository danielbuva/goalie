import { useState } from "react";
import EditProfile from "../../EditProfile";
import CloseX from "../icons/X";
import "./index.css"

export default function UploadImageModal({modalIsOpen, setModalIsOpen}) {

  return (
    <div className="upload-image-modal">
      <div className="edit-profile-header">
        <button onClick={()=>setModalIsOpen(false)} className="close-button">
          <CloseX />
        </button>
        <h2 style={{marginLeft: "5px"}}>Edit Profile</h2>
      </div>
      <EditProfile setModalIsOpen={setModalIsOpen}/>
    </div>
  );
}
