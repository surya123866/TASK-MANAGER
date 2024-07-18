/* eslint-disable react/prop-types */
import Modal from "react-modal";
import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
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

const EditTask = ({ isOpen, setIsOpen, taskId }) => {
  const token = Cookies.get("token");

  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "",
  });

  useEffect(() => {
    if (!isOpen) return;

    const fetchTask = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/task/${taskId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { title, description, status } = response.data.task;
        setTask({ title, description, status });
      } catch (error) {
        toast.error("Error fetching task");
      }
    };

    fetchTask();
  }, [isOpen, taskId, token]);

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3000/api/task/${taskId}`,
        task,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTask(response.data.task);
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
      <div className="bg-white p-6">
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
      </div>
    </Modal>
  );
};

export default EditTask;
