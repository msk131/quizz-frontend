import React from "react";

const API = 'http://localhost:8080/module/json';
const MODULES_API = 'http://localhost:8080/module/';

export default class QuestionModal extends React.Component {
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

            moduleId:'',
            json:''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCorrectAnswerChange = this.handleCorrectAnswerChange.bind(this);
        this.handleSelectedModule=this.handleSelectedModule.bind(this);
    }
    redirect()
    {
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
    componentDidMount = () => {
        this.getModules();
    }
    getModules = () => {
        this.setState({...this.state, showHide:"d-none"})
        fetch(`${MODULES_API}`, {
            headers: { "Content-Type": "application/json; charset=utf-8" },
            method: 'GET',
        }).then(res=>res.json())
            .then(res => {
                this.setState({...this.state, options: res});
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

    handleSelectedModule(e){

        let value = e.value;
        this.setState({...this.state, moduleId: value});
    }

    handleSubmit(e){
        e.preventDefault()
        if(this.state.question && this.state.option_1 && this.state.option_2)
            this.postQuestion();
    }

    postQuestion = async () => {

        console.log("question: " + this.state.question);
        console.log("option_1: " + this.state.option_1);
        console.log("correct_1: " + this.state.correct_1);

        await fetch(MODULES_API, {
            method: 'post',
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: this.state.moduleId,
                questions: [{
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
                    ]
                }],
            },)
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
                localStorage.setItem("message", "Questions created successfully");
                localStorage.setItem("showHide", "");
            })
            .catch((error) => {
                console.log(error)
                localStorage.setItem("message", error);
                localStorage.setItem("showHide", "");
            });
            window.location="/admin"
    }

    modalContent = () => {
        return(
            <div className="col-12">
                <div className="row border bg-secondary-subtle border-secondary  ">
                    <div className="col-12 mt-2">
                        <h4 className="has-text-centered bg-secondary-subtle">Create the Questions</h4>
                    </div>
                </div>

                <div className="row  border border-secondary ">
                    <div className="container ">
                        <form className="form-inline" onSubmit={(e) => this.handleSubmit(e)}>

                            <div className="form-group m-1">
                                <select name="moduleId" className="form-select" id="moduleSelect" value={this.state.moduleId} aria-label="Select Module Name" onChange={this.handleChange}>
                                    <option>Select Module Name</option>
                                    {this.state.options?.map(currentOption => (
                                        <option key={currentOption.id +50} value={currentOption.id}>
                                            {currentOption.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group m-1">
                                <label htmlFor="question">Question:  </label>
                                <input type="text" className="form-control" id="question"
                                       aria-describedby="emailHelp" placeholder="Enter the Question"  name="question" value={this.state.question} onChange={this.handleChange} />

                            </div>
                            <div className="row">
                                <div className="col-8">
                                </div>
                                <div className="col-4 pl-3">
                                    <strong>True/False </strong>

                                </div>

                            </div>

                            <div className="form-group m-1">
                                <label htmlFor="option1">Option 1: </label>
                                <input type="text" className="form-control" id="option1"
                                       aria-describedby="emailHelp" placeholder="Option 1"  name="option_1" value={this.state.option_1} onChange={this.handleChange} />

                            </div>
                            <div className="form-group ">
                                <input type="checkbox" name="correct_1" value={this.state.correct_1} onChange={this.handleCorrectAnswerChange} />

                            </div>

                            <div className="form-group m-1">
                                <label htmlFor="option2">Option 2: </label>
                                <input type="text" className="form-control" id="option2"
                                       aria-describedby="emailHelp" placeholder="Option 2" name="option_2" value={this.state.option_2} onChange={this.handleChange} />

                            </div>
                            <div className="form-group">
                                <input type="checkbox" name="correct_2" value={this.state.correct_2} onChange={this.handleCorrectAnswerChange}/>
                            </div>
                            <div className="form-group m-1">
                                <label htmlFor="option3">Option 3: </label>
                                <input type="text" className="form-control" id="option3"
                                       aria-describedby="emailHelp" placeholder="Option 3" name="option_3" value={this.state.option_3} onChange={this.handleChange} />

                            </div>
                            <div className="form-group">
                                <input type="checkbox" name="correct_3" value={this.state.correct_3}  onChange={this.handleCorrectAnswerChange}/>
                            </div>
                            <div className="form-group m-1">
                                <label htmlFor="option4">Option 4: </label>
                                <input type="text" className="form-control" id="option4"
                                       aria-describedby="emailHelp" placeholder="Option 4"  name="option_4" value={this.state.option_4} onChange={this.handleChange} />

                            </div>
                            <div className="form-group">
                                <input type="checkbox" name="correct_4" value={this.state.correct_4} onChange={this.handleCorrectAnswerChange}/>
                            </div>
                            <div className="form-group row m-2">
                                <button type="submit" className="btn btn-info" value="Send">Create</button>
                            </div>


                        </form>
                    </div>
                </div>
                <div>
                </div>
            </div>
        )
    }
    render() {
        return (
            <>
                {this.state.jwt ? this.modalContent() : ""}
            </>
        )
    }
}