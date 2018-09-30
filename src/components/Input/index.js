import React, { Component } from 'react';
import '../../css/input.css'

class Input extends Component {
    render() {
        return (
            <div className="group">      
                <input 
                type={this.props.type ? this.props.type : 'text'} 
                required={this.props.required ? this.props.required : false}
                value={this.props.value}
                onChange={this.props.onChange} 
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>{this.props.label}</label>
            </div>
                )
            }
        }

export default Input;
