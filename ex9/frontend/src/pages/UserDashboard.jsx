import { useState, useEffect } from "react";
import axios from "axios";
import API_BASE from "../api";
import Quiz from "../components/Quiz";

export default function UserDashboard() {
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);

  const fetchLessons = async () => {
    const res = await axios.get(`${API_BASE}/lessons`);
    setLessons(res.data);
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  if (selectedLesson)
    return <Quiz lesson={selectedLesson} onBack={() => setSelectedLesson(null)} />;

  return (
    <div className="container mt-5" style={{ maxWidth: "1200px" }}>
      <h1 className="text-center mb-5 display-4 fw-bold">Welcome Learner <span role="img" aria-label="wave">👋</span></h1>
      <div className="row g-4 justify-content-center">
        {lessons.length === 0 && (
          <div className="col-12 text-center text-muted fst-italic">
            No lessons available at the moment.
          </div>
        )}
        {lessons.map((lesson) => (
          <div className="col-md-6 col-lg-4" key={lesson._id} style={{ maxWidth: "400px" }}>
            <div 
              className="card h-100 rounded-4 border-0 shadow-lg" 
              style={{ 
                background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '';
              }}
            >
              <div className="card-body d-flex flex-column p-4">
                <h3 className="card-title h4 fw-bold text-primary mb-3">{lesson.title}</h3>
                <p className="card-text flex-grow-1 text-secondary mb-4" style={{ fontSize: '1.1rem' }}>{lesson.content}</p>
                <button
                  className="btn btn-primary btn-lg mt-auto fw-semibold w-100 rounded-3"
                  onClick={() => setSelectedLesson(lesson)}
                >
                  Start Quiz
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
