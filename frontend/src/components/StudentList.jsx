import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5000/api/students";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");   // input box ki value
  const [keyword, setKeyword] = useState(""); // Search button dabane par set hoti he
  const navigate = useNavigate();

  const fetchStudents = async () => {
    try {
      const res = await axios.get(API_URL);
      setStudents(res.data.students);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const deleteStudent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchStudents();
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setKeyword(search);
  };

  // Frontend me filter (backend change nahi kiya)
  const filteredStudents = students.filter((s) =>
    `${s.firstName} ${s.lastName} ${s.email}`
      .toLowerCase()
      .includes(keyword.trim().toLowerCase())
  );

  return (
    <section>
      <header className="page-header">
        <div>
          <p className="eyebrow">Management</p>
          <h1 className="page-title">Student Directory</h1>
        </div>
        <button className="app-button app-button-primary" onClick={() => navigate("/add")}>
          + Add Student
        </button>
      </header>

      <div className="toolbar">
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            className="app-input flex-grow-1"
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className="app-button app-button-primary">
            Search
          </button>
        </form>
      </div>

      <div className="data-card">
        <table className="table student-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length === 0 ? (
              <tr>
                <td colSpan="4" className="empty-state text-center">
                  No students found
                </td>
              </tr>
            ) : (
              filteredStudents.map((student) => (
                <tr key={student._id}>
                  <td className="student-name">{student.firstName}</td>
                  <td>{student.lastName}</td>
                  <td className="student-email">{student.email}</td>
                  <td>
                    <div className="action-group">
                      <button
                        className="app-button app-button-primary"
                        onClick={() => navigate(`/edit/${student._id}`)}
                      >
                        Edit
                      </button>
                      <button
                        className="app-button app-button-danger"
                        onClick={() => deleteStudent(student._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default StudentList;