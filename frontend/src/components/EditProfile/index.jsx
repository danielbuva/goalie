import { useDispatch } from "react-redux";
import { useColorMode } from "../../hooks/useTheme";
import Avatar from "../Avatar";
import "./index.css";
import { useState } from "react";
import useSessionUser from "../../hooks/useSessionUser";
import { updateUser } from "../../store/users";
import { useModal } from "../../hooks/useModal";

export default function EditProfile() {
  const col = useColorMode("#fff", "#15202B", "#000");
  const dispatch = useDispatch();
  const currentUser = useSessionUser();
  const [name, setName] = useState(currentUser.name);
  const [bio, setBio] = useState(currentUser.bio ?? "");
  const { closeModal } = useModal();
  const [image, setImage] = useState("");

  const handleClick = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("bio", bio);

    await dispatch(updateUser(formData, currentUser.id));

    closeModal();
  };

  return (
    <form
      className="edit-profile-div"
      encType="multipart/form-data"
      onSubmit={handleClick}
    >
      {/* <div className="profile-banner">
        <div className="edit-photo-div">
          <svg viewBox="0 0 24 24" width="26" height="26" className="camera-icon">
            <g>
              <path
                className="icon"
                d="M9.697 3H11v2h-.697l-3 2H5c-.276 0-.5.224-.5.5v11c0 .276.224.5.5.5h14c.276 0 .5-.224.5-.5V10h2v8.5c0 1.381-1.119 2.5-2.5 2.5H5c-1.381 0-2.5-1.119-2.5-2.5v-11C2.5 6.119 3.619 5 5 5h1.697l3-2zM12 10.5c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zm-4 2c0-2.209 1.791-4 4-4s4 1.791 4 4-1.791 4-4 4-4-1.791-4-4zM17 2c0 1.657-1.343 3-3 3v1c1.657 0 3 1.343 3 3h1c0-1.657 1.343-3 3-3V5c-1.657 0-3-1.343-3-3h-1z"
              ></path>
            </g>
          </svg>
        </div>
      </div> */}
      <Avatar boxSize="136px" border={`solid 4px ${col}`} borderRadius="100%">
        <div className="edit-photo-div">
          <svg
            viewBox="0 0 24 24"
            width="26"
            height="26"
            className="camera-icon"
          >
            <g>
              <path
                className="icon"
                d="M9.697 3H11v2h-.697l-3 2H5c-.276 0-.5.224-.5.5v11c0 .276.224.5.5.5h14c.276 0 .5-.224.5-.5V10h2v8.5c0 1.381-1.119 2.5-2.5 2.5H5c-1.381 0-2.5-1.119-2.5-2.5v-11C2.5 6.119 3.619 5 5 5h1.697l3-2zM12 10.5c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zm-4 2c0-2.209 1.791-4 4-4s4 1.791 4 4-1.791 4-4 4-4-1.791-4-4zM17 2c0 1.657-1.343 3-3 3v1c1.657 0 3 1.343 3 3h1c0-1.657 1.343-3 3-3V5c-1.657 0-3-1.343-3-3h-1z"
              ></path>
            </g>
          </svg>
        </div>
      </Avatar>
      <input
        type="text"
        className="edit-name"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <textarea
        className="edit-bio"
        placeholder="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />
      <button type="submit">Save</button>
    </form>
  );
}
