/* eslint-disable no-unused-vars */
import { useState } from "react";
import DropArea from "./dropArea";

/* eslint-disable react/prop-types */
const TaskCard = ({
  task,
  handleDelete,
  handleEdit,
  handleViewDetails,
  onDragStart,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e) => {
    setIsDragging(true);
    onDragStart(task);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <>
      <div
        className={`bg-[#d2e6fa] p-6 mb-4 rounded-lg shadow-md border-2 border-[#a8c6f1] transition-transform transform ${
          isDragging ? "bg-[#b8d3fa] border-[#8cb4f5]" : ""
        } hover:scale-105 cursor-pointer`}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="mb-4">
          <h3 className="text-2xl font-semibold text-[#333]">
            Task: {task.title}
          </h3>
          <p className="text-md font-normal text-[#555] mt-2">
            {task.description}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">
            Created at: {new Date(task.createdAt).toLocaleString()}
          </p>
          <div className="mt-4 flex gap-2 justify-end">
            <button
              onClick={() => handleDelete(task.id)}
              className="bg-[#f56464] text-white px-4 py-2 rounded-lg transition-colors hover:bg-[#d44a4a]"
            >
              Delete
            </button>
            <button
              onClick={() => handleEdit(task.id)}
              className="bg-[#5999f5] text-white px-4 py-2 rounded-lg transition-colors hover:bg-[#4683d7]"
            >
              Edit
            </button>
            <button
              onClick={() => handleViewDetails(task.id)}
              className="bg-[#3273f5] text-white px-4 py-2 rounded-lg transition-colors hover:bg-[#285bcb]"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
      <DropArea />
    </>
  );
};

export default TaskCard;
