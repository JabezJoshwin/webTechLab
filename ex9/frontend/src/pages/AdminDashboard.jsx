import { useState, useEffect } from "react";
import axios from "axios";
import API_BASE from "../api";

export default function AdminDashboard() {
  const [lessons, setLessons] = useState([]);
  const [newLesson, setNewLesson] = useState({ title: "", content: "" });
  const [showQuizForm, setShowQuizForm] = useState(false);
  const [quizPayload, setQuizPayload] = useState({
    lessonId: "",
    question: "",
    options: ["", "", "", ""],
    answer: "",
  });

  const fetchLessons = async () => {
    const res = await axios.get(`${API_BASE}/lessons`);
    setLessons(res.data);
  };

  const addLesson = async () => {
    if (!newLesson.title || !newLesson.content) return alert("Fill all fields!");
    await axios.post(`${API_BASE}/lessons`, newLesson);
    setNewLesson({ title: "", content: "" });
    fetchLessons();
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  return (
    <div className="d-flex justify-content-center mt-5 px-3">
      <div style={{ maxWidth: "900px", width: "100%" }}>
        <h2 className="text-center mb-4 display-6 fw-bold">
          Admin Dashboard <span role="img" aria-label="tools">🛠️</span>
        </h2>

        <div className="card p-4 mb-5 shadow-lg border-0">
          <h4 className="mb-3 text-primary">Add New Lesson</h4>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Lesson Title"
              className="form-control form-control-lg"
              value={newLesson.title}
              onChange={e => setNewLesson({ ...newLesson, title: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <textarea
              placeholder="Lesson Content"
              className="form-control form-control-lg"
              rows={4}
              value={newLesson.content}
              onChange={e => setNewLesson({ ...newLesson, content: e.target.value })}
            />
          </div>
          <button className="btn btn-success px-4 py-2 fw-semibold" onClick={addLesson}>
            Save Lesson
          </button>
        </div>

        <div className="card p-4 mb-5 shadow-lg border-0">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="mb-0 text-primary">Add Quiz to Lesson</h4>
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={() => setShowQuizForm(!showQuizForm)}
            >
              {showQuizForm ? "Cancel" : "➕ Add Quiz"}
            </button>
          </div>

          {showQuizForm && (
            <div>
              <select
                className="form-select mb-2"
                value={quizPayload.lessonId}
                onChange={e => setQuizPayload({ ...quizPayload, lessonId: e.target.value })}
              >
                <option value="">Select Lesson</option>
                {lessons.map(l => (
                  <option key={l._id} value={l._id}>
                    {l.title}
                  </option>
                ))}
              </select>

              <input
                className="form-control mb-2"
                placeholder="Question"
                value={quizPayload.question}
                onChange={e => setQuizPayload({ ...quizPayload, question: e.target.value })}
              />
              {quizPayload.options.map((opt, i) => (
                <input
                  key={i}
                  className="form-control mb-2"
                  placeholder={`Option ${i + 1}`}
                  value={opt}
                  onChange={e => {
                    const updated = [...quizPayload.options];
                    updated[i] = e.target.value;
                    setQuizPayload({ ...quizPayload, options: updated });
                  }}
                />
              ))}

              <input
                className="form-control mb-2"
                placeholder="Correct Answer"
                value={quizPayload.answer}
                onChange={e => setQuizPayload({ ...quizPayload, answer: e.target.value })}
              />
              <div className="text-end">
                <button
                  className="btn btn-primary"
                  onClick={async () => {
                    if (!quizPayload.lessonId || !quizPayload.question || !quizPayload.answer)
                      return alert("Fill lesson, question and answer");
                    try {
                      await axios.post(`${API_BASE}/quizzes`, quizPayload);
                      setQuizPayload({
                        lessonId: "",
                        question: "",
                        options: ["", "", "", ""],
                        answer: "",
                      });
                      setShowQuizForm(false);
                      alert("Quiz added successfully");
                    } catch (err) {
                      console.error("Error adding quiz:", err);
                      alert("Failed to add quiz. Check server connection.");
                    }
                  }}
                >
                  Save Quiz
                </button>
              </div>
            </div>
          )}
        </div>

        <h4 className="mb-4 text-center text-secondary">All Lessons</h4>
        <div className="row">
          {lessons.length === 0 && (
            <div className="col-12 text-center text-muted">
              <em>No lessons added yet.</em>
            </div>
          )}
          {lessons.map(lesson => (
            <div className="col-md-6 col-lg-4 mb-4" key={lesson._id}>
              <div className="card h-100 shadow-sm border-0 transition-effect">
                <div className="card-body">
                  <h5 className="card-title text-info">{lesson.title}</h5>
                  <p className="card-text">{lesson.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <style>{`
          .transition-effect:hover {
            transform: scale(1.03);
            box-shadow: 0 8px 32px rgba(44, 62, 80, 0.15);
            transition: transform .2s ease, box-shadow .2s ease;
          }
        `}</style>
      </div>
    </div>
  );
}
