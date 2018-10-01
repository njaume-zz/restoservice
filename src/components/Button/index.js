import React, { Component } from 'react';
import '../../css/button.css'
class Button extends Component {
        render() {
            return(
                <button disabled={this.props.disabled} className="btn" type={this.props.type ? this.props.type : "button"} onClick={this.props.onClick}><span>{this.props.label}</span></button>
            )
              }
            }

export default Button;
