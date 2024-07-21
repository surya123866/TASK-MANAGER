/* eslint-disable react/prop-types */
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "35%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    maxWidth: "90%",
    maxHeight: "90%",
    width: "auto",
    height: "auto",
    backgroundColor: "white",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
};

const avatar =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv_oL1l60gN7zHc_fMS11OeFR-mLDi3DgjNg&s";

const Profile = ({ profile, isOpen, setIsOpen }) => {
  const { picture, name, email } = profile;

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Profile Details"
      ariaHideApp={false}
    >
      <div className="flex flex-col items-center justify-center w-full h-full">
        <img
          src={picture || avatar}
          alt="userImage"
          className="w-24 h-24 rounded-full mb-4" // Adjusted size and margin
        />
        <p className="font-semibold text-center">{name}</p>
        <p className="font-semibold text-center">{email}</p>
      </div>
    </Modal>
  );
};

export default Profile;
