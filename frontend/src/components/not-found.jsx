import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 text-blue-500">404</h1>
        <p className="text-2xl mb-4 text-blue-500">Page Not Found</p>
        <Link to="/" className="text-blue-500 text-lg">
          Go back to Tasks
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
