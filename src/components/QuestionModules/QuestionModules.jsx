import React from 'react';
import './QuestionModules.css';
import Modal from '../ModalWindow/Modal';

const API = 'http://localhost:8080/questions/';

export default class QuestionModules extends React.Component{

  constructor() {
    super()
    this.state = {
      username: localStorage.getItem('username'),
      jwt: localStorage.getItem("jwtToken"),
      show: false,
      questions: [],
    };


  }

  componentDidMount = () => {
    fetch(API)
		   .then(response => response.json())
		   .then(result => {
         this.setState({...this.state, questions: result})
       })
		   .catch(err => console.log(err));

  }

  deleteItem = (index) => {
    console.log(index)
    let dataItem = this.state.questions;
        fetch(`${API}${dataItem[index].id}`, {
            headers: { "Content-Type": "application/json; charset=utf-8" },
            method: 'DELETE',
            body: JSON.stringify({data: dataItem})
            }).then(res=>res.json())
            .then(res => console.log(res));

        dataItem.splice(index, 1); 
        this.setState([dataItem]);
  }

  showModal = e => {
    this.setState({
      show: !this.state.show
    });
  };

  
  questionList = () => {
    return (this.state.questions.length==0?<div id={0} className="as-container">
      <div className="as-choice-card">
        <h3><strong className="as-card-title">No Question posted yet</strong><br></br></h3>
      </div></div>:
      this.state.questions.map((item, index) => {
        return (
          <>
          <div id={index} className="as-container">
            <div className="as-choice-card">
              <h3><strong className="as-card-title">Question No. {index + 1}</strong><br></br></h3>
              <h3><strong className="as-card-title"> {item.questionContent}</strong></h3>
              <p className="as-card-info">
                {item.answers.map((item, index) => {
                return(
                <li>{item.answerContent} {item.correct == true ? "(true)" : "(false)"}</li>
                )
                })}
              </p>
              <button className="as-card-cta" onClick={() => { if (window.confirm('Are you sure?'))  this.deleteItem(index) }}>
                Delete
              </button>
            </div>
          </div>
          </>
        );
      })
    )
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



  
  logOut = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('username');
    window.location.replace('/');
  }


    render(){
        return (
            <>
            <nav className="navbar navbar-inverse navbar-fixed-top">
              <div className="navbar-header"> <img
                  src="/img.png"
                  alt="Clearwater Analytics"
              /></div>
  <div className="container">

    <div className="navbar-header">
      <button className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>

      <a className="navbar-brand">Admin Panel</a>
    </div>
    <div className="collapse navbar-collapse">
      <ul className="nav navbar-nav navbar-right">
        <li><a href="#"><span className="glyphicon glyphicon-user">&nbsp;</span>Hello, {this.state.username}</a></li>
        <li className="active"><a title="View Website" href="#"><span className="glyphicon glyphicon-globe"></span></a></li>
        <li><a href="#" onClick={() => this.logOut()}>Logout</a></li>
      </ul>
    </div>
  </div>
</nav>
<div className="container-fluid">
  <div className="col-md-3">

    <div id="sidebar">
      {/* <div className="container-fluid tmargin">
        <div className="input-group">
          <input type="text" className="form-control" placeholder="Search..." />
          <span className="input-group-btn">
              <button className="btn btn-default"><span className="glyphicon glyphicon-search"></span></button>
          </span>
        </div>
      </div> */}

      <ul className="nav navbar-nav side-bar">

        <li className="side-bar tmargin"><a href="#"><span className="glyphicon glyphicon-list">&nbsp;</span>Dashboard</a></li>
        <li className="side-bar"><a onClick={e => {
              this.showModal();
         }} href="#"><span className="glyphicon glyphicon-flag">&nbsp;</span>Add question</a></li>

      </ul>
    </div>
  </div>
  <div className="col-md-9 animated bounce">
    <Modal onClose={e => this.showModal()} show={this.state.show}>
          Message in Modal
    </Modal>
    {this.state.jwt ? this.questionList() : "Log in to your account, please!"}
  </div>
</div>
            </>
        )
    }
}