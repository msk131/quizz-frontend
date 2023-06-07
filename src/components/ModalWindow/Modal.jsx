import React from "react";
import './Modal.css';

const API = 'http://localhost:8080/questions/';

export default class Modal extends React.Component {
    constructor() {
        super()
        this.state = {
            jwt: localStorage.getItem("jwtToken"),
            questions: [],
    
            question: "",
    
            option_1: "",
            correct_1: false,
    
            option_2: "",
            correct_2: false,
    
            option_3: "",
            correct_3: false,
    
            option_4: "",
            correct_4: false,
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCorrectAnswerChange = this.handleCorrectAnswerChange.bind(this);
      }
    handleChange(e){
		let target = e.target;
		let value = target.value;
    let name = target.name;
    console.log(value)

		this.setState({
			[name]: value
		});
  }

  handleCorrectAnswerChange(e){
    let target = e.target;
    let checked = target.checked;
    let name = target.name;
    console.log(checked)
 
		this.setState({
			[name]: checked
		});
  }

  handleSubmit(){
    if(this.state.question && this.state.option_1 && this.state.option_2 && this.state.option_3 && this.state.option_4)
    this.postQuestion();
  }

  postQuestion = () => {
    console.log("question: " + this.state.question);
    console.log("option_1: " + this.state.option_1);
    console.log("correct_1: " + this.state.correct_1);

    fetch(API, {
      method: 'post',
      headers: {
        Accept: 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          questionContent: this.state.question,
          answers: [
            {
              answerContent: this.state.option_1,
              correct: this.state.correct_1,
            },
            {
              answerContent: this.state.option_2,
              correct: this.state.correct_2,
            },
            {
              answerContent: this.state.option_3,
              correct: this.state.correct_3,
            },
            {
              answerContent: this.state.option_4,
              correct: this.state.correct_4,
            }
          ],
        },)
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
      window.location.reload();

  }

  modalContent = () => {
      return(

          <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog"
               aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                  <div className="modal-content">
                      <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                          </button>
                      </div>
                      <div className="modal-body">
                          ...
                      </div>
                      <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-dismiss="modal">Close
                          </button>
                          <button type="button" className="btn btn-primary">Save changes</button>
                      </div>
                  </div>
              </div>
          </div>
      )
  }


    onClose = e => {
        this.props.onClose && this.props.onClose(e);
      };

    render() {
      if (!this.props.show) {
        return null;
      }
      return (
        <>
        {this.state.jwt ? this.modalContent() : ""}
        </>
      )
    }
}