import React, { Component } from "react";

export class Redirect extends Component {
  constructor( props ){
    super();
    this.state = { ...props };
  }
  componentWillMount(){
    window.open("http://192.168.50.5:8088/cluster");
  }
  render(){    return (<section>已跳转页面...</section>);
  }
}

export default Redirect;
