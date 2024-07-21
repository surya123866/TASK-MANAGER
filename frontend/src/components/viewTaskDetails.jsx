/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
const apiUrl = import.meta.env.VITE_API_URL;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    maxWidth: "90%",
    maxHeight: "90%",
    width: "100%",
    height: "auto",
    backgroundColor: "white",
    padding: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
};

const ViewTask = ({ isOpen, setIsOpen, taskId }) => {
  const token = Cookies.get("token");
  const [task, setTask] = useState(null);

  useEffect(() => {
    if (!isOpen) return;

    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/task/${taskId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTask(response.data.task);
      } catch (error) {
        toast.error("Error fetching task");
      }
    };

    fetchTasks();
  }, [token, taskId, isOpen]);

  const closeModal = () => {
    setIsOpen(false);
    setTask(null);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Task Details"
      ariaHideApp={false}
    >
      <h2 className="text-lg md:text-xl font-semibold mb-4">Task Details</h2>
      {task ? (
        <div>
          <h3 className="text-base md:text-lg font-medium">
            Title: {task.title}
          </h3>
          <p className="text-gray-700 mt-2 text-sm md:text-base">
            Description: {task.description}
          </p>
          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Created at: {new Date(task.createdAt).toLocaleString()}
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <button
        onClick={closeModal}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm md:text-base"
      >
        Close
      </button>
    </Modal>
  );
};

export default ViewTask;
