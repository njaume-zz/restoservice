import React, { Component } from 'react';
//import logo from './logo.svg';
import Input from '../Input'
import CheckBox from '../CheckBox'
class FilterBox extends Component {
    render() {
        return (
            <div className="filter_box">
                <div className="filter_box_item">
                    <Input type="text" label="Escribe aquí para filtrar"/>
                </div> 
                <div className="filter_box_item" style={{float: 'right', marginRight: 20}}>
                    <CheckBox label="Order by rating"/>
                </div>         
            </div>
                )
            }
        }

export default FilterBox;
