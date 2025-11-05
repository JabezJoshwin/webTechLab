import { useEffect, useState } from "react";
import axios from "axios";
import Quiz from "./components/Quiz";

let API_BASE = import.meta.env.API_BASE;

function App() {
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newLesson, setNewLesson] = useState({ title: "", content: "" });

  const fetchLessons = async () => {
    const res = await axios.get(API_BASE);
    setLessons(res.data);
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  const handleAddLesson = async () => {
    if (!newLesson.title || !newLesson.content) return alert("Please fill all fields!");
    await axios.post("http://localhost:5001/api/lessons", newLesson);
    setNewLesson({ title: "", content: "" });
    setShowAddForm(false);
    fetchLessons();
  };

  if (selectedLesson) {
    return <Quiz lesson={selectedLesson} onBack={() => setSelectedLesson(null)} />;
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4 fw-bold">📚 Micro Learning & Quiz App</h1>

      <div className="text-end mb-3">
        <button
          className="btn btn-primary"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? "Cancel" : "➕ Add New Lesson"}
        </button>
      </div>

      {showAddForm && (
        <div className="card p-4 mb-4 shadow-sm">
          <h5 className="mb-3">Add a New Lesson</h5>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Lesson Title"
            value={newLesson.title}
            onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })}
          />
          <textarea
            className="form-control mb-3"
            placeholder="Lesson Content"
            value={newLesson.content}
            onChange={(e) => setNewLesson({ ...newLesson, content: e.target.value })}
          />
          <button className="btn btn-success" onClick={handleAddLesson}>
            💾 Save Lesson
          </button>
        </div>
      )}

      <div className="row">
        {lessons.map((lesson) => (
          <div className="col-md-4 mb-4" key={lesson._id}>
            <div className="card shadow-sm h-100">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold">{lesson.title}</h5>
                <p className="card-text flex-grow-1">{lesson.content}</p>
                <button
                  className="btn btn-outline-primary mt-auto"
                  onClick={() => setSelectedLesson(lesson)}
                >
                  Start Quiz →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {lessons.length === 0 && (
        <p className="text-center text-muted mt-4">No lessons available yet.</p>
      )}
    </div>
  );
}

export default App;
