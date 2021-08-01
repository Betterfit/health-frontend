import React, { Component } from "react";
import AnimateHeight from "react-animate-height";

export default class Auto extends Component {
  state = {
    height: "auto",
  };

  componentDidMount() {
    this.setFixedHeight();
  }

  componentDidUpdate(prevProps) {
    const { children } = this.props;

    if (prevProps.children !== children) {
      this.setState({
        height: "auto",
      });
    }
  }

  setFixedHeight = () => {
    this.setState({
      height: document.getElementById(111).firstChild.offsetHeight,
    });
  };

  render() {
    const { height } = this.state;
    const { children, className } = this.props;
    return (
      <AnimateHeight
        id={111}
        height={height}
        onAnimationEnd={this.setFixedHeight}
        className={className}
      >
        {children}
      </AnimateHeight>
    );
  }
}
