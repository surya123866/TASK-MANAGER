/* eslint-disable react/prop-types */
import Modal from "react-modal";
import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
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

const EditTask = ({ isOpen, setIsOpen, taskId, fetchTasks }) => {
  const token = Cookies.get("token");

  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "",
  });

  useEffect(() => {
    if (!isOpen) return;

    const fetchViewTask = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/task/${taskId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { title, description, status } = response.data.task;
        setTask({ title, description, status });
      } catch (error) {
        toast.error("Error fetching task");
      }
    };

    fetchViewTask();
  }, [isOpen, taskId, token]);

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`${apiUrl}/api/task/${taskId}`, task, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTask(response.data.task);
      fetchTasks();
      toast.success("Task updated successfully");
      closeModal();
    } catch (error) {
      toast.error("Error updating task");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Edit Task"
      ariaHideApp={false}
    >
      <h2 className="text-xl font-semibold mb-4">Edit Task</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          className="w-full px-3 py-2 border rounded-md"
          placeholder="Edit task title"
          name="title"
          value={task.title}
          onChange={handleChange}
        />
        <textarea
          className="w-full px-3 py-2 border rounded-md resize-none"
          placeholder="Edit task description"
          name="description"
          value={task.description}
          onChange={handleChange}
        />
        <select
          className="w-full px-3 py-2 border rounded-md"
          name="status"
          value={task.status}
          onChange={handleChange}
        >
          <option value="">Select status</option>
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <div className="flex space-x-2">
          <button
            type="submit"
            className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Update
          </button>
          <button
            onClick={closeModal}
            className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditTask;
