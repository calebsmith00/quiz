import React from 'react'
import { getQuizById, getAnswers } from './utilities'

class Quiz extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            questionId: 0,
            questions: getQuizById(props.quiz, 0),
            finalAnswers: [],
            score: 0
        }
    }
    
    handleClick = event => {
        if (this.state.questionId !== this.state.questions.length-1) this.setState({questionId: this.state.questionId + 1})
        this.setState(prevState => ({
            finalAnswers: [...prevState.finalAnswers, this.state.selectedAnswer],
            selectedAnswer: ""
        }))
        
    }

    handleRadioClick = event => {
        let answer = event.target.value;
        this.setState({
            selectedAnswer: answer
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        fetch('/api/quiz/submit-answer', {
            method: "POST",
            body: JSON.stringify({
                finalAnswers: this.state.finalAnswers,
                quiz: this.props.quiz
            })
        })
            .then(data => data.json())
            .then(response => this.setState({...this.state, score: response.finalScore}))
    }

    render() {
        return ( 
            <div>
                <form action="/api/quiz/submit-answer" method="POST" onSubmit={this.handleSubmit}>
                    {/* Loop through questions */}
                    { this.state.questions.error 
                    ? <p>{this.state.questions.error}</p>
                    : this.state.questions.map(question => {
                        // Return list of possible answers by the current question id
                        return question.id === this.state.questionId &&
                            <div key={question.id}>
                                <p>{question.title}</p>
                                {/* Add an option for each answer */}
                                {question.answers.map(answer => (
                                    <div key={answer}>
                                        <input type="radio" name="answer" value={answer} onClick={this.handleRadioClick} />
                                        <label htmlFor="answer">{answer}</label>    
                                    </div>
                                ))}
                            </div>
                    })}
                    
                    {/* Determines whether to show "Next" or "Submit" button */}
                    {this.state.questionId !== this.state.questions.length - 1 && <button onClick={this.handleClick}>Next</button>}
                    {this.state.questionId === this.state.questions.length - 1 && <button type="submit" onClick={this.handleClick}>Submit</button>}
                </form>

                {this.state.score}
            </div>
        )
    }
}

export default Quiz;