import DropArea from "./dropArea";

/* eslint-disable react/prop-types */
const TaskCard = ({
  task,
  handleDelete,
  handleEdit,
  handleViewDetails,
  onDragStart,
}) => {
  return (
    <>
      <div
        className="bg-[#d2e6fa] p-4 mb-4 rounded shadow-lg space-y-5 border-2"
        draggable
        onDragStart={() => onDragStart(task)}
      >
        <div>
          <h3 className="text-xl font-semibold">Task: {task.title}</h3>
          <p className="text-md font-normal">Description: {task.description}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">
            Created at: {new Date(task.createdAt).toLocaleString()}
          </p>
          <div className="mt-4 flex gap-2 justify-end">
            <button
              onClick={() => handleDelete(task.id)}
              className="bg-[#f56464] text-white px-2 py-1 rounded"
            >
              Delete
            </button>
            <button
              onClick={() => handleEdit(task.id)}
              className="bg-[#5999f5] text-white px-2 py-1 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleViewDetails(task.id)}
              className="bg-[#3273f5] text-white px-2 py-1 rounded"
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
