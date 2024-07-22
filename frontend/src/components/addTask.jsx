/* eslint-disable react/prop-types */
import Modal from "react-modal";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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

const schema = yup.object().shape({
  title: yup
    .string()
    .trim()
    .min(3, "Title cannot be empty")
    .required("Title is required"),
  description: yup
    .string()
    .trim()
    .min(3, "Description cannot be empty")
    .required("Description is required"),
  status: yup
    .string()
    .oneOf(["todo", "in-progress", "done"], "Invalid status")
    .required("Status is required"),
});

const AddTask = ({ isOpen, setIsOpen, fetchTasks }) => {
  const token = Cookies.get("token");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const closeModal = () => {
    setIsOpen(false);
    reset();
  };

  const handleAddTask = async (data) => {
    try {
      await axios.post(`${apiUrl}/api/task/create`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      reset();
      toast.success("Task added successfully");
      fetchTasks();
      closeModal();
    } catch (error) {
      toast.error("Error adding task");
    }
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
      <form onSubmit={handleSubmit(handleAddTask)} className="space-y-4">
        <input
          className="w-full px-3 py-2 border rounded-md"
          placeholder="Task title"
          {...register("title")}
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        <textarea
          className="w-full px-3 py-2 border rounded-md resize-none"
          placeholder="Task description"
          {...register("description")}
        />
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}
        <select
          className="w-full px-3 py-2 border rounded-md"
          {...register("status")}
        >
          <option value="">Select status</option>
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        {errors.status && (
          <p className="text-red-500">{errors.status.message}</p>
        )}
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
