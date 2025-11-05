function LessonList({ lessons, onSelect }) {
  return (
    <div>
      <h2 className="mb-4 text-center text-primary fw-bold">Micro Lessons</h2>
      {lessons.map((lesson) => (
        <div
          key={lesson._id}
          className="card mb-3 shadow-sm"
          style={{ cursor: "pointer", borderRadius: "10px" }}
          onClick={() => onSelect(lesson)}
        >
          <div className="card-body">
            <h5 className="card-title text-info">{lesson.title}</h5>
            <p className="card-text text-secondary">{lesson.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
export default LessonList;
