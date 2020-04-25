import React from 'react'
import { questionsAPI } from '../api/api';

import Question from './Question'
import './Question.css'


export default class Quiz extends React.Component {

  constructor(props) {
      super(props)
      this.state = {
        quiz: {},
        index: 0,
        answers: [],
        name: ''
      }
  }

  componentDidMount() {
    questionsAPI.getQuestions()
      .then(result => {
        console.log(result)
        this.setState({quiz: result})
        
      })

      this.setState({name: localStorage.getItem('name')});
  }

  handleSubmit() {
    if (this.state.index < this.state.quiz.length) {
      this.setState({'index': this.state.index + 1})
    } else {
      let score = this.state.score || 0
      this.state.answers.map((answer, i) => (
        score = score + this.state.quiz[i].answers[answer].point
      ))
      this.setState({'score': score})
    }
  }

  handleAnswerSelected(event) {
    let list = [...this.state.answers.slice(0, this.state.index),
                parseInt(event.target.value),
                ...this.state.answers.slice(this.state.index + 1)]
    this.setState({'answers': list})
  }

  render() {
    const {
      quiz, index, answers
    } = this.state

    let completed = (quiz && (index === quiz.length)) ? true : false
    let numberOfQuestions = quiz ? quiz.length : 0
    let score = 0
    if (completed) {
      this.state.answers.map((answer, i) => (
        score = score + this.state.quiz[i].answers[answer].correct
      ))
    }

    return (
      <section className="hero is-primary is-fullheight">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-mobile is-centered">
              <div className="column is-half">
                <div className="has-text-centered">
      <div>
        <h1 className="title has-text-centered is-3">Java Quiz</h1>
        {completed ?
        <>
          <div>
            <p className="title has-text-centered is-6">Congratulation, {this.state.name}! You have finished the Java Quiz!</p>
            Your score is <strong>{score}</strong>
            <button className="button is-primary is-inverted is-outlined is-rounded is-fullwidth" onClick={() => window.location.reload(false)}>Try again?</button>
          </div>
          
        </>
        :
          <div>
            <h1 className="title has-text-centered is-4">Nice to see you, {this.state.name}! Check your knowledge!</h1>
          <h2 className="subtitle has-text-centered is-uppercase is-7 navigation">Question {index + 1} of {numberOfQuestions}</h2>
          {quiz && index < numberOfQuestions ?
            <Question
              question={quiz[index]}
              index={index}
              onAnswerSelected={(event) => this.handleAnswerSelected(event)}
              onSubmit={() => this.handleSubmit()}
            />
          : ''}
          </div>
        }
      </div>
      </div>
      </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}