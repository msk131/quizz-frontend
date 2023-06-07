import React from 'react';
import './AdminPanel.css';
import Modal from '../ModalWindow/Modal';

const QUESTIONS_API   = 'http://localhost:8080/module/';
const MODULES_API = 'http://localhost:8080/module/';

export default class AdminPanel extends React.Component{

  constructor() {
    super()
    this.state = {
      username: localStorage.getItem('username'),
      jwt: localStorage.getItem("jwtToken"),
      show: false,
      questions: [],
      modules: [],
      showQuestionList: false,
    };


  }

  componentDidMount = () => {
      this.getModules();
      this.getQuestionsByModuleId(1);
  }

    getModules = () => {
         fetch(`${MODULES_API}`, {
            headers: { "Content-Type": "application/json; charset=utf-8" },
            method: 'GET',
        }).then(res=>res.json())
            .then(res =>
        this.setState({...this.state, modules: res}));
    }
     getQuestionsByModuleId = (index) => {
         fetch(`${QUESTIONS_API}`+index +"/questions", {
            headers: { "Content-Type": "application/json; charset=utf-8" },
            method: 'GET',
         }).then(res=>res.json())
             .then(res => {

                 this.setState({...this.state, questions: res});
             });
         this.setState({...this.state, showQuestionList: true });
    }
  deleteItem = (index) => {
    console.log(index)
    let dataItem = this.state.questions;
        fetch(`${QUESTIONS_API}${dataItem[index].id}`, {
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

          <div id={index} key={index} className="as-container">
            <div className="as-choice-card">
              <h3><strong className="as-card-title">Question No. {index + 1}</strong><br></br></h3>
              <h3><strong className="as-card-title"> {item.questionContent}</strong></h3>
              <p className="as-card-info">
                {item.answers.map((item, index) => {
                return(
                <li key={index}>{item.answerContent} {item.correct == true ? "(true)" : "(false)"}</li>
                )
                })}
              </p>
              <button className="as-card-cta" onClick={() => { if (window.confirm('Are you sure?'))  this.deleteItem(index) }}>
                Delete
              </button>
            </div>
          </div>
         );
      })
    )
  }

  moduleList = () => {
    return (this.state.modules.length==0?<div id={0} className="row">
              <div className="as-choice-card">
                <h3><strong className="as-card-title">No Modules created yet</strong><br></br></h3>
              </div></div>:
            this.state.modules.map((item, index) => {
              return (

                  <li id={index} key={index}  className="nav-item" onClick={() => { this.getQuestionsByModuleId(index+1);  }}>
                      <a href="#" className="nav-link align-middle px-0">
                          <i className="fs-4 bi-house"></i>  {index + 1}.<span
                          className="ms-1 d-none d-sm-inline">{item.name}</span>
                      </a>
                      <button className="button" onClick={() => { if (window.confirm('Are you sure?'))  this.deleteItem(index) }}>
                          Delete
                      </button>
                  </li>

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
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="navbar-header"> <img
                        src="/img.png"
                        alt="Clearwater Analytics"
                    /></div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Admin Panel</a>
                            </li>



                            <li className="nav-item">
                                <a className="nav-link disabled" href="#" tabIndex="-1"
                                   aria-disabled="true"><span className="glyphicon glyphicon-user">&nbsp;</span>Hello, {this.state.username}</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" title="View Website" href="#"><span className="glyphicon glyphicon-globe"></span></a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="#" onClick={() => this.logOut()}>Logout</a>

                            </li>
                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </div>
                </nav>
                <div className="container-fluid">
                     <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                        Launch demo modal
                    </button>

                     <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    ...
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary">Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row flex-nowrap">
                        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                            <div
                                className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">

                                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                                    id="menu">
                                   {/* <li className="nav-item">
                                        <a href="#" className="nav-link align-middle px-0">
                                            <i className="fs-4 bi-house"></i> <span
                                            className="ms-1 d-none d-sm-inline">Dashboard</span>
                                        </a>
                                    </li>*/}

                                    <li key="2" className="side-bar"><a onClick={e => {
                                        this.showModal();
                                    }} href="#"><span className="glyphicon glyphicon-flag">&nbsp;</span>Add question</a></li>

                                    <li>
                                          <span  className="ms-1 d-none d-sm-inline">Modules</span>

                                    </li>
                                    { this.moduleList()}

                                </ul>
                            </div>
                        </div>

                                <Modal onClose={e => this.showModal()} show={this.state.show}>
                                    Message in Modal
                                </Modal>


                     </div>
                </div>

            </>
        )
    }
}