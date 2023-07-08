import { useDispatch } from "react-redux";
// import { useColorMode } from "../../hooks/useTheme";
import "./index.css";
import "../Avatar/index.css";
import { useRef, useState } from "react";
import useSessionUser from "../../hooks/useSessionUser";
import { updateUser } from "../../store/users";
import { useModal } from "../../hooks/useModal";

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
  // style={{ height: "100px", zIndex: "-2", marginTop: "30" }}
  return (
    <form className="edit-profile-div" encType="multipart/form-data" onSubmit={handleClick}>
      <div className="edit-profile-banner">
        <div className="edit-photo-div">
          <i
            className="fa-solid fa-camera"
            onClick={() => {
              if (bannerInputRef.current) {
                bannerInputRef.current.click();
              }
            }}
          ></i>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setBanner(e.target.files[0])}
            style={{ visibility: "hidden" }}
            ref={bannerInputRef}
          />
        </div>
      </div>
      <div className="edit-profile-avatar">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          style={{ visibility: "hidden" }}
          ref={imageInputRef}
        />
        <div
          className="edit-avatar-div"
          onClick={(e) => {
            imageInputRef.current?.click();
          }}
        >
          <i
            className="fa-solid fa-camera"
            onClick={() => {
              if (imageInputRef.current) {
                imageInputRef.current.click();
              }
            }}
          ></i>
        </div>
      </div>
      <input
        type="text"
        className="edit-name"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea className="edit-bio" placeholder="Bio" value={bio} onChange={(e) => setBio(e.target.value)} />
      <button type="submit">Save</button>
    </form>
  );
}
