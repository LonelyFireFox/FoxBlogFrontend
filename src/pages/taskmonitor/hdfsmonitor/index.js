import React, { Component } from "react";

export class Redirect extends Component {
  constructor( props ){
    super();
    this.state = { ...props };
  }
  componentWillMount(){
    window.open("http://192.168.50.5:50070/dfshealth.html#tab-datanode");
  }
  render(){
    return (<section>已跳转页面...</section>);
  }
}

export default Redirect;
