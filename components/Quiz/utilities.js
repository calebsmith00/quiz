export const getQuizById = (quiz, id) => {
    let questions = quiz.filter(question => question.quizId === id && question)
    if (questions.length === 0) return {error: "ERROR: Invalid quiz ID"}

    return questions
}

export const getAnswers = answers => {
    return answers.map(answer => (
        <div key={answer}>
            <input type="radio" name="answer" value={answer} />
            <label htmlFor="answer">{answer}</label>    
        </div>
    ))
}