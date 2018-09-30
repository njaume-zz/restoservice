import React, { Component } from 'react';
//import logo from './logo.svg';
import '../../css/checkbox.css'
class CheckBox extends Component {
    render() {
        return (
            <label className="material-checkbox">
                <input type="checkbox" value={this.props.value} onChange={this.props.onChange}/>
                <span>{this.props.label}</span>
            </label>
                )
            }
        }

export default CheckBox;
