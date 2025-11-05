import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container d-flex flex-column align-items-center mt-5 px-3" style={{ maxWidth: '600px' }}>
      <h1 className="fw-bold mb-3 display-5">
        📘 Micro Learning & Quiz App
      </h1>
      <p className="text-muted fs-5 mb-4 text-center">
        Learn bite-sized lessons and test your knowledge with quizzes!
      </p>
      <div>
        <Link to="/login" className="btn btn-primary btn-lg me-3 shadow-sm">
          Login
        </Link>
        <Link to="/signup" className="btn btn-outline-secondary btn-lg shadow-sm">
          Sign Up
        </Link>
      </div>
    </div>
  );
}
