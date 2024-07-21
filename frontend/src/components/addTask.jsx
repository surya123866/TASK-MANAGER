/* eslint-disable react/prop-types */
import Modal from "react-modal";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
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

const AddTask = ({ isOpen, setIsOpen, fetchTasks }) => {
  const token = Cookies.get("token");

  const initialTaskState = {
    title: "",
    description: "",
    status: "",
  };

  const [task, setTask] = useState(initialTaskState);

  const closeModal = () => {
    setIsOpen(false);
    setTask(initialTaskState);
  };

  const handleAddTask = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`${apiUrl}/api/task/create`, task, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTask(initialTaskState);
      toast.success("Task added successfully");
      fetchTasks();
      closeModal();
    } catch (error) {
      toast.error("Error adding task");
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
      contentLabel="Add Task"
      ariaHideApp={false}
    >
      <h2 className="text-xl font-semibold mb-4">Add Task</h2>
      <form onSubmit={handleAddTask} className="space-y-4">
        <input
          className="w-full px-3 py-2 border rounded-md"
          placeholder="Task title"
          name="title"
          value={task.title}
          onChange={handleChange}
          required
        />
        <textarea
          className="w-full px-3 py-2 border rounded-md resize-none"
          placeholder="Task description"
          name="description"
          value={task.description}
          onChange={handleChange}
          required
        />
        <select
          className="w-full px-3 py-2 border rounded-md"
          name="status"
          value={task.status}
          onChange={handleChange}
          required
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
            Add
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

export default AddTask;
