import { Routes, Route } from "react-router-dom";
import StudentList from "./components/StudentList";
import StudentForm from "./components/StudentForm";
import "./App.css";

function App() {
  return (
    <div className="app-shell">
      <main className="app-main">
        <Routes>
          <Route path="/" element={<StudentList />} />
          <Route path="/add" element={<StudentForm />} />
          <Route path="/edit/:id" element={<StudentForm />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;