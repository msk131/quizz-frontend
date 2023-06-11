import React from 'react'
import './Question.css';

const Question = (props) => {

  console.log(props)
  return (
    <div>

      <h5 className="subtitle has-text-centered is-5">{props.question.questionContent}</h5>

      <ol className="">
      {props.question.answers.map((answer, i) =>
        <li type="A" key={`${props.index}-${i}`} >
          <input id="radio1" name="radio"  type="radio" name={`question_${props.index}`} id={`question_${props.index}_answer_${i}`} defaultChecked={false} value={i} onChange={props.onAnswerSelected} />
          {' '}
          <label htmlFor="radio" htmlFor={`question_${props.index}_answer_${i}`}>{answer.answerContent}</label>
        </li>
      )} 
      </ol>
      <button className="button  is-primary is-outlined is-rounded"  onClick={props.onSubmit}>Next</button>
        
    </div>
  )
}

export default Question