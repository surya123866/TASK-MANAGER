import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import TaskColumn from "./taskColumn";
import AddTask from "./addTask";
import ViewTask from "./viewTaskDetails";
import EditTask from "./editTask";
import Navbar from "./navbar";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const token = Cookies.get("token");
  const [editModalIsOpen, setEditIsOpen] = useState(false);
  const [editTaskId, setEditTaskId] = useState();
  const [viewModalIsOpen, setViewIsOpen] = useState(false);
  const [viewTaskId, setViewTaskId] = useState();
  const [addModalIsOpen, setAddIsOpen] = useState(false);
  const [draggingTask, setDraggingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(response.data);
    } catch (error) {
      toast.error("Error fetching tasks");
    }
  };

  const handleAdd = () => {
    setAddIsOpen(true);
  };

  const handleSortBy = (value) => {
    let sortedTasks = [...tasks];
    if (value === "recent") {
      sortedTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (value === "oldest") {
      sortedTasks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }
    setTasks(sortedTasks);
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3000/api/task/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(tasks.filter((task) => task.id !== taskId));
      toast.success("Task deleted successfully");
    } catch (error) {
      toast.error("Error deleting task");
    }
  };

  const handleEdit = (taskId) => {
    setEditIsOpen(true);
    setEditTaskId(taskId);
  };

  const handleViewDetails = (taskId) => {
    setViewIsOpen(true);
    setViewTaskId(taskId);
  };

  const onDragStart = (task) => {
    setDraggingTask(task);
  };

  const onDrop = async (status) => {
    if (draggingTask) {
      try {
        const updatedTask = { ...draggingTask, status };
        await axios.put(
          `http://localhost:3000/api/task/${draggingTask.id}`,
          updatedTask,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTasks(
          tasks.map((task) =>
            task.id === draggingTask.id ? updatedTask : task
          )
        );
        setDraggingTask(null);
      } catch (error) {
        toast.error("Error updating task");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-8">
        <button
          className="bg-[#3273f5] text-white font-bold py-2 rounded px-10"
          onClick={handleAdd}
        >
          Add Task
        </button>
        <div className="flex justify-between mb-4 p-4 rounded shadow-lg">
          <div className="flex gap-1 items-center">
            <p className="font-bold">Search:</p>
            <input
              type="text"
              placeholder="Search..."
              className="p-2 border rounded"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-1 items-center">
            <p className="font-bold">Sort By:</p>
            <select
              className="p-2 border rounded"
              onChange={(e) => handleSortBy(e.target.value)}
            >
              <option value="recent">Recent</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <TaskColumn
            title={"TODO"}
            status="todo"
            tasks={tasks}
            searchTerm={searchTerm}
            onDrop={onDrop}
            onDragStart={onDragStart}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handleViewDetails={handleViewDetails}
          />
          <TaskColumn
            title={"IN PROGRESS"}
            status="in-progress"
            tasks={tasks}
            searchTerm={searchTerm}
            onDrop={onDrop}
            onDragStart={onDragStart}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handleViewDetails={handleViewDetails}
          />
          <TaskColumn
            title={"DONE"}
            status="done"
            tasks={tasks}
            searchTerm={searchTerm}
            onDrop={onDrop}
            onDragStart={onDragStart}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handleViewDetails={handleViewDetails}
          />
        </div>
        <EditTask
          isOpen={editModalIsOpen}
          setIsOpen={setEditIsOpen}
          taskId={editTaskId}
          fetchTasks={fetchTasks}
        />
        <ViewTask
          isOpen={viewModalIsOpen}
          setIsOpen={setViewIsOpen}
          taskId={viewTaskId}
        />
        <AddTask
          isOpen={addModalIsOpen}
          setIsOpen={setAddIsOpen}
          fetchTasks={fetchTasks}
        />
      </div>
    </>
  );
};

export default Dashboard;
