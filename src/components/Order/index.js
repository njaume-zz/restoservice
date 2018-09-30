import React, { Component } from 'react';
import { Redirect } from 'react-router'
import Input from '../Input';
import AutocompletePlaces from '../AutocompletePlaces'
import Button from '../Button';
const WAIT_INTERVAL = 1000;


class Order extends Component {
   
  constructor() {
    super()

    this.state = {
      orderByRating : false,
      filterText: ''
    };
  }

    componentDidMount(){
        if(this.props.fetchRestaurants) this.props.fetchRestaurants()

    }

    onChangeFilter = (event) =>{
        clearTimeout(this.timer);
        const filterText = event.target.value
        this.timer = setTimeout(() => {
         this.setState({filterText: filterText})
        }, WAIT_INTERVAL);
      }

      onChangeOrderByRating = (event) =>{
          console.log("onChangeOrderByRating")
        const orderBy = event.target.checked
         this.setState({orderByRating: orderBy})
      }


    fuzzy = (value, s) =>{
        var hay = value.toLowerCase(), i = 0, n = -1, l;
        s = s.toLowerCase();
        for (; l = s[i++] ;) if (!~(n = hay.indexOf(l, n + 1))) return false;
        return true;
    }

    sortByRating = (restaurants) => {
        restaurants.sort(function (a, b) {
            if (a.rating > b.rating) {
              return 1;
            }
            if (a.rating < b.rating) {
              return -1;
            }
            return 0;
          });
    }

    onSelectRestaurant = (restaurant) => {
        console.log("restaurant", restaurant)
        this.props.selectRestaurant(restaurant)
    }

    renderOrderForm = () =>{
        return (
            <div className="container_flex">
                <div className="card">
                <div className="item_flex">
                <Input label="Name" required/>
                </div> 
                <div className="item_flex">
                <Input label="Last Name" required/>
                </div> 
                <div className="item_flex">
                <Input label="Phone" required/>
                </div> 
                <div className="item_flex">
                <AutocompletePlaces />
                </div> 
                <div className="item_flex">
                <Button label="submit"/>
                </div> 
                </div>               
            </div> 
                )
            }

        render() {
            if(!this.props.selectedRestaurant){
                console.log("redirect")
                return <Redirect to='/restaurants' />
            } 
              else return this.renderOrderForm()
              }
            }

export default Order;
