import Quiz from '../components/Quiz'

const QUIZ_DATA = [
  {
    id: 0,
    quizId: 0,
    title: "Sample Title",
    answers: ["Sample 1", "Sample 2", "Sample 3", "Sample 4"],
    correctAnswer: "Sample 3"
  },
  {
    id: 1,
    quizId: 0,
    title: "Jellybean",
    answers: ["Yes 1", "No 2", "Yes 3", "No 4"],
    correctAnswer: "No 2"
  }
]

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Quiz quiz={QUIZ_DATA} />
    </div>
  )
}
