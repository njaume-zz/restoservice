import React, { Component } from 'react';
import RestaurantCard from './ResturantCard'
import FilterBox from './FilterBox'
class ListView extends Component {

    componentDidMount(){
        if(this.props.fetchRestaurants) this.props.fetchRestaurants()
    }
    render() {
        return (
            <div>
                <FilterBox />
                <ul className="mat_list card scrollable"> 
                {this.props.listView.restaurants.map((restaurant, index) =>
                     (<RestaurantCard index={index} restaurant={restaurant}/>))}
                </ul>
            </div> 
                )
            }
        }

export default ListView;
