import { useEffect, useState } from "react";
import axios from "axios";

function Quiz({ lesson, onBack }) {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newQuiz, setNewQuiz] = useState({
    question: "",
    options: ["", "", "", ""],
    answer: "",
  });

  // ✅ Fetch quizzes directly inside useEffect (no ESLint warning)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5001/api/quizzes/${lesson._id}`
        );
        setQuestions(res.data);
      } catch (err) {
        console.error("Error fetching quizzes:", err);
      }
    };
    fetchData();
  }, [lesson]);

  const handleSubmit = () => {
    let s = 0;
    questions.forEach((q) => {
      if (answers[q._id] === q.answer) s++;
    });
    setScore(s);
  };

  const handleAddQuiz = async () => {
    if (!newQuiz.question || !newQuiz.answer) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post("http://localhost:5001/api/quizzes", {
        lessonId: lesson._id,
        ...newQuiz,
      });

      // Reset form and refetch quizzes
      setNewQuiz({ question: "", options: ["", "", "", ""], answer: "" });
      setShowAddForm(false);

      // ✅ Refetch updated quizzes
      const res = await axios.get(
        `http://localhost:5001/api/quizzes/${lesson._id}`
      );
      setQuestions(res.data);
    } catch (err) {
      console.error("Error adding quiz:", err);
      alert("Failed to add quiz. Please check server connection.");
    }
  };

  return (
    <div className="container mt-5">
      <button className="btn btn-link mb-3" onClick={onBack}>
        ← Back to Lessons
      </button>

      <h2 className="fw-bold mb-4 text-center">{lesson.title} - Quiz</h2>

      <div className="text-end mb-3">
        <button
          className="btn btn-primary"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? "Cancel" : "➕ Add New Question"}
        </button>
      </div>

      {showAddForm && (
        <div className="card p-4 mb-4 shadow-sm">
          <h5 className="mb-3">Add Quiz Question</h5>
          <input
            className="form-control mb-2"
            placeholder="Question"
            value={newQuiz.question}
            onChange={(e) =>
              setNewQuiz({ ...newQuiz, question: e.target.value })
            }
          />
          {newQuiz.options.map((opt, i) => (
            <input
              key={i}
              className="form-control mb-2"
              placeholder={`Option ${i + 1}`}
              value={opt}
              onChange={(e) => {
                const updated = [...newQuiz.options];
                updated[i] = e.target.value;
                setNewQuiz({ ...newQuiz, options: updated });
              }}
            />
          ))}
          <input
            className="form-control mb-3"
            placeholder="Correct Answer"
            value={newQuiz.answer}
            onChange={(e) =>
              setNewQuiz({ ...newQuiz, answer: e.target.value })
            }
          />
          <button className="btn btn-success" onClick={handleAddQuiz}>
            💾 Save Question
          </button>
        </div>
      )}

      {questions.length === 0 ? (
        <p className="text-center text-muted">
          No questions yet for this lesson.
        </p>
      ) : (
        questions.map((q) => (
          <div key={q._id} className="card mb-3 shadow-sm p-3">
            <h5>{q.question}</h5>
            {q.options.map((opt, idx) => (
              <div key={idx} className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  name={q._id}
                  value={opt}
                  onChange={() =>
                    setAnswers((prev) => ({ ...prev, [q._id]: opt }))
                  }
                />
                <label className="form-check-label">{opt}</label>
              </div>
            ))}
          </div>
        ))
      )}

      {questions.length > 0 && (
        <div className="text-center mt-4">
          <button className="btn btn-primary" onClick={handleSubmit}>
            Submit Quiz
          </button>
        </div>
      )}

      {score !== null && (
        <div className="alert alert-info text-center mt-3">
          <strong>Score:</strong> {score} / {questions.length}
        </div>
      )}
    </div>
  );
}

export default Quiz;
