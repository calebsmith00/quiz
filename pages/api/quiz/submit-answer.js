export default function handler(req, res) {
    if (req.method === "GET") return false
    let data = JSON.parse(req.body)
    console.log(data)
    let correctAnswers = 0
    data.quiz.map((question, index) => {
        if (question.correctAnswer == data.finalAnswers[index]) correctAnswers++
    })

    let formatPercentage = `${(correctAnswers / data.finalAnswers.length) * 100}%`
    res.status(200).json({finalScore: formatPercentage})
}