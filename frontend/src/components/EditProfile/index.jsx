import { useDispatch } from "react-redux";
// import { useColorMode } from "../../hooks/useTheme";
import "./index.css";
import "../Avatar/index.css";
import { useRef, useState } from "react";
import useSessionUser from "../../hooks/useSessionUser";
import { updateUser } from "../../store/users";
import { useModal } from "../../hooks/useModal";
import Input from "../Input";
import UploadImageModal from "../Modal/UploadImageModal";

export default function EditProfile() {
  // const col = useColorMode("#fff", "#15202B", "#000");
  const dispatch = useDispatch();
  const currentUser = useSessionUser();
  const [name, setName] = useState(currentUser.name);
  const [bio, setBio] = useState(currentUser.bio ?? "");
  const { closeModal } = useModal();
  const [image, setImage] = useState("");
  const [banner, setBanner] = useState("");
  const imageInputRef = useRef(null);
  const bannerInputRef = useRef(null);

  const handleClick = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("banner", banner);
    formData.append("name", name);
    formData.append("bio", bio);

    await dispatch(updateUser(formData, currentUser.id));

    closeModal();
  };
  return (
    <form className="edit-profile-div" encType="multipart/form-data" onSubmit={handleClick}>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setBanner(e.target.files[0])}
        style={{ visibility: "hidden", position: "absolute" }}
        ref={bannerInputRef}
      />
      <div className="edit-profile-banner">
        {/* {currentUser.banner && (
          <img
            alt="banner"
            style={{ height: "200px", width: "600px", objectFit: "cover" }}
            src={currentUser.banner}
          />
        )} */}
        <div
          className="camera-icon-wrapper-banner"
          onClick={() => {
            if (bannerInputRef.current) {
              bannerInputRef.current.click();
            }
          }}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" width="15px" height="15px">
            <g>
              <path fill="#ffffff" d="M9.697 3H11v2h-.697l-3 2H5c-.276 0-.5.224-.5.5v11c0 .276.224.5.5.5h14c.276 0 .5-.224.5-.5V10h2v8.5c0 1.381-1.119 2.5-2.5 2.5H5c-1.381 0-2.5-1.119-2.5-2.5v-11C2.5 6.119 3.619 5 5 5h1.697l3-2zM12 10.5c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zm-4 2c0-2.209 1.791-4 4-4s4 1.791 4 4-1.791 4-4 4-4-1.791-4-4zM17 2c0 1.657-1.343 3-3 3v1c1.657 0 3 1.343 3 3h1c0-1.657 1.343-3 3-3V5c-1.657 0-3-1.343-3-3h-1z"></path>
            </g>
          </svg>
        </div>
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        style={{ visibility: "hidden", position: "absolute" }}
        ref={imageInputRef}
      />
      <div className="edit-profile-avatar">
        {/* {currentUser.image && <img alt="avatar" style={{ objectFit: "cover" }} src={currentUser.image} />} */}
        <div
          className="camera-icon-wrapper-avatar"
          onClick={() => {
            if (bannerInputRef.current) {
              bannerInputRef.current.click();
            }
          }}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" width="15px" height="15px">
            <g>
              <path fill="#ffffff" d="M9.697 3H11v2h-.697l-3 2H5c-.276 0-.5.224-.5.5v11c0 .276.224.5.5.5h14c.276 0 .5-.224.5-.5V10h2v8.5c0 1.381-1.119 2.5-2.5 2.5H5c-1.381 0-2.5-1.119-2.5-2.5v-11C2.5 6.119 3.619 5 5 5h1.697l3-2zM12 10.5c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zm-4 2c0-2.209 1.791-4 4-4s4 1.791 4 4-1.791 4-4 4-4-1.791-4-4zM17 2c0 1.657-1.343 3-3 3v1c1.657 0 3 1.343 3 3h1c0-1.657 1.343-3 3-3V5c-1.657 0-3-1.343-3-3h-1z"></path>
            </g>
          </svg>
        </div>
      </div>
      <div className="non-image-inputs">
        <Input id="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <textarea
          className="edit-bio"
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <button type="submit">Save</button>
      </div>
    </form>
  );
}
