/* eslint-disable react/prop-types */

import DropArea from "./dropArea";
import TaskCard from "./taskCard";

const TaskColumn = ({
  title,
  status,
  tasks,
  searchTerm,
  onDragStart,
  onDrop,
  handleDelete,
  handleEdit,
  handleViewDetails,
}) => {
  const filteredTasks = tasks.filter(
    (task) =>
      task.status === status &&
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderTasks = () => {
    if (filteredTasks.length === 0) {
      return (
        <p className="text-center font-semibold text-lg">No {status} tasks</p>
      );
    }
    return filteredTasks.map((task) => (
      <TaskCard
        key={task.id}
        task={task}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        handleViewDetails={handleViewDetails}
        onDragStart={onDragStart}
      />
    ));
  };

  return (
    <div
      className="bg-white p-6 rounded-lg shadow-md"
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => onDrop(status)}
    >
      <div className="bg-[#5596f5] px-2">
        <h2 className="text-2xl mb-4 font-bold text-white">{title}</h2>
      </div>
      <DropArea />
      {renderTasks()}
    </div>
  );
};

export default TaskColumn;
