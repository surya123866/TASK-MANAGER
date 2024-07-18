import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/signup";
import Login from "./components/login";
import NotFound from "./components/not-found";
import Dashboard from "./components/dashboard";
import ProtectedRoute from "./components/protectedRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
