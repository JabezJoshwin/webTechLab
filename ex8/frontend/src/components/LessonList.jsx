function LessonList({ lessons, onSelect }) {
  return (
    <div>
      <h2>Micro Lessons</h2>
      {lessons.map((lesson) => (
        <div
          key={lesson._id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            margin: "10px 0",
            borderRadius: "8px",
            cursor: "pointer",
          }}
          onClick={() => onSelect(lesson)}
        >
          <h3>{lesson.title}</h3>
          <p>{lesson.content}</p>
        </div>
      ))}
    </div>
  );
}
export default LessonList;
