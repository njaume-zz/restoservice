import React, { Component } from 'react';
import { Redirect } from 'react-router'
import Input from '../Input';
import AutocompletePlaces from '../AutocompletePlaces'
import Button from '../Button';
import AutocompleteField from '../AutocompleteField'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'

class Order extends Component {
   
  constructor() {
    super()

    this.state = {
      orderByRating : false,
      selectedMeal : '',
      name: '',
      lastName: '',
      phone: '',
      address: ''
    };
  }

    componentWillUnmount(){
        this.props.initialState()
    }
    onChangeMeal = (selectedMeal) => {
        this.setState({selectedMeal : selectedMeal})
    }

    onChangeInput = (event) => {
        const name = event.target.name
        const value = event.target.value
        this.setState({[name]: value})
    }

    validForm = () => {
        return (this.state.name.length > 0 && this.state.lastName.length > 0 && this.state.phone.length > 0 && this.state.selectedMeal.key)
    }

    onSubmit = (e) => {
        e.preventDefault()
        if (this.validForm()) this.props.postOrderForm(this.state)
        else this.notify()
    }

    notify = () => toast.warn("Complete all fields  !");

    renderOrderForm = () =>{
        return (
            <div className="container_flex">
                      <ToastContainer />
            <form>
            <div className="card">
                <div className="item_flex">
                    <Input
                        name='name' 
                        onChange={this.onChangeInput}
                        label="Name" required
                        />
                </div> 
                <div className="item_flex">
                    <Input 
                        name='lastName'
                        onChange={this.onChangeInput}
                        label="Last Name" required/>
                </div> 
                <div className="item_flex">
                    <Input 
                        name='phone'
                        onChange={this.onChangeInput}
                        type="tel" label="Phone" required/>
                </div> 
                <div className="item_flex">
                    <AutocompletePlaces required/>
                </div> 
                <div className="item_flex">
                    <AutocompleteField 
                        floatingLabelText="Meal" 
                        onChange={this.onChangeMeal}
                        value={this.state.selectedMeal}
                        dataSource={this.props.selectedRestaurant.meals ? this.props.selectedRestaurant.meals : []} 
                        dataSourceConfig={this.props.selectedRestaurant.meals ? {'text':'description', 'value': 'key'} : null}
                        required />
                </div> 
                <div className="item_flex">
                 <Button type='submit' label="submit" onClick={this.onSubmit} disabled={this.props.isLoading}/>
                </div> 
            </div> 
        </form>
    </div> 
                )
            }
    
    renderEta = () => {
        let eta = new Date();
        eta.setMinutes( eta.getMinutes() + 30 );
        return (
            <div className="container_flex">
                <div className="card">
                <div className="item_flex" style={{color: 'green', fontSize: 20, fontWeight: 'lighter'}}>
                    Success!
                </div>
                <div className="item_flex">
                    Estimated time of arrival : {eta.toString()}
                </div>
                <div className="item_flex">
                    <Link style={{textDecoration:'none'}} to='/restaurants'><Button type='button' label="back"/></Link>
                </div>
                </div>
            </div>
        )
        
    }

        render() {
            if(!this.props.selectedRestaurant) return <Redirect to='/restaurants' />
            else if(!this.props.order.postSuccess) return this.renderEta()
              else return this.renderOrderForm()
              }
            }

export default Order;
