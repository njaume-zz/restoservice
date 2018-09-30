import React, { Component } from 'react';
//import logo from './logo.svg';
import Input from '../Input'
import CheckBox from '../CheckBox'
class FilterBox extends Component {
    render() {
        return (
            <div className="filter_box">
                <div className="filter_box_item">
                    <Input type="text" label="Write here to filter" onChange={this.props.onChangeFilter}/>
                </div> 
                <div className="filter_box_item" style={{float: 'right', marginRight: 20}}>
                    <CheckBox 
                    label="Order by rating" 
                    onChange={this.props.onChangeOrderByRating}
                    checked={this.props.orderByRating}
                    value={this.props.orderByRating}
                    />
                </div>         
            </div>
                )
            }
        }

export default FilterBox;
