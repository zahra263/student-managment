import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5000/api/students";

function StudentForm() {
  const { id } = useParams(); // id ho to Update, nahi to Add
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    firstName: "",
    lastName: "",
    email: ""
  });
  const [error, setError] = useState("");

  // Update mode me purana data form me bharo
  useEffect(() => {
    if (id) {
      axios
        .get(`${API_URL}/${id}`)
        .then((res) =>
          setStudent({
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            email: res.data.email
          })
        )
        .catch((err) => setError(err.response?.data?.message || err.message));
    }
  }, [id]);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`${API_URL}/${id}`, student);
      } else {
        await axios.post(API_URL, student);
      }
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <section className="form-card">
      <header className="page-header">
        <div>
          <p className="eyebrow">{id ? "Student record" : "New record"}</p>
          <h1 className="page-title">{id ? "Update Student" : "Add Student"}</h1>
        </div>
      </header>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input
            type="text"
            name="firstName"
            className="app-input"
            value={student.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            name="lastName"
            className="app-input"
            value={student.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="app-input"
            value={student.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="app-button app-button-primary">
            {id ? "Update Student" : "Save Student"}
          </button>
          <button
            type="button"
            className="app-button app-button-secondary"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}

export default StudentForm;
