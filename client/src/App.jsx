import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import TaskFormPage from "./pages/TaskFormPage";
import TasksPage from "./pages/TasksPage";
import Navigation from "./components/Navigation";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <Router>
      <div className="container mx-auto">
     
        <Navigation />
        <Routes>
          <Route path="/" element={<Navigate to="/tasks" />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/tasks-create" element={<TaskFormPage />} />
          <Route path="/tasks/:id" element={<TaskFormPage />} />
        </Routes>
      </div>
      <Toaster />
    </Router>
  );
};

export default App;
