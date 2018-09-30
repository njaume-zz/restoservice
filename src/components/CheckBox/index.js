import React, { Component } from 'react';
//import logo from './logo.svg';
import '../../css/checkbox.css'
class CheckBox extends Component {

    render() {
        return (
            <div id="ai2">
                <input
                    style={{display: 'inline-block', width:30}} 
                    name="orderByRating"
                    type="checkbox" 
                    checked={this.props.checked} 
                    onChange={this.props.onChange}
                    onClick={this.props.onChange}
                    value={this.props.checked}
                    id="i2"
                   
                    />      
                <span style={{display: 'inline-block', color: '#955'}}>{this.props.label}</span>
             </div>
                )
            }
        }

export default CheckBox;
