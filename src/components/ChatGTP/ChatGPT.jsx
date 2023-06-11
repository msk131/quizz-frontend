import React from "react";

const CHAT_GPT = 'http://localhost:8080/chat';

export default class ChatGPT extends React.Component {
    constructor() {
        super()
        this.state = {
            jwt: localStorage.getItem("jwtToken"),

            moduleId:'1',
            askGPT:'',
            moduleName:'',
            response:'',
            hideShowLoader:'d-none',
            askGPTQuestionHis:''
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    handleChange(e){
		let target = e.target;
		let value = target.value;
    let name = target.name;

		this.setState({
			[name]: value
		});
  }

  handleSubmit(){
    if(this.state.askGPT)
    this.postModule();
  }

  getGPT = (e) => {
        this.setState({...this.state, hideShowLoader: ''})
        e.preventDefault();
    fetch(`${CHAT_GPT}`+"?prompt="+this.state.askGPT, {
        method: 'GET',
    }).then(res=>res.text()).then((res) =>  {

        localStorage.setItem("askGPTQuestionHis",this.state.askGPT+': ');
        localStorage.setItem("response",res);
        this.setState({...this.state, hideShowLoader: 'd-none'})
        localStorage.setItem("message","ChatGPT response success");
    })
  }

  moduleContent = () => {
      return(
          <div className="col-12">
              <div className="row border bg-secondary-subtle border-secondary">
                  <div className="col-12 mt-2">
                      <h4 className="has-text-centered bg-secondary-subtle">ChatGPT</h4>
                  </div>
              </div>
              <div className="row  border border-secondary">
                  <div className="container ">
                      <form className="form-inline" onSubmit={this.getGPT}>
                          <div className="form-group m-1">

                               <div className="form-group m-1">
                                   <textarea id="w3review" name="w3review" rows="4" cols="56"
                                  className="form-control" id="moduleName"
                                         aria-describedby="moduleName"  name="askGPT" value={this.state.askGPT}  onChange={this.handleChange} placeholder="Ask ChatGPT" >
                               </textarea>
                               </div>
                          </div>
                          <div className="form-group row m-2">
                              <div className="row">

                                  <div className="col-9">
                                      <button type="submit" className="btn btn-primary" value="Send" onClick={(e) => this.getGPT(e)}>Send</button>
                                  </div>
                                  <div className="col-3">
                                      <div className={this.state.hideShowLoader}>
                                      <div className="spinner-border" role="status">
                                          <span className="sr-only">Loading...</span>
                                      </div>
                                  </div>
                                  </div>
                              </div>

                          </div>
                      </form>
                  </div>
                  <div className="row ">
                      <div className="m-2 bg-light border border-black p-2">

                          <p style={{color:"#007bff!important" }} className="text-primary>">
                              {localStorage.getItem("askGPTQuestionHis")==''?"ChatGPT Response will display here >":localStorage.getItem("askGPTQuestionHis")} </p>

                          <pre style={{color:"#6c757d!important" }}  > {localStorage.getItem("response")} </pre>
                      </div>
                  </div>

                  <div>
                  </div>
              </div>
          </div>
      )
  }
    render() {

      return (
        <>
        {this.state.jwt ? this.moduleContent() : ""}
        </>
      )
    }
}