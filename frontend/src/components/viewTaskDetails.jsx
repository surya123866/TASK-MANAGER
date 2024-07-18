/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const ViewTask = ({ isOpen, setIsOpen, taskId }) => {
  const token = Cookies.get("token");
  const [task, setTask] = useState(null);

  useEffect(() => {
    if (!isOpen) return; // Only fetch task if modal is open

    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/task/${taskId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTask(response.data.task);
      } catch (error) {
        toast.error("Error fetching task");
      }
    };

    fetchTasks();
  }, [token, taskId, isOpen]);

  const closeModal = () => {
    setIsOpen(false);
    setTask(null); // Clear task data when modal is closed
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Task Details"
      ariaHideApp={false}
    >
      <div className="bg-white p-6">
        <h2 className="text-xl font-semibold mb-4">Task Details</h2>
        {task ? (
          <div>
            <h3 className="text-lg font-medium">Title: {task.title}</h3>
            <p className="text-gray-700 mt-2">
              Description: {task.description}
            </p>
            <p className="text-gray-500 mt-2">
              Created at: {new Date(task.createdAt).toLocaleString()}
            </p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
        <button
          onClick={closeModal}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default ViewTask;
