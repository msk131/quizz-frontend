import React from "react";

const API = 'http://localhost:8080/questions/';
const MODULES_API = 'http://localhost:8080/module/';

export default class ModuleModal extends React.Component {
    constructor() {
        super()
        this.state = {
            jwt: localStorage.getItem("jwtToken"),

            moduleId:'1',
            moduleName:''
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
  handleSubmit(e){
        e.preventDefault()
    if(this.state.moduleName)
    this.postModule();
  }

    postModule = async () => {

        await fetch(MODULES_API, {
            method: 'post',
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.moduleName,
            },)
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
                localStorage.setItem("message", "Module created successfully");
                localStorage.setItem("showHide", "");
            })
            .catch((error) => {
                console.log(error)
                localStorage.setItem("message", error);
                localStorage.setItem("showHide", "");
            });
            window.location="/admin"
    }
  moduleContent = () => {
      return(
              <div className="col-12">
                  <div className="row border bg-secondary-subtle border-secondary  ">
                      <div className="col-12 mt-2">
                          <h4 className=" has-text-centered bg-secondary-subtle">Create the Module</h4>
                      </div>
                  </div>
              <div className="row  border border-secondary">
                  <div className="container ">
                      <form className="form-inline" onSubmit={(e) => this.handleSubmit(e)}>
                          <div className="form-group m-1">

                               <div className="form-group m-1">
                                  <label htmlFor="moduleName">Module Name: </label>
                                  <input type="text" className="form-control" id="moduleName"
                                         aria-describedby="moduleName"  name="moduleName" value={this.state.moduleName} onChange={this.handleChange} placeholder="Module Name"  />
                               </div>
                          </div>
                          <div className="form-group row m-2">
                              <input
                                  type="submit"
                                  value="Create"
                                  id="input_submit"
                                  className="btn btn-info"
                              />
                          </div>
                      </form>
                  </div>
                  <div className="col-md-4">


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