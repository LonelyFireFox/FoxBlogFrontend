import React, { Component } from "react";

class Redirect extends Component {
  constructor( props ){
    super();
    this.state = { ...props };
  }
  componentWillMount(){
    window.open("http://192.168.50.5:16010/master-status");
  }
  render(){
    return (<section>已跳转页面...</section>);
  }
}

export default Redirect;
