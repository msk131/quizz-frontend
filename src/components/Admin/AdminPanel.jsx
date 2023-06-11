import React from 'react';
import QuestionModal from '../QuestionModal/QuestionModal';
import ModuleModal from "../ModuleModal/ModuleModal";
import ChatGPT from "../ChatGTP/ChatGPT";
import QuestionGPTModal from "../QuestionGPTModal/QuestionGPTModal";
import EmailModal from "../EmailModal/EmailModal";

const QUESTIONS_API   = 'http://localhost:8080/questions/';
const MODULES_API = 'http://localhost:8080/module/';

export default class AdminPanel extends React.Component{

    constructor() {
        super()
        this.state = {
            username: localStorage.getItem('username'),
            jwt: localStorage.getItem("jwtToken"),
            showM: false,
            showQ: "d-none",
            questions: [],
            modules: [],
            showQuestionList: false,
            moduleName:"",
        };
    }
    redirect()
    {
        window.location="/admin";
    }
    onClose = e => {
        localStorage.setItem("showHide", "d-none");
        localStorage.setItem("message", "");
        this.redirect()
    };
    componentDidMount = () => {
        this.getModules();
        localStorage.setItem("showHide","d-none");
    }

    getModules = () => {
        this.setState({...this.state, showHide:"d-none"})
        fetch(`${MODULES_API}`, {
            headers: { "Content-Type": "application/json; charset=utf-8" },
            method: 'GET',
        }).then(res=>res.json())
            .then(res => {
                this.setState({...this.state, modules: res});
                localStorage.setItem("options", this.state.modules);
            });
    }
    getQuestionsByModuleId = (id, name) => {

        this.setState({...this.state, showHide:"d-none"})

        fetch(`${MODULES_API}`+id +"/questions", {
            headers: { "Content-Type": "application/json; charset=utf-8" },
            method: 'GET',
        }).then(res=>res.json())
            .then(res => {

                this.setState({...this.state, questions: res});
            });
        localStorage.setItem("moduleName", name)
        this.setState({...this.state, showQuestionList: true });
        this.setState({...this.state, moduleId: id});
        this.setState({...this.state, showQ:""})
    }
    deleteModules = (index) => {
        console.log("index id deleted :" +index);
        let dataItem = this.state.questions;
        fetch(`${MODULES_API}`+index, {
            headers: { "Content-Type": "application/json; charset=utf-8" },
            method: 'DELETE',
        }).then(res=>res.json())
            .then(res => console.log(res));

        dataItem.splice(index, 1);
        this.setState([dataItem]);
        localStorage.setItem("message","Deleted successfully");
        localStorage.setItem("showHide","");
        setTimeout('redirect()', 5000);
    }
    deleteQuestions = (index) => {
        console.log("index id deleted :" +index);
        let dataItem = this.state.questions;
        fetch(`${QUESTIONS_API}`+index, {
            headers: { "Content-Type": "application/json; charset=utf-8" },
            method: 'DELETE',
        }).then(res=>res.json())
            .then(res => console.log(res));

        dataItem.splice(index, 1);
        this.setState([dataItem]);
        localStorage.setItem("showModel","true");
        this.setState({...this.state, showHide:""})
        localStorage.setItem("message","Deleted successfully");
        localStorage.setItem("showHide","");
        setTimeout('redirect()', 5000);
    }

    showModule = e => {
        this.setState({
            showM: !this.state.showM
        });
    };

    showModal = e => {
        this.setState({
            showModel: !this.state.showModel
        });
    };

    showQuestion = e => {
        this.setState({
            showQ: ""
        });
    };


    questionList = () => {
        return (<div className={this.state.showQ}> {this.state.questions.length==0? <div id={0} className="as-container">
                    <div className="row px-2">
                        <h3 ><strong className="row bg-secondary-subtle p-1">No Question posted in this Module</strong><br></br></h3>
                    </div></div>:
                <div className="row px-2">
                    <div className="col-12 bg-secondary-subtle border border-secondary">
                        <h3 className="">
                            { localStorage.getItem("moduleName")}
                        </h3>
                    </div>
                    {this.state.questions?.map((item, index) => {
                        return (
                            <div key={index+188} className="as-container ml-1 border border-secondary">
                                <div className="col-12  p-1">
                                    <strong  className=" ">Question No. {index + 1}</strong><br></br>
                                    <strong  className=" "> {item.questionContent}</strong>
                                    <ul className=" ">
                                        {item.answers.map((item, index) => {
                                            return( <>
                                                <li className="list-unstyled"  key={index+1000}>{index+1}
                                                    . {item.answerContent} {item.correct == true ? "(true)" : "(false)"}
                                                </li>
                                            </> )
                                        } )}
                                    </ul>
                                    <button className="button  is-primary is-outlined is-rounded" onClick={() => { if (window.confirm('Are you sure?'))  this.deleteQuestions(item.id) }}>
                                        <span className="glyphicon glyphicon-trash"></span>
                                    </button>
                                </div>
                            </div>
                        );
                    } )  }
                </div>

        }</div>) }
    moduleList = () => {
        return (this.state.modules.length==0?<div id={0} className="row">
                    <div className="as-choice-card">
                        <h3><strong className="as-card-title">No Modules created yet</strong><br></br></h3>
                    </div></div>:
                this.state.modules?.map((item, index) => {
                    return (

                        <div id={item.id} key={index +88} className="container-fluid" onClick={() => { this.getQuestionsByModuleId(item.id, item.name);  }}>
                            <div className="row">

                                <div className="col-9">
                                    <a href="#" className="nav-link align-middle px-0">
                                        <i className="fs-4 bi-house"></i>  {index + 1}.<span
                                        className="ms-1 d-none d-sm-inline">{item.name}</span>

                                    </a>
                                </div>
                                <div className="col-2">
                                    <button className="button" onClick={() => { if (window.confirm('Are you sure?'))  this.deleteModules(item.id) }}>
                                        <span className="glyphicon glyphicon-trash"></span>
                                    </button>
                                </div>
                            </div>


                        </div>

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
                <nav className="row navbar navbar-expand-lg navbar-light bg-light m-1">
                    <div className="col-9 navbar-header ">
                        <div className="row">
                            <div className="col-2">
                                <img src="/img.png" alt="Clearwater Analytics"/>
                            </div>
                            <div className="col-6">
                                <div className="row">
                                    <div className="col-12">
                                        <h4 className="mb-6">BrainTeaser</h4>
                                    </div>
                                    <div className="col-1">
                                    </div>
                                    <div className="col-4">
                                        <small className="fs-23">
                                           POWERED BY AI/chatGPT
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>


                    <div className="col-3 collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className=" navbar-nav mr-auto">
                            <li key="100" className="nav-item active">
                                <a className="glyphicon glyphicon-home" href="/"> <span className="sr-only"></span></a>
                            </li>
                            <li key="101" className="nav-item">
                                <a className="nav-link" href="/admin">Admin Panel</a>
                            </li>



                            <li key="102" className="nav-item">
                                <a className="nav-link disabled" href="#" tabIndex="-1"
                                   aria-disabled="true"><span className="glyphicon glyphicon-user">&nbsp;</span>Hello, {this.state.username}</a>
                            </li>
                            <li key="103" className="nav-item">
                                <a className="nav-link" title="View Website" href="#"><span className="glyphicon glyphicon-globe"></span></a>
                            </li>

                            <li key="104" className="nav-item">
                                <a className="nav-link" href="#" onClick={() => this.logOut()}>Logout</a>

                            </li>
                        </ul>

                    </div>
                </nav>
                <div className="container-fluid">

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

                                    <li key="200" className="side-bar"><a onClick={e => {
                                        this.showModule();
                                    }} href="#"><span className="glyphicon glyphicon-flag">&nbsp;</span>Add Module</a></li>

                                    <li key="211" className="side-bar"><a onClick={e => {
                                        this.showQuestion();
                                    }} href="#"><span className="glyphicon glyphicon-flag">&nbsp;</span>Add Question</a></li>

                                    <li key="312" className="row m-3">

                                        <a className="btn btn-info" href="" role="button">Modules</a>
                                    </li>
                                    { this.moduleList()}
                                </ul>
                            </div>
                        </div>
                        <div className="col py-3">
                            <div className= {localStorage.getItem("message") == "" ? "d-none":""}>
                                <div className="row m-1">

                                    <div className=" col-6 bg-info p-1">

                                        <div className="">
                                            {localStorage.getItem("message")}
                                        </div>
                                    </div>
                                    <div className="col-1 p-1" onClick={this.onClose}>
                                        <div className="row">
                                            <div className="text-bg-light bg-danger col-3 ">
                                                X
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="row">

                                <div className="col-3">
                                    <div className="row px-2">
                                        <ModuleModal showM="true">
                                            Message in Question
                                        </ModuleModal>
                                    </div>
                                    <div className="row px-2">
                                        <QuestionModal showM={this.state.showQ}>
                                            Message in Question
                                        </QuestionModal>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="row">
                                        <ChatGPT>
                                        </ChatGPT>
                                    </div>
                                    <div className="row">
                                        <QuestionGPTModal>
                                        </QuestionGPTModal>
                                    </div>
                                    <div className="row">
                                        <EmailModal>
                                        </EmailModal>
                                    </div>
                                </div>
                                <div className="col-3">
                                    { this.questionList()}
                                </div>

                            </div>
                        </div>
                    </div>

                </div>

            </>
        )
    }
}